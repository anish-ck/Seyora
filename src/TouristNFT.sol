// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {AutomationCompatibleInterface} from "@chainlink/contracts/src/v0.8/automation/interfaces/AutomationCompatibleInterface.sol";
import {ERC721URIStorage, ERC721} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

contract TouristNFT is
    ERC721URIStorage,
    AccessControl,
    AutomationCompatibleInterface
{
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    uint256 private _tokenIdCounter = 1;

    struct TouristData {
        uint64 tripStart;
        uint64 tripEnd;
        bool tripActive;
        string dataURI;
    }

    mapping(uint256 => TouristData) private _touristData;
    mapping(address => uint256) private _addressToToken;

    uint256[] private _activeTokens;
    mapping(uint256 => uint256) private _activeTokenIndex;

    event TouristTokenMinted(uint256 indexed tokenId, address indexed tourist);
    event TouristTokenBurned(uint256 indexed tokenId);
    event TouristDataUpdated(uint256 indexed tokenId);

    constructor(address admin) ERC721("TouristNFT", "TNFT") {
        require(admin != address(0), "zero admin");
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(MINTER_ROLE, admin);
    }

    function _addActiveToken(uint256 tokenId) internal {
        _activeTokens.push(tokenId);
        _activeTokenIndex[tokenId] = _activeTokens.length;
    }

    function _removeActiveToken(uint256 tokenId) internal {
        uint256 idxPlus1 = _activeTokenIndex[tokenId];
        if (idxPlus1 == 0) return;
        uint256 idx = idxPlus1 - 1;
        uint256 last = _activeTokens[_activeTokens.length - 1];
        if (idx != _activeTokens.length - 1) {
            _activeTokens[idx] = last;
            _activeTokenIndex[last] = idx + 1;
        }
        _activeTokens.pop();
        delete _activeTokenIndex[tokenId];
    }

    function mintTokenId(
        address to,
        uint64 tripStart,
        uint64 tripEnd,
        string calldata dataUri
    ) external onlyRole(MINTER_ROLE) {
        if (to == address(0)) revert("invalid addr");
        if (tripStart > tripEnd) revert("invalid dates");
        if (_addressToToken[to] != 0) revert("already has token");

        uint256 tokenId = _tokenIdCounter++;
        _addressToToken[to] = tokenId;
        _touristData[tokenId] = TouristData(tripStart, tripEnd, true, dataUri);

        _safeMint(to, tokenId); // <- safeMint used
        _setTokenURI(tokenId, dataUri);

        _addActiveToken(tokenId);
        emit TouristTokenMinted(tokenId, to);
    }

    function burnTokenId(uint256 tokenId) external onlyRole(MINTER_ROLE) {
        _burnTokenId(tokenId);
    }

    function updateTouristData(
        uint256 tokenId,
        uint64 startTime,
        uint64 endTime,
        string calldata dataUri,
        bool status
    ) external onlyRole(MINTER_ROLE) {
        if (ownerOf(tokenId) == address(0)) revert("invalid token");
        if (startTime > endTime) revert("invalid dates");

        _touristData[tokenId] = TouristData(
            startTime,
            endTime,
            status,
            dataUri
        );
        _setTokenURI(tokenId, dataUri);

        if (status) _addActiveToken(tokenId);
        else _removeActiveToken(tokenId);

        emit TouristDataUpdated(tokenId);
    }

    function checkUpkeep(
        bytes calldata
    )
        external
        view
        override
        returns (bool upkeepNeeded, bytes memory performData)
    {
        uint256 expiredId = 0;
        uint256 len = _activeTokens.length;
        for (uint256 i = 0; i < len; ++i) {
            uint256 id = _activeTokens[i];
            TouristData storage d = _touristData[id];
            if (d.tripActive && block.timestamp >= d.tripEnd) {
                expiredId = id;
                upkeepNeeded = true;
                break;
            }
        }
        performData = abi.encode(expiredId);
    }

    function performUpkeep(bytes calldata performData) external override {
        uint256 tokenId = abi.decode(performData, (uint256));
        if (tokenId == 0) return;
        TouristData storage d = _touristData[tokenId];
        if (!d.tripActive) return;
        if (block.timestamp < d.tripEnd) return;
        _burnTokenId(tokenId);
    }

    function getTouristData(
        uint256 tokenId
    ) external view returns (TouristData memory) {
        if (ownerOf(tokenId) == address(0)) revert("invalid token");
        return _touristData[tokenId];
    }

    function getTokenStatus(uint256 tokenId) external view returns (bool) {
        if (ownerOf(tokenId) == address(0)) revert("invalid token");
        return _touristData[tokenId].tripActive;
    }

    function getTokenByAddress(
        address tourist
    ) external view returns (uint256) {
        uint256 tokenId = _addressToToken[tourist];
        if (tokenId == 0) revert("no token");
        return tokenId;
    }

    function getTotalTokenMinted() external view returns (uint256) {
        return _tokenIdCounter - 1;
    }

    function getActiveTokens() external view returns (uint256[] memory) {
        return _activeTokens;
    }

    function getTokenDataUri(
        uint256 tokenId
    ) external view returns (string memory) {
        if (ownerOf(tokenId) == address(0)) revert("invalid token");
        return tokenURI(tokenId);
    }

    function _burnTokenId(uint256 tokenId) internal {
        if (ownerOf(tokenId) == address(0)) revert("invalid token");
        address owner = ownerOf(tokenId);
        delete _addressToToken[owner];
        delete _touristData[tokenId];
        _removeActiveToken(tokenId);
        _burn(tokenId);
        emit TouristTokenBurned(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721URIStorage, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
