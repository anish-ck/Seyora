// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721Upgradeable} from "@openzeppelin-upgradeable/contracts/token/ERC721/ERC721Upgradeable.sol";
import {UUPSUpgradeable} from "@openzeppelin-upgradeable/contracts/proxy/utils/UUPSUpgradeable.sol";
import {Initializable} from "@openzeppelin-upgradeable/contracts/proxy/utils/Initializable.sol";
import {AccessControlUpgradeable} from "@openzeppelin-upgradeable/contracts/access/AccessControlUpgradeable.sol";

contract TouristId is
    UUPSUpgradeable,
    AccessControlUpgradeable,
    ERC721Upgradeable
{
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");

    error TouristId_alreadyHasId(address tourist);
    error TouristId_TouristId_NotTransferable();
    error TouristId_TouristAddressIsNotValid(address tourist);
    error TouristId_invalidTokenId(uint256 tokenid);
    error TouristId_onlyOwnercanAll();

    struct TouristData {
        uint64 tripStart;
        uint64 tripEnd;
        string touristName;
        string dataURI; // for IPFS
    }

    mapping(uint256 => TouristData) public touristData;
    mapping(address => uint256) private addressToToken;
    uint256 private _tokenCounter;
    uint256[50] private _gap;

    event TouristTokenIdMinted(
        uint256 indexed tokenId,
        address indexed tourist
    );
    event TouristTokenBurned(uint256 indexed tokenId);
    event TouristDataUpdated(uint256 indexed tokenId, string field);

    constructor() {
        _disableInitializers();
    }

    function initialize(ADDRESS defaultAdmin) public initializer {
        __ERC721_init("TourToken", "TKN");
        __AccessControl_init();
        __UUPSUpgradeable_init();
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(MINTER_ROLE, defaultAdmin); // for now minter role os for default in future we well update this with oracle
        _grantRole(BURNER_ROLE, defaultAdmin);
        _totalMinted = 0;
    }

    function MintTokenId(
        address _tourist,
        TouristData memory _data
    ) external onlyRole(MINTER_ROLE) {
        if (addressToToken[_tourist] != 0) revert TouristId_alreadyHasId();
        uint256 tokenId = uint256(
            keccak256(abi.encodePacked(_tourist, block.timestamp))
        );
        addressToToken[_tourist] = tokenId;
        touristData[tokenId] = _data;
        _safeMint(_tourist, tokenId);
        _tokenCounter++;
        emit TouristTokenIdMinted(tokenId, _tourist);
    }

    function BurnTokenId(uint256 _tokenId) external onlyRole(BURNER_ROLE) {
        if (address(0) == ownerOf(_tokenId))
            revert TouristId_invalidTokenId(_tokenId);
        address owner = ownerOf(_tokenId);
        _burn(_tokenId);
        delete addressToToken[owner];
        delete touristData[_tokenId];
        emit TouristTokenBurned(_tokenId);
    }

    function UpdateTouristDate(
        uint256 _tokenId,
        TouristData memory _newData
    ) external onlyRole(MINTER_ROLE) {
        if (address(0) == ownerOf(_tokenId))
            revert TouristId_invalidTokenId(_tokenId);
        touristData[_tokenId] = _newData;
        emit TouristDataUpdated(_tokenId, "TouristData");
    }

    function getTouristData(
        uint256 _tokenId
    ) external view returns (TouristData memory) {
        if (address(0) == ownerOf(_tokenId))
            revert TouristId_invalidTokenId(_tokenId);
        return touristData[_tokenId];
    }

    function getTokenStatus(uint256 _tokenId) external view returns (bool) {
        if (address(0) == ownerOf(_tokenId))
            revert TouristId_invalidTokenId(_tokenId);
        return block.timestamp <= touristData[_tokenId].tripEnd;
    }

    function getTokenByaddress(
        address _tourist
    ) external view returns (uint256) {
        uint256 tokenId = addressToToken[_tourist];
        if (tokenId == 0) revert TouristId_TouristAddressIsNotValid(_tourist);
        return tokenId;
    }

    function getTotalMinted() internal view returns (uint256) {
        return _totalMinted;
    }

    //ovveride function
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override returns (address) {}

    function approve(address, uint256) public pure override {
        revert TouristId_NotTransferable();
    }

    function setApprovalForAll(address, bool) public pure override {
        revert TouristId_NotTransferable();
    }

    function transferFrom(address, address, uint256) public pure override {
        revert TouristId_NotTransferable();
    }

    function safeTransferFrom(
        address,
        address,
        uint256,
        bytes memory
    ) public pure override {
        revert TouristId_NotTransferable();
    }

    function _authorizeUpgrade(
        address
    ) internal override onlyRole(DEFAULT_ADMIN_ROLE) {}
}
