import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { CopyIcon, ExternalLinkIcon } from "@radix-ui/react-icons";
import { usePrivy } from "@privy-io/react-auth";
import { useMutation, useQuery } from "react-query";
import { publicClient } from "../lib/viem";
import { LoadingSpinner } from "./loading-spinner";
import { formatEther, formatUnits } from "viem";
import { queryClient } from "../main";
import { Gensets_abi } from "../abi/gensets-abi";
import { FaEthereum } from "react-icons/fa";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { useState } from "react";
import { GENSET_NFT_CONTRACT_ADDRESS } from "../lib/contants";

export const UserWalletDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user, logout } = usePrivy();

  const truncateAddress = (address: string) =>
    `${address.slice(0, 6)}...${address.slice(-4)}`;

  const ethBalance = useQuery({
    queryKey: ["eth-balance"],
    enabled: user?.wallet?.address !== undefined,
    queryFn: async () => {
      const balance = await publicClient.getBalance({
        address: (user?.wallet?.address ??
          "0x0000000000000000000000000000000000000000") as `0x${string}`,
      });
      return balance;
    },
  });

  const gensetNftBalance = useQuery({
    queryKey: ["genset-nft-balance"],
    enabled: user?.wallet?.address !== undefined,
    queryFn: async () => {
      const balance = await publicClient.readContract({
        address: GENSET_NFT_CONTRACT_ADDRESS,
        abi: Gensets_abi,
        functionName: "balanceOf",
        args: [user?.wallet?.address as `0x${string}`],
      });
      return balance;
    },
  });

  const signOut = useMutation({
    mutationFn: async () => {
      await logout();
    },
    onSuccess: () => queryClient.invalidateQueries("is-signed-in"),
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Your Wallet
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-neutral-900 border border-neutral-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-meodium text-center">
            Your Wallet
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="bg-neutral-800 p-4 rounded-lg">
            <Label className="text-sm text-neutral-400 mb-1 block">
              Wallet Address
            </Label>
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">
                {user?.wallet && truncateAddress(user.wallet.address)}
              </span>
              <div className="space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      user?.wallet ? user.wallet.address : ""
                    )
                  }
                >
                  <CopyIcon className="h-4 w-4 text-white" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    window.open(
                      `https://sepolia.etherscan.io/address/${user?.wallet?.address}`,
                      "_blank"
                    )
                  }
                >
                  <ExternalLinkIcon className="h-4 w-4 text-white" />
                </Button>
              </div>
            </div>
          </div>

          {user?.email && (
            <div className="bg-neutral-800 p-4 rounded-lg">
              <Label className="text-sm text-neutral-400 mb-1 block">
                Email
              </Label>
              <p className="text-lg font-medium">{user.email.address}</p>
            </div>
          )}

          <div className="flex space-x-4">
            <div className="flex-1 bg-neutral-800 p-4 rounded-lg">
              <Label className="text-sm text-neutral-400 mb-1 block">
                ETH Balance
              </Label>
              <div className="flex items-center">
                <FaEthereum className="h-5 w-5 text-white mr-2" />
                {ethBalance.isLoading || !ethBalance.data ? (
                  <LoadingSpinner />
                ) : (
                  <span className="text-xl font-bold">
                    {parseFloat(formatEther(ethBalance.data)).toFixed(2)}
                  </span>
                )}
              </div>
            </div>
            <div className="flex-1 bg-neutral-800 p-4 rounded-lg">
              <Label className="text-sm text-neutral-400 mb-1 block">
                Genset NFTs Owned
              </Label>
              <div className="flex items-center">
                {gensetNftBalance.isLoading || !gensetNftBalance.data ? (
                  <LoadingSpinner />
                ) : (
                  <span className="text-xl font-bold">
                    {formatUnits(gensetNftBalance.data, 0)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={() => signOut.mutate()}
            className="w-full bg-red-500 hover:bg-red-600 text-white"
          >
            Disconnect Wallet
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
