import { createPublicClient, createWalletClient, custom, http } from "viem";
import { sepolia } from "viem/chains";
import { useWallets } from "@privy-io/react-auth";

export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(
    "https://sepolia.infura.io/v3/aac61c40c2ed4333a80aeaa2499b3746"
  ),
});

export const useWalletClient = async () => {
  const { wallets } = useWallets();
  const wallet = wallets[0];
  await wallet.switchChain(sepolia.id);

  const provider = await wallet.getEthereumProvider();

  createWalletClient({
    chain: sepolia,
    transport: custom(provider),
  });
};
