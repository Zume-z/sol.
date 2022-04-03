// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.11;

library Solo {
  enum AssetDenomination {
    Wei,
    Par
  }
  enum AssetReference {
    Delta,
    Target
  }
  struct AssetAmount {
    bool sign;
    AssetDenomination denomination;
    AssetReference ref;
    uint256 value;
  }
  struct Info {
    address owner;
    uint256 number;
  }
  enum ActionType {
    Deposit,
    Withdraw,
    Transfer,
    Buy,
    Sell,
    Trade,
    Liquidate,
    Vaporize,
    Call
  }
  struct ActionArgs {
    ActionType actionType;
    uint256 accountId;
    Solo.AssetAmount amount;
    uint256 primaryMarketId;
    uint256 secondaryMarketId;
    address otherAddress;
    uint256 otherAccountId;
    bytes data;
  }
}
