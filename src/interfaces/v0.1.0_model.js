const model = {
  "contractName": "v0.1.1_model",
  "abi": [
    {
      "outputs": [],
      "inputs": [
        {
          "type": "address",
          "name": "_admin_addr"
        },
        {
          "type": "int128",
          "name": "_y_offset"
        },
        {
          "type": "int128",
          "name": "_slope_factor"
        },
        {
          "type": "int128",
          "name": "_rate_factor_sensitivity"
        },
        {
          "type": "int128",
          "name": "_fee_base"
        },
        {
          "type": "int128",
          "name": "_fee_sensitivity"
        },
        {
          "type": "int128",
          "name": "_range"
        },
        {
          "type": "int128",
          "name": "_utilization_inflection"
        },
        {
          "type": "int128",
          "name": "_utilization_multiplier"
        },
        {
          "type": "int128",
          "name": "_min_payout_rate"
        },
        {
          "type": "int128",
          "name": "_max_payout_rate"
        },
        {
          "type": "bool",
          "name": "_is_paused"
        },
        {
          "type": "bool",
          "name": "_close_swap_override"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "name": "getModel",
      "outputs": [
        {
          "type": "tuple",
          "name": "",
          "components": [
            {
              "type": "int128",
              "name": "yOffset"
            },
            {
              "type": "int128",
              "name": "slopeFactor"
            },
            {
              "type": "int128",
              "name": "rateFactorSensitivity"
            },
            {
              "type": "int128",
              "name": "feeBase"
            },
            {
              "type": "int128",
              "name": "feeSensitivity"
            },
            {
              "type": "int128",
              "name": "rateRange"
            },
            {
              "type": "int128",
              "name": "utilizationInflection"
            },
            {
              "type": "int128",
              "name": "utilizationMultiplier"
            },
            {
              "type": "int128",
              "name": "minPayoutRate"
            },
            {
              "type": "int128",
              "name": "maxPayoutRate"
            },
            {
              "type": "bool",
              "name": "isPaused"
            },
            {
              "type": "bool",
              "name": "closeSwapOverride"
            }
          ]
        }
      ],
      "inputs": [],
      "stateMutability": "view",
      "type": "function",
      "gas": 11459,
      "constant": true
    },
    {
      "name": "setModel",
      "outputs": [],
      "inputs": [
        {
          "type": "int128",
          "name": "_y_offset"
        },
        {
          "type": "int128",
          "name": "_slope_factor"
        },
        {
          "type": "int128",
          "name": "_rate_factor_sensitivity"
        },
        {
          "type": "int128",
          "name": "_fee_base"
        },
        {
          "type": "int128",
          "name": "_fee_sensitivity"
        },
        {
          "type": "int128",
          "name": "_range"
        },
        {
          "type": "int128",
          "name": "_utilization_inflection"
        },
        {
          "type": "int128",
          "name": "_utilization_multiplier"
        },
        {
          "type": "int128",
          "name": "_min_payout_rate"
        },
        {
          "type": "int128",
          "name": "_max_payout_rate"
        },
        {
          "type": "bool",
          "name": "_is_paused"
        },
        {
          "type": "bool",
          "name": "_close_swap_override"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function",
      "gas": 422309
    }
  ],
  "bytecode": "0x740100000000000000000000000000000000000000006020526f7fffffffffffffffffffffffffffffff6040527fffffffffffffffffffffffffffffffff8000000000000000000000000000000060605274012a05f1fffffffffffffffffffffffffdabf41c006080527ffffffffffffffffffffffffed5fa0e000000000000000000000000000000000060a0526101a061074d6101403934156100a257600080fd5b602061074d60c03960c05160205181106100bb57600080fd5b506060516020602061074d0160c03960c051806040519013156100dd57600080fd5b80919012156100eb57600080fd5b506060516020604061074d0160c03960c0518060405190131561010d57600080fd5b809190121561011b57600080fd5b506060516020606061074d0160c03960c0518060405190131561013d57600080fd5b809190121561014b57600080fd5b506060516020608061074d0160c03960c0518060405190131561016d57600080fd5b809190121561017b57600080fd5b50606051602060a061074d0160c03960c0518060405190131561019d57600080fd5b80919012156101ab57600080fd5b50606051602060c061074d0160c03960c051806040519013156101cd57600080fd5b80919012156101db57600080fd5b50606051602060e061074d0160c03960c051806040519013156101fd57600080fd5b809190121561020b57600080fd5b50606051602061010061074d0160c03960c0518060405190131561022e57600080fd5b809190121561023c57600080fd5b50606051602061012061074d0160c03960c0518060405190131561025f57600080fd5b809190121561026d57600080fd5b50606051602061014061074d0160c03960c0518060405190131561029057600080fd5b809190121561029e57600080fd5b50602061016061074d0160c03960c051600281106102bb57600080fd5b50602061018061074d0160c03960c051600281106102d857600080fd5b506101405160005561016051600155610180516002556101a0516003556101c0516004556101e0516005556102005160065561022051600755610240516008556102605160095561028051600a556102a051600b556102c051600c5561073556600436101561000d576103f6565b600035601c52740100000000000000000000000000000000000000006020526f7fffffffffffffffffffffffffffffff6040527fffffffffffffffffffffffffffffffff8000000000000000000000000000000060605274012a05f1fffffffffffffffffffffffffdabf41c006080527ffffffffffffffffffffffffed5fa0e000000000000000000000000000000000060a05263a0bfa1e060005114156101e85734156100ba57600080fd5b61018036610140376001546101405260025461016052600354610180526004546101a0526005546101c0526006546101e052600754610200526008546102205260095461024052600a5461026052600b5461028052600c546102a0526102c08080806101405181525050602081019050808061016051815250506020810190508080610180518152505060208101905080806101a0518152505060208101905080806101c0518152505060208101905080806101e05181525050602081019050808061020051815250506020810190508080610220518152505060208101905080806102405181525050602081019050808061026051815250506020810190508080610280518152505060208101905080806102a051815250506101809050905060c05260c0516102c0f350005b63bf15187760005114156103f557341561020157600080fd5b6060516004358060405190131561021757600080fd5b809190121561022557600080fd5b506060516024358060405190131561023c57600080fd5b809190121561024a57600080fd5b506060516044358060405190131561026157600080fd5b809190121561026f57600080fd5b506060516064358060405190131561028657600080fd5b809190121561029457600080fd5b50606051608435806040519013156102ab57600080fd5b80919012156102b957600080fd5b5060605160a435806040519013156102d057600080fd5b80919012156102de57600080fd5b5060605160c435806040519013156102f557600080fd5b809190121561030357600080fd5b5060605160e4358060405190131561031a57600080fd5b809190121561032857600080fd5b50606051610104358060405190131561034057600080fd5b809190121561034e57600080fd5b50606051610124358060405190131561036657600080fd5b809190121561037457600080fd5b50610144356002811061038657600080fd5b50610164356002811061039857600080fd5b5060005433146103a757600080fd5b60043560015560243560025560443560035560643560045560843560055560a43560065560c43560075560e4356008556101043560095561012435600a5561014435600b5561016435600c55005b5b60006000fd5b61033961073503610339600039610339610735036000f3",
  "deployedBytecode": "0x600436101561000d576103f6565b600035601c52740100000000000000000000000000000000000000006020526f7fffffffffffffffffffffffffffffff6040527fffffffffffffffffffffffffffffffff8000000000000000000000000000000060605274012a05f1fffffffffffffffffffffffffdabf41c006080527ffffffffffffffffffffffffed5fa0e000000000000000000000000000000000060a05263a0bfa1e060005114156101e85734156100ba57600080fd5b61018036610140376001546101405260025461016052600354610180526004546101a0526005546101c0526006546101e052600754610200526008546102205260095461024052600a5461026052600b5461028052600c546102a0526102c08080806101405181525050602081019050808061016051815250506020810190508080610180518152505060208101905080806101a0518152505060208101905080806101c0518152505060208101905080806101e05181525050602081019050808061020051815250506020810190508080610220518152505060208101905080806102405181525050602081019050808061026051815250506020810190508080610280518152505060208101905080806102a051815250506101809050905060c05260c0516102c0f350005b63bf15187760005114156103f557341561020157600080fd5b6060516004358060405190131561021757600080fd5b809190121561022557600080fd5b506060516024358060405190131561023c57600080fd5b809190121561024a57600080fd5b506060516044358060405190131561026157600080fd5b809190121561026f57600080fd5b506060516064358060405190131561028657600080fd5b809190121561029457600080fd5b50606051608435806040519013156102ab57600080fd5b80919012156102b957600080fd5b5060605160a435806040519013156102d057600080fd5b80919012156102de57600080fd5b5060605160c435806040519013156102f557600080fd5b809190121561030357600080fd5b5060605160e4358060405190131561031a57600080fd5b809190121561032857600080fd5b50606051610104358060405190131561034057600080fd5b809190121561034e57600080fd5b50606051610124358060405190131561036657600080fd5b809190121561037457600080fd5b50610144356002811061038657600080fd5b50610164356002811061039857600080fd5b5060005433146103a757600080fd5b60043560015560243560025560443560035560643560045560843560055560a43560065560c43560075560e4356008556101043560095561012435600a5561014435600b5561016435600c55005b5b60006000fd",
  "source": "# (c) 2020 Greenwood\n# @title Greenwood Model\n# @author Brandon McFarland\n# @notice An interest rate model storage contract for the Greenwood protocol\n\nstruct modelStruct:\n    yOffset: int128\n    slopeFactor:int128\n    rateFactorSensitivity: int128\n    feeBase: int128\n    feeSensitivity: int128\n    rateRange: int128\n    utilizationInflection: int128\n    utilizationMultiplier: int128\n    minPayoutRate: int128\n    maxPayoutRate:int128\n    isPaused: bool\n    closeSwapOverride: bool\n\nadmin: address\nyOffset: int128\nslopeFactor: int128\nrateFactorSensitivity: int128\nfeeBase: int128\nfeeSensitivity: int128\nrateRange: int128\nutilizationInflection: int128\nutilizationMultiplier: int128\nminPayoutRate: int128\nmaxPayoutRate: int128\nisPaused: bool\ncloseSwapOverride:bool\n\n@external\ndef __init__(_admin_addr:address, _y_offset: int128, _slope_factor:int128, _rate_factor_sensitivity: int128, _fee_base: int128, _fee_sensitivity: int128, _range: int128, _utilization_inflection: int128, _utilization_multiplier: int128, _min_payout_rate: int128, _max_payout_rate:int128, _is_paused: bool, _close_swap_override: bool):\n    self.admin = _admin_addr\n    self.yOffset = _y_offset\n    self.slopeFactor = _slope_factor\n    self.rateFactorSensitivity = _rate_factor_sensitivity\n    self.feeBase = _fee_base\n    self.feeSensitivity = _fee_sensitivity\n    self.rateRange = _range\n    self.utilizationInflection = _utilization_inflection\n    self.utilizationMultiplier = _utilization_multiplier\n    self.minPayoutRate = _min_payout_rate\n    self.maxPayoutRate = _max_payout_rate\n    self.isPaused = _is_paused\n    self.closeSwapOverride = _close_swap_override\n\n@external\n@view\ndef getModel() -> modelStruct:\n    currentModel: modelStruct = empty(modelStruct)\n    currentModel.yOffset = self.yOffset\n    currentModel.slopeFactor = self.slopeFactor\n    currentModel.rateFactorSensitivity = self.rateFactorSensitivity\n    currentModel.feeBase = self.feeBase\n    currentModel.feeSensitivity = self.feeSensitivity\n    currentModel.rateRange = self.rateRange\n    currentModel.utilizationInflection = self.utilizationInflection\n    currentModel.utilizationMultiplier = self.utilizationMultiplier\n    currentModel.minPayoutRate = self.minPayoutRate\n    currentModel.maxPayoutRate = self.maxPayoutRate\n    currentModel.isPaused = self.isPaused\n    currentModel.closeSwapOverride = self.closeSwapOverride\n\n    return currentModel\n\n@external\ndef setModel( _y_offset: int128, _slope_factor:int128, _rate_factor_sensitivity: int128, _fee_base: int128, _fee_sensitivity: int128, _range: int128, _utilization_inflection: int128, _utilization_multiplier: int128, _min_payout_rate: int128, _max_payout_rate:int128, _is_paused: bool, _close_swap_override: bool):\n    assert msg.sender == self.admin\n    self.yOffset = _y_offset\n    self.slopeFactor = _slope_factor\n    self.rateFactorSensitivity = _rate_factor_sensitivity\n    self.feeBase = _fee_base\n    self.feeSensitivity = _fee_sensitivity\n    self.rateRange = _range\n    self.utilizationInflection = _utilization_inflection\n    self.utilizationMultiplier = _utilization_multiplier\n    self.minPayoutRate = _min_payout_rate\n    self.maxPayoutRate = _max_payout_rate\n    self.isPaused = _is_paused\n    self.closeSwapOverride = _close_swap_override",
  "sourcePath": "/Users/brandonmcfaraland/Desktop/protocol/dev_protocol_contracts/contracts/v0.1.1_model.vy",
  "compiler": {
    "name": "vyper",
    "version": "0.2.3+commit.006968f"
  },
  "networks": {
    "42": {
      "events": {},
      "links": {},
      "address": "0x968c4F973Fb08171a917bA5a5F0dc051b16970ab",
      "transactionHash": "0x82b202ad939c85866994a05e0d46246107da3e72c383d4f919cdae07be5f23a6"
    }
  },
  "schemaVersion": "3.2.0",
  "updatedAt": "2020-10-19T14:02:49.150Z",
  "networkType": "ethereum"
}
  
  module.exports = model;