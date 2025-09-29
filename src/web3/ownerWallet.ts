import { ethers } from "ethers";
import { NetworkPlugin } from "ethers";
import { ContractAbi__factory } from "../../types/ethers-contracts";
const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL!);
const signer = new ethers.Wallet(process.env.OWER_PRIVATE_KEY!, provider);
export const NFTcontract = ContractAbi__factory.connect(process.env.NFT_CONTRACT_DDRESS!,signer);


// command for convert json ABI into typsscript 
//npx typechain --target ethers-v6 "./src/modules/register/server/contractAbi.json"