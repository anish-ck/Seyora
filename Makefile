RPCURL=https://polygon-amoy.g.alchemy.com/v2/QlXFO2edkPcV7HHJcx89G
ETHERAPI="9J5PG89527D8UKI7QW7WN4AA7EYD4ZIRCT"
ETH_SEPOLIA=https://eth-sepolia.g.alchemy.com/v2/QlXFO2edkPcV7HHJcx89G
PRIVATE_KEY=0x05563997b1cf584d32497cb33bc43167a324baaa5fe05d089e1d49b801a7b3bd
make tokenDeploy:
	forge script script/TouristNFTDeployer.s.sol:TouristNFTDeployer --rpc-url ${ETH_SEPOLIA} --private-key  ${PRIVATE_KEY} --broadcast --verify --etherscan-api-key ${ETHERAPI} -vvv