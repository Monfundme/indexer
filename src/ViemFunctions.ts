import { createPublicClient, http, Chain, formatEther } from "viem";
import campaignAbi from "./abis/Campaign.json";

type CampaignDetails = [string, string, string, string, string, BigInt, BigInt];

const monad: Chain = {
    id: 10143,
    name: "Monad",
    rpcUrls: {
        default: {
            http: ["https://testnet-rpc.monad.xyz/"]
        }
    },
    nativeCurrency: {
        name: "Monad",
        symbol: "MONAD",
        decimals: 18
    },
    blockExplorers: {
        default: {
            name: "Monad Explorer",
            url: "https://explorer.monad.xyz"
        }
    }
}
const client = createPublicClient({
    chain: monad,
    transport: http()
})

const getCampaignDetails = async (campaignAddress: `0x${string}`) => {
    try {
        console.log("Getting campaign details for", campaignAddress)
        const [__, title, description, image, _, target, deadline] = await client.readContract({
            address: campaignAddress,
            abi: campaignAbi,
            functionName: "getCampaignDetails"
        }) as CampaignDetails;
        return { description, image, title, target, deadline: Number(deadline) }

    } catch (error) {
        console.error(error)
        return { description: "", image: "", title: "", target: 0, deadline: 0 }
    }
}




export { getCampaignDetails }
