import React from 'react';
import { withRouter } from 'react-router-dom';
import './SwapContainer.css'
import '../TextSelect/TextSelect.css'
import coreAbi from '../../interfaces/v0.1.0_core'
import Web3 from 'web3';
import moment from 'moment';
import AppContext from '../../contexts/AppContext';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TransactionToastContainer from '../TransactionToastContainer/TransactionToastContainer'
import ApprovalToastContainer from '../ApprovalToastContainer/ApprovalToastContainer'
import * as BigNumber from 'bignumber.js';


class SwapContainer extends React.Component {
  static contextType = AppContext;
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.handleSwapSubmit = this.handleSwapSubmit.bind(this);
    this.validateSwapForm = this.validateSwapForm.bind(this);
    this.getFee = this.getFee.bind(this);
    this.getRate = this.getRate.bind(this);
    this.getMaturity = this.getMaturity.bind(this);
    this.getCollateral = this.getCollateral.bind(this);
    this.getSwapDetails = this.getSwapDetails.bind(this);
    this.processSwap = this.processSwap.bind(this);
    this.approveTransfer = this.approveTransfer.bind(this);
  }
  
  async componentDidMount() {
    this.context.setState({
      approveRadio: false,
      selectedSwapPosition: 'rFix'
    })
    this.validateSwapForm();
  }

  async handleChange(e) {
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;
      
    await this.context.setState({
        [name]: value,
    }, () => {
        this.validateSwapForm()
    });
  }

  async getFee( contract ) {
    const totalLiquidity = Number(contract.totalLiquidity) * this.context.contractShift;
    const activeCollateral = Number(contract.activeCollateral) * this.context.contractShift;
    const feeSensitivity = Number(contract.feeSensitivity) * this.context.contractShift;
    const feeBase = Number(contract.feeBase) * this.context.contractShift;

    if ( Number(totalLiquidity) === 0) {
      return Number(feeBase)
    } else {
      return (((Number(activeCollateral) * Number(feeSensitivity))/Number(totalLiquidity)) + Number(feeBase))
    }
  }

  async getRate( contract ) {
    let fee = await this.getFee( contract );
    let rateFactorDelta = 0;

    let rateFactor = Number(contract.rateFactor) * this.context.contractShift;
    const totalLiquidity = Number(contract.totalLiquidity) * this.context.contractShift;
    const rateFactorSensitivity = Number(contract.rateFactorSensitivity) * this.context.contractShift;
    const swapDuration = Number(contract.swapDuration) * this.context.contractShift;
    const rateRange = Number(contract.rateRange) * this.context.contractShift;
    const slopeFactor = Number(contract.slopeFactor) * this.context.contractShift;
    const yOffset = Number(contract.yOffset) * this.context.contractShift;

    if ( Number(totalLiquidity) !== 0 ) {
      rateFactorDelta = (this.context.selectedSwapAmount * (rateFactorSensitivity * swapDuration)) / totalLiquidity;
    }

    if( this.context.selectedSwapPosition === "pFix" ) {
      rateFactor += rateFactorDelta;
    } else if ( this.context.selectedSwapPosition === "rFix" ) {
      rateFactor -= rateFactorDelta;
      fee = -fee;
    }

    return (((rateRange * rateFactor / (Math.sqrt((rateFactor * rateFactor) + slopeFactor))) + yOffset + fee) * 100);
  }

  async getMaturity( contract ) {
    let duration = Number(contract.swapDuration) * this.context.contractShift;
    if (duration >= 1) {
      return moment.utc().startOf('day').add(duration, 'day').format('MMMM Do, YYYY');
    } else {
      duration = Math.ceil(duration * 86400)
      return moment.utc().add(duration, 'seconds').format('MMMM Do, YYYY');
    }
  }

  async getCollateral( contract ) {
    const swapDuration = Number(contract.swapDuration) * this.context.contractShift;
    const maxPayoutRate = Number(contract.maxPayoutRate) * this.context.contractShift;
    const swapFixedRate = await this.getRate( contract );
    const daysInYear = 365;

    // Check with Mr. Wolff on this
    if (this.context.selectedSwapPosition === 'pFix') {
        return ((this.context.selectedSwapAmount * swapDuration * ( Number((swapFixedRate/100)))) / daysInYear).toFixed(10)
    } else if (this.context.selectedSwapPosition === 'rFix') {
        return ((this.context.selectedSwapAmount * swapDuration * maxPayoutRate) / daysInYear).toFixed(10)
    }
  }

  async getSwapDetails() {
    // const web3 = this.context.web3
    const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_INFURA_ID))
    const abi = coreAbi['abi'];
    const address = this.context.greenwoodAddresses[this.context.selectedSwapAsset];
    const instance = new web3.eth.Contract(abi, address);
    try {
      const result = await instance.methods.getState().call();

      // console.log( 'STATE: ', result );

      const rate = await this.getRate( result );
      const maturity = await this.getMaturity( result );
      const fee = await this.getFee( result );
      const collateral = await this.getCollateral( result );

      await this.context.setState({
        swapDetailRate: rate.toFixed(10)
        , swapDetailMaturity: maturity
        , swapDetailFee: (Number(fee) * 100).toFixed(10)
        , swapDetailCollateral: collateral
        , isValidCollateralAmount: Number(collateral) > 0.00000 ? true : false
      });

    } catch ( e ) {
      console.error(`Error fetching contract state for swap details - ${e.message}`)
    }

  }

  async validateSwapForm() {
    if (this.context.selectedSwapPosition && this.context.selectedSwapAmount && this.context.selectedSwapAsset) {
      await this.getSwapDetails();
    }
  }

  async handleSwapSubmit() {
    if( this.context.connected ) {
      this.context.setState({
        transactionStatus: 'Pending',
        transactionHash: ''
      });
      
      let allowance;
      try {
        const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_INFURA_ID))
        const greenwoodAddress = this.context.greenwoodAddresses[this.context.selectedSwapAsset];
        const tokenAbi = this.context.underlyingABIs[this.context.selectedSwapAsset];
        const tokenAddress = this.context.underlyingAddresses[this.context.selectedSwapAsset];
        const instance = new web3.eth.Contract(tokenAbi, tokenAddress);
        allowance = await instance.methods.allowance(this.context.address, greenwoodAddress).call();
      } catch( e ) {
        console.error( `Error getting allowance for current user in swap view - ${e.message}` );
      }

      if (Number(allowance) >= Number(this.context.swapDetailCollateral)) {
        try {
          await this.processSwap()
        } catch (e) {
          console.error( `Error executing swap with allowance - ${e.message}` );
        }
      } else {
        if (this.context.approveRadio === true) {
          try {
            await this.approveTransfer();
            await this.processSwap();
          } catch (e) {
            console.error(`Error executing swap with infinite approval - ${e.message}`)
          }
        } else {
          try {
            await this.approveTransfer();
            await this.processSwap();
          } catch (e) {
            console.error(`Error executing swap with scoped approval - ${e.message}`)
          }
        }
      }
    } else {
      alert('Connect to a wallet to execute a swap')
    }
  }

  async approveTransfer() {
    this.context.setState({
      approvalStatus: 'Pending',
      approvalHash: ''
    });
    const web3 = this.context.web3
    const greenwoodAddress = this.context.greenwoodAddresses[this.context.selectedSwapAsset];
    const tokenAbi = this.context.underlyingABIs[this.context.selectedSwapAsset];
    const tokenAddress = this.context.underlyingAddresses[this.context.selectedSwapAsset];
    const instance = new web3.eth.Contract(tokenAbi, tokenAddress);

    if (this.context.approveRadio === true ) {
      try {
        toast(<ApprovalToastContainer/>, {
          position: "bottom-right",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          transition: Zoom
        });
        const MAX_UINT = new BigNumber(2).pow(256).minus(1);
        const result = await instance.methods.approve(greenwoodAddress, MAX_UINT).send({from: this.context.address});
        this.context.setState({
          approvalStatus: 'Complete',
          approvalHash: result.transactionHash
        });
      } catch (e) {
        toast.dismiss()
        this.context.setState({
          approvalStatus: 'Pending'
        });
        throw new Error(`${e.message}`)
      }
    } else {
      try {
        toast(<ApprovalToastContainer/>, {
          position: "bottom-right",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          transition: Zoom
        });
        const approvalAmount = ((Number(this.context.swapDetailCollateral) + Number(this.context.swapDetailFee)) * Number(this.context.assetMantissas[this.context.selectedSwapAsset])).toLocaleString('fullwide', {useGrouping:false});
        const result = await instance.methods.approve(greenwoodAddress, approvalAmount).send({from: this.context.address});
        this.context.setState({
          approvalStatus: 'Complete',
          approvalHash: result.transactionHash
        });
      } catch (e) {
        toast.dismiss()
        this.context.setState({
          approvalStatus: 'Pending'
        });
        throw new Error(`${e.message}`)
      }
    }
  }

  async processSwap() {
    const web3 = this.context.web3
    const abi = coreAbi['abi'];
    const address = this.context.greenwoodAddresses[this.context.selectedSwapAsset];
    const instance = new web3.eth.Contract(abi, address);
    const amount = (Number(this.context.selectedSwapAmount) * Number(this.context.assetMantissas[this.context.selectedLiquidityAsset])).toLocaleString('fullwide', {useGrouping:false})

    if ( this.context.selectedSwapPosition === 'pFix' ) {
      try {
        toast(<TransactionToastContainer/>, {
          position: "bottom-right",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          transition: Zoom
        });
        const result = await instance.methods.openSwap(amount, 'pFix').send({from: this.context.address});
        this.context.setState({
          transactionStatus: 'Complete',
          transactionHash: result.transactionHash
        });
        await this.context.getHistory();
        // console.log( 'PAY FIXED RESULT: ', result );
      } catch ( e ) {
        toast.dismiss()
        this.context.setState({
          transactionStatus: 'Pending'
        });
        throw new Error(`Error opening payFixed swap - ${e.message}`);
      }
    } else if ( this.context.selectedSwapPosition === 'rFix' ) {
      try {
        toast(<TransactionToastContainer/>, {
          position: "bottom-right",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          transition: Zoom
        });
        const result = await instance.methods.openSwap(amount, 'rFix').send({from: this.context.address});
        this.context.setState({
          transactionStatus: 'Complete',
          transactionHash: result.transactionHash
        });
        await this.context.getHistory();
        // console.log( 'RECEIVE FIXED RESULT: ', result );
      } catch ( e ) {
        toast.dismiss()
        this.context.setState({
          transactionStatus: 'Pending'
        });
        throw new Error(`Error opening receiveFixed swap - ${e.message}`)
      }
    } else {
      throw new Error ('Malformed swap position');
    }
  }



  
  render() {
    return (
      <main className="aligner">
        <ToastContainer
          position="bottom-right"
          autoClose={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          transition={Zoom}
        />
        <div className="" style={{width: "100%", textAlign: "center", minHeight: "75vh"}}>
          <div className="chain-warning-div">
            <button disabled className={this.context.isOnSupportedNetwork ? "chain-warning-btn-hidden" : "chain-warning-btn"}>Connect to the Kovan testnet to use Greenwood</button>
          </div>
          <select className="swap-select" name="selectedSwapPosition" onChange={this.handleChange}>
            {this.context.positions.map(function (item, key) {
              return ( <option value={item.key} key={item.key}>{item.display}</option>)
              })
            }
          </select>
          <span className="form-span">a fixed interest rate on</span>
          <input className="form-input" type="number" placeholder="---" name="selectedSwapAmount" onChange={this.handleChange} value={this.context.selectedSwapAmount} onFocus={e => e.target.value === this.context.selectedSwapAmount ? e.target.value = '' : null}/>
          <select className="swap-select" name="selectedSwapAsset" onChange={this.handleChange}>
            {this.context.greenwoodAssets.map(function (item, key) {
              return ( <option value={item.key} key={item.key}>{item.display}</option>)
              })
            }
          </select>

          <div className="" style={{width: "35%", margin: "auto", marginTop: "5%"}}>
            <div className="swap-detail">
              <h6 className="swap-detail-label">The fixed rate for this swap is</h6>
              <div>
                  <ul className="swap__nav__links">
                    <li className="swap-detail-value">
                      {this.context.swapDetailRate ? this.context.swapDetailRate + '%' : '---'}
                    </li>
                  </ul>
              </div>
            </div>

            <div className="swap-detail">
              <h6 className="swap-detail-label">The payout day for this swap is</h6>
              <div>
                  <ul className="swap__nav__links">
                      <li className="swap-detail-value">
                        {this.context.swapDetailMaturity ? this.context.swapDetailMaturity : '---'} 
                      </li>
                  </ul>
              </div>
            </div>

            {/* <div className="swap-detail">
              <h6 className="swap-detail-label">The liquidity fee for this swap is</h6>
              <div>
                  <ul className="swap__nav__links">
                      <li className="swap-detail-value">
                        {this.context.swapDetailFee ? `${this.context.swapDetailFee}%` : '---'} 
                      </li>
                  </ul>
              </div>
            </div> */}

            <div className="swap-detail">
              <h6 className="swap-detail-label">The collateral required for this swap is</h6>
              <div>
                  <ul className="swap__nav__links">
                      <li className="swap-detail-value">
                        {this.context.swapDetailCollateral ? this.context.swapDetailCollateral : '---'} {this.context.swapDetailCollateral && this.context.selectedSwapAsset ? this.context.selectedSwapAsset.toUpperCase() : ''} 
                        {/* <span className="va-middle-bg-transparent">
                          <HelpCircle className="detail-help-circle"/>
                        </span> */}
                      </li>
                  </ul>
              </div>
            </div>
            <div style={{marginTop: "5%"}}>
            <button 
              className={this.context.connected && this.context.isValidCollateralAmount && this.context.isOnSupportedNetwork ? 'submit-btn' : 'submit-btn-not-connected'} 
              onClick={this.context.connected && this.context.isOnSupportedNetwork ? this.handleSwapSubmit : this.context.onConnect} 
              disabled={(this.context.connected && !this.context.isOnSupportedNetwork) || (this.context.connected && !this.context.isValidCollateralAmount) ? true : false}>
                {this.context.connected && this.context.isOnSupportedNetwork ? 'Swap' : this.context.connected && !this.context.isOnSupportedNetwork ? 'Connect to Kovan testnet' : 'Connect to a wallet'}
              </button>
            <div className={this.context.isValidCollateralAmount && this.context.isOnSupportedNetwork ? ' aligner infinite-approve-div' : 'aligner infinite-approve-div-hidden'} style={{marginTop: "5%"}}>
              <label className={this.context.approveRadio === true ? "approve-label" : "approve-label-disabled"}><input type="checkbox" name="approveRadio" id="name" className="approve-radio" onChange={this.handleChange}/>Infinite approval</label>
            </div>
            <div className="aligner" style={{marginTop: "1%", textAlign: "center"}}>
              <button disabled className={this.context.isValidCollateralAmount ? "warning-btn-hidden" : "warning-btn"}>The collateral required for a swap can not be 0</button>
            </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

}

export default withRouter(SwapContainer);