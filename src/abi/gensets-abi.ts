export const Gensets_abi = [
  {
    type: "constructor",
    inputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "receive",
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "MAX_SUPPLY",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "MINT_PRICE",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "approve",
    inputs: [
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "balanceOf",
    inputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "currentSupply",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "erc721Interface",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IERC721A",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "gensetSerialNumberToInformation",
    inputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [
      {
        name: "sertificateName",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "sertiticateModel",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "serialNumber",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "customerName",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "sellerName",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "publishedDate",
        type: "uint32",
        internalType: "uint32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getApproved",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getGensetInformation",
    inputs: [
      {
        name: "_gensetSerialNumber",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct Gensets.Information",
        components: [
          {
            name: "sertificateName",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "sertiticateModel",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "serialNumber",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "customerName",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "sellerName",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "publishedDate",
            type: "uint32",
            internalType: "uint32",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getGensetOwner",
    inputs: [
      {
        name: "_genset",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "_owner",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getUserGensets",
    inputs: [
      {
        name: "_user",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bytes32[]",
        internalType: "bytes32[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isApprovedForAll",
    inputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
      {
        name: "operator",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "mint",
    inputs: [
      {
        name: "_quantity",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_customerName",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "_sellerName",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "_publishedDate",
        type: "uint32",
        internalType: "uint32",
      },
      {
        name: "_sertificateName",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "_sertiticateModel",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "name",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "string",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "ownerOf",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "safeTransferFrom",
    inputs: [
      {
        name: "from",
        type: "address",
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "safeTransferFrom",
    inputs: [
      {
        name: "from",
        type: "address",
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_data",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "setApprovalForAll",
    inputs: [
      {
        name: "operator",
        type: "address",
        internalType: "address",
      },
      {
        name: "approved",
        type: "bool",
        internalType: "bool",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setBaseURI",
    inputs: [
      {
        name: "baseURI",
        type: "string",
        internalType: "string",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "supportsInterface",
    inputs: [
      {
        name: "interfaceId",
        type: "bytes4",
        internalType: "bytes4",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "symbol",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "string",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "tokenURI",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "string",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalSupply",
    inputs: [],
    outputs: [
      {
        name: "result",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "transferFrom",
    inputs: [
      {
        name: "from",
        type: "address",
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [
      {
        name: "newOwner",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "Approval",
    inputs: [
      {
        name: "owner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "approved",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ApprovalForAll",
    inputs: [
      {
        name: "owner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "operator",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "approved",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ConsecutiveTransfer",
    inputs: [
      {
        name: "fromTokenId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "toTokenId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "from",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Transfer",
    inputs: [
      {
        name: "from",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "ApprovalCallerNotOwnerNorApproved",
    inputs: [],
  },
  {
    type: "error",
    name: "ApprovalQueryForNonexistentToken",
    inputs: [],
  },
  {
    type: "error",
    name: "BalanceQueryForZeroAddress",
    inputs: [],
  },
  {
    type: "error",
    name: "MintERC2309QuantityExceedsLimit",
    inputs: [],
  },
  {
    type: "error",
    name: "MintToZeroAddress",
    inputs: [],
  },
  {
    type: "error",
    name: "MintZeroQuantity",
    inputs: [],
  },
  {
    type: "error",
    name: "NotCompatibleWithSpotMints",
    inputs: [],
  },
  {
    type: "error",
    name: "NotValidToMint",
    inputs: [
      {
        name: "_quantity",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_sent",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_population",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "error",
    name: "OwnableInvalidOwner",
    inputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "OwnableUnauthorizedAccount",
    inputs: [
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "OwnerQueryForNonexistentToken",
    inputs: [],
  },
  {
    type: "error",
    name: "OwnershipNotInitializedForExtraData",
    inputs: [],
  },
  {
    type: "error",
    name: "SequentialMintExceedsLimit",
    inputs: [],
  },
  {
    type: "error",
    name: "SequentialUpToTooSmall",
    inputs: [],
  },
  {
    type: "error",
    name: "SpotMintTokenIdTooSmall",
    inputs: [],
  },
  {
    type: "error",
    name: "TokenAlreadyExists",
    inputs: [],
  },
  {
    type: "error",
    name: "TransferCallerNotOwnerNorApproved",
    inputs: [],
  },
  {
    type: "error",
    name: "TransferFromIncorrectOwner",
    inputs: [],
  },
  {
    type: "error",
    name: "TransferToNonERC721ReceiverImplementer",
    inputs: [],
  },
  {
    type: "error",
    name: "TransferToZeroAddress",
    inputs: [],
  },
  {
    type: "error",
    name: "URIQueryForNonexistentToken",
    inputs: [],
  },
] as const;