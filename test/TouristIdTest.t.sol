// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {console} from "forge-std/console.sol";
import {TouristNFT} from "../src/TouristNFT.sol";

contract TouristTokenV1Test is Test {
    error TouristNFT_AlreadyHasId();
    error AccessControlUnauthorizedAccount(address account, bytes32 neededRole);
    TouristNFT touristToken;
    address owner;
    address user1 = makeAddr("userOne");
    address user2 = makeAddr("userTwo");
    address user3 = makeAddr("userThree");
    uint64 constant startTime = 100;
    uint64 constant endTime = 200;
    string dataUri = "https://ipfs.uri.om";

    function setUp() public {
        vm.startBroadcast();
        owner = msg.sender;
        touristToken = new TouristNFT(owner);
        vm.stopBroadcast();
    }

    function testOnlyownercanCallMinting() public {
        vm.prank(owner);
        touristToken.mintTokenId(user1, startTime, endTime, dataUri);
        
    }

    function testeveryLog() public {
        vm.prank(owner);
        touristToken.mintTokenId(user1, startTime, endTime, dataUri);
        uint256 tokenId = touristToken.getTokenByAddress(user1);
        string memory tokendataUri = touristToken.getTokenDataUri(tokenId);
        console.log(tokendataUri);
        console.log(touristToken.getTokenStatus(tokenId));
    }

    function testRevertWhenMintingWithInvalidTripDates() public {
        vm.startPrank(owner);
        vm.expectRevert();
        touristToken.mintTokenId(user1, endTime, startTime, dataUri); // startTime > endTime
        vm.stopPrank();
    }

    function testOneUserCantMakeAfainToken() public {
        vm.startPrank(owner);
        touristToken.mintTokenId(user1, startTime, endTime, dataUri);
        vm.expectRevert();
        touristToken.mintTokenId(user1, startTime, endTime, dataUri);
        vm.stopPrank();
    }

    function testNonRoleCantRole() public {
        vm.prank(user1);
        vm.expectRevert();
        touristToken.mintTokenId(user1, startTime, endTime, dataUri);
    }

    function testGetTokenByAddress() public {
        vm.prank(owner);
        touristToken.mintTokenId(user1, startTime, endTime, dataUri);
        uint256 tokenID = touristToken.getTokenByAddress(user1);
        console.log("token address", tokenID);
    }

    function testCanUpdateDate() public {
        vm.startPrank(owner);
        touristToken.mintTokenId(user1, startTime, endTime, dataUri);
        uint256 tokenID = touristToken.getTokenByAddress(user1);
        bool sttt = touristToken.getTokenStatus(tokenID);
        assertEq(true, sttt);
        touristToken.updateTouristData(
            tokenID,
            startTime,
            endTime,
            dataUri,
            false
        );
        assertEq(touristToken.getTokenStatus(tokenID), false);
    }

    function testRevertWhenUpdatingWithInvalidTripDates() public {
        vm.startPrank(owner);
        touristToken.mintTokenId(user1, startTime, endTime, dataUri);
        uint256 tokenId = touristToken.getTokenByAddress(user1);
        vm.expectRevert();
        touristToken.updateTouristData(
            tokenId,
            endTime,
            startTime,
            dataUri,
            true
        );
        vm.stopPrank();
    }

    function testBurnTokenId() public {
        vm.startPrank(owner);
        touristToken.mintTokenId(user1, startTime, endTime, dataUri);
        vm.stopPrank();

        uint256 tokenId = touristToken.getTokenByAddress(user1);
        assertEq(tokenId, 1);
        vm.startPrank(owner);
        touristToken.burnTokenId(tokenId);

        vm.expectRevert();
        touristToken.ownerOf(tokenId);
        vm.expectRevert();
        touristToken.getTokenByAddress(user1);
        vm.stopPrank();
    }

    function testGetTotalTokenMinted() public {
        vm.startPrank(owner);
        touristToken.mintTokenId(user1, startTime, endTime, dataUri);
        touristToken.mintTokenId(user2, startTime, endTime, dataUri);
        vm.stopPrank();
        assertEq(touristToken.getTotalTokenMinted(), 2); // Initial tokenIdCounter is 1, so 2 mints make it 3
    }

    function testUnauthorizedBurnTokenId() public {
        vm.startPrank(owner);
        touristToken.mintTokenId(user1, startTime, endTime, dataUri);
        vm.stopPrank();

        uint256 tokenId = touristToken.getTokenByAddress(user1);
        vm.startPrank(user2); // user2 has no owner role
        vm.expectRevert();
        touristToken.burnTokenId(tokenId);
        vm.stopPrank();
    }

    function testUnauthorizedUpdateTouristData() public {
        vm.startPrank(owner);
        touristToken.mintTokenId(user1, startTime, endTime, dataUri);
        vm.stopPrank();

        uint256 tokenId = touristToken.getTokenByAddress(user1);

        vm.startPrank(user2); // user2 has no owner role
        vm.expectRevert();
        touristToken.updateTouristData(
            tokenId,
            startTime,
            endTime,
            dataUri,
            false
        );
        vm.stopPrank();
    }

    function testGetTouristData() public {
        vm.startPrank(owner);
        touristToken.mintTokenId(user1, startTime, endTime, dataUri);
        vm.stopPrank();

        uint256 tokenId = touristToken.getTokenByAddress(user1);
        TouristNFT.TouristData memory data = touristToken.getTouristData(
            tokenId
        );

        assertEq(data.tripStart, startTime);
        assertEq(data.tripEnd, endTime);
        assertEq(data.tripActive, true);
        assertEq(data.dataURI, dataUri);
    }
}
