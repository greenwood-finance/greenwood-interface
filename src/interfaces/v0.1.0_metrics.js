const metrics = {
  "contractName": "alpha_metrics",
  "abi": [
    {
      "outputs": [],
      "inputs": [
        {
          "type": "address",
          "name": "_admin_addr"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "name": "getMetrics",
      "outputs": [
        {
          "type": "tuple",
          "name": "",
          "components": [
            {
              "type": "int128",
              "name": "swapCollateral"
            },
            {
              "type": "int128",
              "name": "receiveFixedCollateral"
            },
            {
              "type": "int128",
              "name": "payFixedCollateral"
            },
            {
              "type": "int128",
              "name": "swapNotional"
            },
            {
              "type": "int128",
              "name": "receiveFixedNotional"
            },
            {
              "type": "int128",
              "name": "payFixedNotional"
            },
            {
              "type": "int128",
              "name": "receiveFixedCount"
            },
            {
              "type": "int128",
              "name": "payFixedCount"
            }
          ]
        }
      ],
      "inputs": [],
      "stateMutability": "view",
      "type": "function",
      "gas": 9396,
      "constant": true
    },
    {
      "name": "updateMetrics",
      "outputs": [],
      "inputs": [
        {
          "type": "string",
          "name": "_swap_type"
        },
        {
          "type": "int128",
          "name": "_notional"
        },
        {
          "type": "int128",
          "name": "_collateral"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function",
      "gas": 182305
    },
    {
      "name": "setContract",
      "outputs": [],
      "inputs": [
        {
          "type": "address",
          "name": "_contract_addr"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function",
      "gas": 36307
    }
  ],
  "bytecode": "0x740100000000000000000000000000000000000000006020526f7fffffffffffffffffffffffffffffff6040527fffffffffffffffffffffffffffffffff8000000000000000000000000000000060605274012a05f1fffffffffffffffffffffffffdabf41c006080527ffffffffffffffffffffffffed5fa0e000000000000000000000000000000000060a052602061084f6101403934156100a157600080fd5b602061084f60c03960c05160205181106100ba57600080fd5b506101405160005561083756600436101561000d5761076a565b600035601c52740100000000000000000000000000000000000000006020526f7fffffffffffffffffffffffffffffff6040527fffffffffffffffffffffffffffffffff8000000000000000000000000000000060605274012a05f1fffffffffffffffffffffffffdabf41c006080527ffffffffffffffffffffffffed5fa0e000000000000000000000000000000000060a052637606f78160005114156103e65734156100ba57600080fd5b6101408080806060516402540be400600254600160a05181806100dc57600080fd5b6402540be400840205806080519013156100f557600080fd5b809190121561010357600080fd5b90509050058060405190131561011857600080fd5b809190121561012657600080fd5b8152505060208101905080806060516402540be400600354600160a051818061014e57600080fd5b6402540be4008402058060805190131561016757600080fd5b809190121561017557600080fd5b90509050058060405190131561018a57600080fd5b809190121561019857600080fd5b8152505060208101905080806060516402540be400600454600160a05181806101c057600080fd5b6402540be400840205806080519013156101d957600080fd5b80919012156101e757600080fd5b9050905005806040519013156101fc57600080fd5b809190121561020a57600080fd5b8152505060208101905080806060516402540be400600554600160a051818061023257600080fd5b6402540be4008402058060805190131561024b57600080fd5b809190121561025957600080fd5b90509050058060405190131561026e57600080fd5b809190121561027c57600080fd5b8152505060208101905080806060516402540be400600654600160a05181806102a457600080fd5b6402540be400840205806080519013156102bd57600080fd5b80919012156102cb57600080fd5b9050905005806040519013156102e057600080fd5b80919012156102ee57600080fd5b8152505060208101905080806060516402540be400600754600160a051818061031657600080fd5b6402540be4008402058060805190131561032f57600080fd5b809190121561033d57600080fd5b90509050058060405190131561035257600080fd5b809190121561036057600080fd5b8152505060208101905080806060516402540be400600854058060405190131561038957600080fd5b809190121561039757600080fd5b8152505060208101905080806060516402540be40060095405806040519013156103c057600080fd5b80919012156103ce57600080fd5b815250506101009050905060c05260c051610140f350005b6310eb942c60005114156107285734156103ff57600080fd5b602460043560040161014037600460043560040135111561041f57600080fd5b6060516024358060405190131561043557600080fd5b809190121561044357600080fd5b506060516044358060405190131561045a57600080fd5b809190121561046857600080fd5b50600154331461047757600080fd5b6402540be40060243502600160a051818302831583858305141761049a57600080fd5b6402540be40081059050806080519013156104b457600080fd5b80919012156104c257600080fd5b905090506101a0526402540be40060443502600160a05181830283158385830514176104ed57600080fd5b6402540be400810590508060805190131561050757600080fd5b809190121561051557600080fd5b905090506101c052600280546101c05160a0518183018060805190131561053b57600080fd5b809190121561054957600080fd5b90509050815550600580546101a05160a0518183018060805190131561056e57600080fd5b809190121561057c57600080fd5b905090508155507f552352f44dee41eecdbbe3608abda4caa530e0c60f1076cabb98a530b7b9dd43610140805160208201209050141561065657600480546101c05160a051818301806080519013156105d457600080fd5b80919012156105e257600080fd5b90509050815550600980546402540be40060a0518183018060805190131561060957600080fd5b809190121561061757600080fd5b90509050815550600780546101a05160a0518183018060805190131561063c57600080fd5b809190121561064a57600080fd5b90509050815550610726565b7faa2d0000bc24f0b10932491d4398b6d19a3f676670e060cf27c705788b231218610140805160208201209050141561072557600380546101c05160a051818301806080519013156106a757600080fd5b80919012156106b557600080fd5b90509050815550600880546402540be40060a051818301806080519013156106dc57600080fd5b80919012156106ea57600080fd5b90509050815550600680546101a05160a0518183018060805190131561070f57600080fd5b809190121561071d57600080fd5b905090508155505b5b005b6375f890ab600051141561076957341561074157600080fd5b600435602051811061075257600080fd5b50336000541461076157600080fd5b600435600155005b5b60006000fd5b6100c7610837036100c76000396100c7610837036000f3",
  "deployedBytecode": "0x600436101561000d5761076a565b600035601c52740100000000000000000000000000000000000000006020526f7fffffffffffffffffffffffffffffff6040527fffffffffffffffffffffffffffffffff8000000000000000000000000000000060605274012a05f1fffffffffffffffffffffffffdabf41c006080527ffffffffffffffffffffffffed5fa0e000000000000000000000000000000000060a052637606f78160005114156103e65734156100ba57600080fd5b6101408080806060516402540be400600254600160a05181806100dc57600080fd5b6402540be400840205806080519013156100f557600080fd5b809190121561010357600080fd5b90509050058060405190131561011857600080fd5b809190121561012657600080fd5b8152505060208101905080806060516402540be400600354600160a051818061014e57600080fd5b6402540be4008402058060805190131561016757600080fd5b809190121561017557600080fd5b90509050058060405190131561018a57600080fd5b809190121561019857600080fd5b8152505060208101905080806060516402540be400600454600160a05181806101c057600080fd5b6402540be400840205806080519013156101d957600080fd5b80919012156101e757600080fd5b9050905005806040519013156101fc57600080fd5b809190121561020a57600080fd5b8152505060208101905080806060516402540be400600554600160a051818061023257600080fd5b6402540be4008402058060805190131561024b57600080fd5b809190121561025957600080fd5b90509050058060405190131561026e57600080fd5b809190121561027c57600080fd5b8152505060208101905080806060516402540be400600654600160a05181806102a457600080fd5b6402540be400840205806080519013156102bd57600080fd5b80919012156102cb57600080fd5b9050905005806040519013156102e057600080fd5b80919012156102ee57600080fd5b8152505060208101905080806060516402540be400600754600160a051818061031657600080fd5b6402540be4008402058060805190131561032f57600080fd5b809190121561033d57600080fd5b90509050058060405190131561035257600080fd5b809190121561036057600080fd5b8152505060208101905080806060516402540be400600854058060405190131561038957600080fd5b809190121561039757600080fd5b8152505060208101905080806060516402540be40060095405806040519013156103c057600080fd5b80919012156103ce57600080fd5b815250506101009050905060c05260c051610140f350005b6310eb942c60005114156107285734156103ff57600080fd5b602460043560040161014037600460043560040135111561041f57600080fd5b6060516024358060405190131561043557600080fd5b809190121561044357600080fd5b506060516044358060405190131561045a57600080fd5b809190121561046857600080fd5b50600154331461047757600080fd5b6402540be40060243502600160a051818302831583858305141761049a57600080fd5b6402540be40081059050806080519013156104b457600080fd5b80919012156104c257600080fd5b905090506101a0526402540be40060443502600160a05181830283158385830514176104ed57600080fd5b6402540be400810590508060805190131561050757600080fd5b809190121561051557600080fd5b905090506101c052600280546101c05160a0518183018060805190131561053b57600080fd5b809190121561054957600080fd5b90509050815550600580546101a05160a0518183018060805190131561056e57600080fd5b809190121561057c57600080fd5b905090508155507f552352f44dee41eecdbbe3608abda4caa530e0c60f1076cabb98a530b7b9dd43610140805160208201209050141561065657600480546101c05160a051818301806080519013156105d457600080fd5b80919012156105e257600080fd5b90509050815550600980546402540be40060a0518183018060805190131561060957600080fd5b809190121561061757600080fd5b90509050815550600780546101a05160a0518183018060805190131561063c57600080fd5b809190121561064a57600080fd5b90509050815550610726565b7faa2d0000bc24f0b10932491d4398b6d19a3f676670e060cf27c705788b231218610140805160208201209050141561072557600380546101c05160a051818301806080519013156106a757600080fd5b80919012156106b557600080fd5b90509050815550600880546402540be40060a051818301806080519013156106dc57600080fd5b80919012156106ea57600080fd5b90509050815550600680546101a05160a0518183018060805190131561070f57600080fd5b809190121561071d57600080fd5b905090508155505b5b005b6375f890ab600051141561076957341561074157600080fd5b600435602051811061075257600080fd5b50336000541461076157600080fd5b600435600155005b5b60006000fd",
  "source": "# (c) 2020 Greenwood\n# @title Greenwood Model\n# @author Brandon McFarland\n# @notice A swap metric storage contract for the Greenwood protocol\n\nCONTRACT_PRECISION: constant(decimal) = 0.0000000001\n\nstruct Metrics:\n    swapCollateral: int128\n    receiveFixedCollateral: int128\n    payFixedCollateral: int128\n    swapNotional: int128\n    receiveFixedNotional: int128\n    payFixedNotional: int128\n    receiveFixedCount: int128\n    payFixedCount: int128\n\nadmin: address\ngreenwoodContract: address\nswapCollateral: decimal\nreceiveFixedCollateral: decimal\npayFixedCollateral: decimal\nswapNotional: decimal\nreceiveFixedNotional: decimal\npayFixedNotional: decimal\nreceiveFixedCount: decimal\npayFixedCount: decimal\n\n@external\ndef __init__(\n        _admin_addr: address\n    ):\n    self.admin = _admin_addr\n\n@external\n@view\ndef getMetrics() -> Metrics:\n\n    return Metrics({\n        swapCollateral: convert(self.swapCollateral / CONTRACT_PRECISION, int128),\n        receiveFixedCollateral: convert(self.receiveFixedCollateral / CONTRACT_PRECISION, int128),\n        payFixedCollateral: convert(self.payFixedCollateral / CONTRACT_PRECISION, int128),\n        swapNotional: convert(self.swapNotional / CONTRACT_PRECISION, int128),\n        receiveFixedNotional: convert(self.receiveFixedNotional / CONTRACT_PRECISION, int128),\n        payFixedNotional: convert(self.payFixedNotional / CONTRACT_PRECISION, int128),\n        receiveFixedCount: convert(self.receiveFixedCount, int128),\n        payFixedCount: convert(self.payFixedCount, int128)\n    })\n\n@external\ndef updateMetrics(\n        _swap_type: String[4], \n        _notional: int128, \n        _collateral: int128\n    ):\n    assert msg.sender == self.greenwoodContract\n\n    notionalDecimal: decimal = convert(_notional, decimal) * CONTRACT_PRECISION\n    collateralDecimal: decimal = convert(_collateral, decimal) * CONTRACT_PRECISION\n\n    self.swapCollateral += collateralDecimal\n    self.swapNotional += notionalDecimal\n\n    if keccak256(_swap_type) == keccak256(\"pFix\"):\n        self.payFixedCollateral += collateralDecimal\n        self.payFixedCount += 1.0\n        self.payFixedNotional += notionalDecimal\n    elif keccak256(_swap_type) == keccak256(\"rFix\"):\n        self.receiveFixedCollateral += collateralDecimal\n        self.receiveFixedCount += 1.0\n        self.receiveFixedNotional += notionalDecimal\n\n@external\ndef setContract(_contract_addr: address):\n    assert self.admin == msg.sender\n    self.greenwoodContract = _contract_addr\n\n    ",
  "sourcePath": "/Users/brandonmcfaraland/Desktop/protocol/dev_protocol_contracts/contracts/alpha/alpha_metrics.vy",
  "compiler": {
    "name": "vyper",
    "version": "0.2.3+commit.006968f"
  },
  "networks": {
    "1": {
      "events": {},
      "links": {},
      "address": "0x431BB1c95BeD53928e83CD94adE021b8A1b1721e",
      "transactionHash": "0x49c6a1c5e19a531479b977608f85a48a663e7fb1710978dc21e77190f3388f0d"
    },
    "42": {
      "events": {},
      "links": {},
      "address": "0x541A5A99335914440d7eBbcf383101B29DefE206",
      "transactionHash": "0x38d4cbcbfd0de9ec8448b954a35e4cdd641dd93e0def26731d2b05b4b4bb7665"
    }
  },
  "schemaVersion": "3.2.0",
  "updatedAt": "2020-11-11T13:36:33.245Z",
  "networkType": "ethereum"
}
  
  module.exports = metrics;