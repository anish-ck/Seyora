// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {TouristNFT} from "../src/TouristNFT.sol";
import {console} from "forge-std/console.sol";

contract TouristNFTDeployer is Script {
    function run() public {
        TouristNFT implementation;
        vm.startBroadcast();
        console.log("caller", msg.sender);
        implementation = new TouristNFT(msg.sender);
        console.log("contract deployed at address", address(implementation));
        vm.stopBroadcast();
    }
}
