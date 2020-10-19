import React from 'react';
import { createBrowserHistory } from "history";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import './App.css';

import LandingView from './views/LandingView/LandingView.jsx'
import SwapView from './views/SwapView/SwapView.jsx'
import PoolView from './views/PoolView/PoolView.jsx'
import HistoryView from './views/HistoryView/HistoryView.jsx'
import TermsView from './views/TermsView/TermsView.jsx'
import PrivacyView from './views/PrivacyView/PrivacyView.jsx'

import AppContext from './contexts/AppContext'

import Web3 from 'web3';
import Web3Modal from "web3modal";
import Modal from "./components/Web3Modal/Web3Modal";
import { getChainData } from "./helpers/utilities";
import { apiGetAccountAssets } from "./helpers/api";
import styled from "styled-components";
import Loader from "./components/Web3ModalLoader/Web3ModalLoader";
import ModalResult from "./components/Web3ModalResult/Web3ModalResult";
import WalletConnectProvider from "@walletconnect/web3-provider";

import daiAbi from './interfaces/dai'

const SModalContainer = styled.div`
  width: 100%;
  position: relative;
  word-wrap: break-word;
`;

const SModalTitle = styled.div`
  margin: 1em 0;
  font-size: 20px;
  font-weight: 700;
`;

const SContainer = styled.div`
  height: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  word-break: break-word;
`;

const SModalParagraph = styled.p`
  margin-top: 30px;
`;

function initWeb3(provider) {
  const web3 = new Web3(provider);

  web3.eth.extend({
    methods: [
      {
        name: "chainId",
        call: "eth_chainId",
        outputFormatter: web3.utils.hexToNumber
      }
    ]
  });

  return web3;
}

class App extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      route: '',
      currentAccount: '',
      currentAccountTruncated: '',
      fetching: false,
      address: "",
      web3: null,
      provider: null,
      connected: false,
      chainId: 1,
      networkId: 1,
      assets: [],
      showModal: false,
      pendingRequest: false,
      result: null,
      setState: this.stateUpdate,
      onConnect: this.onConnect,
      subscribeProvider: this.subscribeProvider,
      smartTrim: this.smartTrim,
      getAccountAssets: this.getAccountAssets,
      selectedSwapPosition: 'rFix',
      selectedSwapAmount: '100',
      selectedSwapAsset: 'dai',
      selectedLiquidityAction: 'Supply',
      selectedLiquidityAmount: '100',
      selectedLiquidityAsset: 'dai',
      positions: [ 
        {'display':'Receive', 'key': 'rFix'},
        {'display':'Pay', 'key': 'pFix'} 
      ],
      actions: [ 
        {'display':'Supply', 'key': 'Supply'},
        {'display':'Withdraw', 'key': 'Withdraw'}
      ],
      greenwoodAssets: [
        {'display':'DAI', 'key': 'dai'},
        // {'display':'ETH', 'key': 'eth'},
        // {'display':'USDC', 'key': 'usdc'},
        // {'display':'USDT', 'key': 'usdt'},
        // {'display':'ZRX', 'key': 'zrx'}
      ],
      contractAddresses: {
        'dai': '0x6Ce6B312b86bC6e40D3684161d43acdeB57C048a',
        // 'eth': '',
        // 'usdc': '',
        // 'usdt': '',
        // 'zrx': '',
      },
      calculatorAddresses: {
        'dai': '0x8bdC42D8a1DB52450cd63866297F87D470ab502f',
        // 'eth': '',
        // 'usdc': '',
        // 'usdt': '',

        // 'zrx': '',
      },
      modelAddresses: {
        'dai': '0x97c1AEC61B6f62C1c30B55Bf2920d91d6765B1C8',
        // 'eth': '',
        // 'usdc': '',
        // 'usdt': '',
        // 'zrx': '',
      },
      underlyingAddresses: {
        'dai': '0xC4375B7De8af5a38a93548eb8453a498222C4fF2',
        // 'eth': '',
        // 'usdc': '',
        // 'usdt': '',
        // 'zrx': '',
      },
      underlyingABIs: {
        'dai': daiAbi
      },
      assetMantissas: {
        'dai': '1000000000000000000',
        // 'eth': '1000000000000000000',
        // 'usdc': '1000000',
        // 'usdt': '1000000',
        // 'zrx': '1000000000000000000',
      },
      
      contractShift: 0.0000000001,
      swapDetailRate: '',
      swapDetailMaturity: '',
      swapDetailFee: '',
      swapDetailCollateral: '',
      poolDetailBalance: '',
      poolDetailShare: '',
      renderRoute: false,
      accountSwaps: [],
      historyColumns: [
        {
          swapType: 'Swap Type',
          notional: 'Swap Notional',
          swapRate: 'Swap Rate',
          userCollateral: 'Locked Collateral',
          initTime: 'Swap Time',
          initIndex: 'Floating Index Start',
          asset: 'Asset',
          settlement: 'Settle Swap'
        }
      ],
      renderTable: false,
      transactionStatus: 'Pending',
      transactionHash: '',
      approvalStatus: 'Pending',
      approvalHash: '',
      isDesktop: false,
      approveRadio: false,
      swapDurationInSeconds: 60,
      isValidCollateralAmount: true,
      isValidLiquidityAmount: true,
      isOnSupportedNetwork: false
    }

    this.web3Modal = new Web3Modal({
      network: this.getNetwork(),
      cacheProvider: false,
      disableInjectedProvider: false,
      providerOptions: this.getProviderOptions()
    });

    this.onConnect = this.onConnect.bind(this);
    this.subscribeProvider = this.subscribeProvider.bind(this);
    this.getNetwork = this.getNetwork.bind(this);
    this.getProviderOptions = this.getProviderOptions.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.getAccountAssets = this.getAccountAssets.bind(this);
    this.resetApp = this.resetApp.bind(this);
    this.smartTrim = this.smartTrim.bind(this);
    this.updatePredicate = this.updatePredicate.bind(this);
  }

  async componentDidMount() {
    this.updatePredicate();
    window.addEventListener("resize", this.updatePredicate);

    await this.setState({
      renderRoute: false
    });
    if (window.web3 && window.web3.currentProvider) {
      const provider = window.web3.currentProvider
      try {
        await this.subscribeProvider(provider);
      } catch ( err ) {
        console.error(`Error calling subscribeProvider - ${ err.message }`);
      }

      const web3 = initWeb3(window.web3.currentProvider)
      const accounts = await web3.eth.getAccounts();

      if (accounts.length) {
        const address = accounts[0];
        const networkId = await web3.eth.net.getId();
        const chainId = await web3.eth.chainId();
        const currentAccountTruncated = this.smartTrim(address, 16) + ' '

        try {
          await this.setState({
            web3,
            provider,
            connected: true,
            address,
            chainId,
            networkId,
            currentAccountTruncated
          });
        } catch ( err ) {
          console.error( `Error setting state in onConnect - ${ err.message }` );
        }
  
        try {
          await this.getAccountAssets();
        } catch ( err ) {
          console.error( `Error calling getAccountAssets - ${ err.message }` );
        }
      }
    } else {
      console.log( 'NO PROVIDER' )

    }

    let isOnSupportedNetwork;
    if (this.state.chainId && (this.state.chainId === '42' || this.state.chainId === 42)) {
      isOnSupportedNetwork = true
    } else {
      isOnSupportedNetwork = false
    }

    await this.setState({
      renderRoute: true,
      isOnSupportedNetwork
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updatePredicate);
  }

  updatePredicate() {
    this.setState({ isDesktop: window.innerWidth > 1300 });
  }

  onConnect = async () => {
    let provider, hasProvider
    try {
      provider = await this.web3Modal.connect();
      hasProvider = true;
    } catch ( err ) {
      await this.resetApp()
      hasProvider = false;
    }

    if (hasProvider) {
      try {
        await this.subscribeProvider(provider);
      } catch ( err ) {
        console.error(`Error calling subscribeProvider - ${ err.message }`);
      }

      const web3 = initWeb3(provider);
      const accounts = await web3.eth.getAccounts();
      const address = accounts[0];
      const networkId = await web3.eth.net.getId();
      const chainId = await web3.eth.chainId();
      const currentAccountTruncated = this.smartTrim(address, 16) + ' '

      let isOnSupportedNetwork;
      if (chainId && (chainId === '42' || chainId === 42)) {
        isOnSupportedNetwork = true
      } else {
        isOnSupportedNetwork = false
      }

      try {
        await this.setState({
          web3,
          provider,
          connected: true,
          address,
          chainId,
          networkId,
          currentAccountTruncated,
          isOnSupportedNetwork
        });
      } catch ( err ) {
        console.error( `Error setting state in onConnect - ${ err.message }` );
      }

      try {
        await this.getAccountAssets();
      } catch ( err ) {
        console.error( `Error calling getAccountAssets - ${ err.message }` );
      }
    }
  };

  subscribeProvider = async (provider) => {
    if (!provider.on) {
      return;
    }

    provider.autoRefreshOnNetworkChange = false

    // provider.on("close", () => this.resetApp());

    provider.on("accountsChanged", async (accounts) => {
      if ( accounts.length ) {
        const web3 = initWeb3(provider);
        const accounts = await web3.eth.getAccounts();
        const address = accounts[0];
        const networkId = await web3.eth.net.getId();
        const chainId = await web3.eth.chainId();
        const currentAccountTruncated = this.smartTrim(address, 16) + ' '
        let isOnSupportedNetwork;
        if (chainId && (chainId === '42' || chainId === 42)) {
          isOnSupportedNetwork = true
        } else {
          isOnSupportedNetwork = false
        }

        try {
          await this.setState({
            web3,
            provider,
            connected: true,
            address,
            chainId,
            networkId,
            currentAccountTruncated,
            isOnSupportedNetwork
          });
        } catch ( err ) {
          console.error( `Error setting state in accountsChanged listener - ${ err.message }` );
        }
        await this.getAccountAssets();
      } else {
        this.resetApp();
      }
    });

    provider.on("chainChanged", async (chainId) => {
      const { web3 } = this.state;
      if (web3) {
        // window.location.reload();
        // const web3 = initWeb3(provider);
        const accounts = await web3.eth.getAccounts();
        const address = accounts[0];

        const networkId = await web3.eth.net.getId();
        const chainId = await web3.eth.chainId();

        const currentAccountTruncated = this.smartTrim(address, 16) + ' '
        let isOnSupportedNetwork;
        if (chainId && (chainId === '42' || chainId === 42)) {
          isOnSupportedNetwork = true
        } else {
          isOnSupportedNetwork = false
        }

        // await this.setState({ chainId, networkId });
        try {
          await this.setState({
            web3,
            provider,
            connected: true,
            address,
            chainId,
            networkId,
            currentAccountTruncated,
            isOnSupportedNetwork
          });
        } catch ( err ) {
          console.error( `Error setting state in chainChanged listener - ${ err.message }` );
        }
        await this.getAccountAssets();
      }
    });

    // provider.on("networkChanged", async (networkId) => {
    //   const { web3 } = this.state;
    //   if (web3) {
    //     const chainId = await web3.eth.chainId();
    //     await this.setState({ chainId, networkId });
    //     await this.getAccountAssets();
    //   }
    // });

    provider.on("disconnect", async (error) => {
      this.resetApp()
      console.error(error);
    });
  };

  getNetwork = () =>  {
    return getChainData(this.state.chainId).network;
  }

  getProviderOptions = () => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: process.env.REACT_APP_INFURA_ID
        }
      }
    };
    return providerOptions;
  };

  toggleModal = async () => {
    await this.setState({ showModal: !this.state.showModal });
  }

  getAccountAssets = async () => {
    const { address, chainId } = this.state;
    this.setState({ fetching: true });
    try {
      const assets = await apiGetAccountAssets(address, chainId);
      await this.setState({ fetching: false, assets });
    } catch (error) {
      console.error(error);
      await this.setState({ fetching: false });
    }
  };

  resetApp = async () => {
    const { web3 } = this.state;
    if (web3 && web3.currentProvider && web3.currentProvider.close) {
      await web3.currentProvider.close();
    }
    await this.web3Modal.clearCachedProvider();
    await this.setState({ 
      fetching: false,
      address: "",
      web3: null,
      provider: null,
      connected: false,
      chainId: 1,
      networkId: 1,
      assets: [],
      showModal: false,
      pendingRequest: false,
      result: null
     });
  };

  smartTrim(string, maxLength) {
    if (!string) return string;
    if (maxLength < 1) return string;
    if (string.length <= maxLength) return string;
    if (maxLength === 1) return string.substring(0,1) + '...';

    const midpoint = Math.ceil(string.length / 2);
    const toremove = string.length - maxLength;
    const lstrip = Math.ceil(toremove/2);
    const rstrip = toremove - lstrip;
    return string.substring(0, midpoint-lstrip) + '...' + string.substring(midpoint+rstrip);
  } 



  stateUpdate = (newState, cb) => {
    this.setState(newState, cb);
  }

  render() {
    const hist = createBrowserHistory();
    const {
      showModal,
      pendingRequest,
      result,
      renderRoute
    } = this.state;
    return (
      <AppContext.Provider value={this.state}>
        <div className="app-container">
          <BrowserRouter history={hist}>
            <Switch>
              { renderRoute ? <Route exact path="/" render={(props) => <LandingView {...props} />} /> : null}
              { renderRoute ? <Route path="/swap" render={(props) => <SwapView {...props} />} /> : null}
              { renderRoute ? <Route path="/pool" render={(props) => <PoolView {...props} />} /> : null}
              { renderRoute ? <Route path="/dashboard" render={(props) => <HistoryView {...props} />} /> : null}
              { renderRoute ? <Route path="/terms" render={(props) => <TermsView {...props} />} /> : null}
              { renderRoute ? <Route path="/privacy" render={(props) => <PrivacyView {...props} />} /> : null}
              <Redirect from="/*" to="/" />
            </Switch>
          </BrowserRouter>
        </div>

        <Modal show={showModal} toggleModal={this.toggleModal}>
          {pendingRequest ? (
            <SModalContainer>
              <SModalTitle>{"Pending Call Request"}</SModalTitle>
              <SContainer>
                <Loader />
                <SModalParagraph>
                  {"Approve or reject request using your wallet"}
                </SModalParagraph>
              </SContainer>
            </SModalContainer>
          ) : result ? (
            <SModalContainer>
              <SModalTitle>{"Call Request Approved"}</SModalTitle>
              <ModalResult>{result}</ModalResult>
            </SModalContainer>
          ) : (
            <SModalContainer>
              <SModalTitle>{"Call Request Rejected"}</SModalTitle>
            </SModalContainer>
          )}
        </Modal>
      </AppContext.Provider>
    );
  }
}

export default App;
