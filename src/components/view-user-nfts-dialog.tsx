import { useWallets } from "@privy-io/react-auth";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import { useState } from "react";
import { useQuery } from "react-query";
import { hexToString } from "viem";
import { Gensets_abi } from "../abi/gensets-abi";
import { GENSET_NFT_CONTRACT_ADDRESS } from "../lib/contants";
import { truncateMiddle } from "../lib/utils";
import { publicClient } from "../lib/viem";
import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { format, fromUnixTime } from "date-fns";
import { ScrollArea } from "./ui/scroll-area";

type TGensetNFTDetails = {
  customerName: `0x${string}`;
  sellerName: `0x${string}`;
  sertificateName: `0x${string}`;
  sertiticateModel: `0x${string}`;
  publishedDate: number;
  serialNumber: `0x${string}`;
};

export const ViewNftsDialog = () => {
  const [isopen, setIsOpen] = useState(false);

  const [gensetDetails, setGensetDetails] = useState<TGensetNFTDetails | null>(
    null
  );

  const { wallets } = useWallets();

  const embeddedWallet = wallets[0];

  const gensetNFTs = useQuery({
    enabled: isopen || embeddedWallet !== undefined,
    queryKey: ["genset-nfts"],
    queryFn: async () => {
      const gensetNFTs = await publicClient.readContract({
        address: GENSET_NFT_CONTRACT_ADDRESS,
        abi: Gensets_abi,
        args: [embeddedWallet.address as `0x${string}`],
        functionName: "getUserGensets",
      });

      const gensetInformations = await Promise.all(
        gensetNFTs.map(
          async (gensetNFT) =>
            await publicClient.readContract({
              address: "0x1ad67A35092eA93306cb020F17172A7d7b1D625c",
              abi: Gensets_abi,
              args: [gensetNFT],
              functionName: "getGensetInformation",
            })
        )
      );
      return gensetInformations;
    },
  });

  return (
    <Dialog open={isopen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={!embeddedWallet}>
          View Your Nfts
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[30rem] bg-neutral-900 border-neutral-700 h-[30rem]">
        <DialogHeader>
          <DialogTitle className="text-white">View Your Nfts</DialogTitle>
          <DialogDescription className="text-gray-400">
            View your Genset NFTs
          </DialogDescription>
        </DialogHeader>

        {!gensetDetails && (
          <ScrollArea>
            <div className="grid grid-cols-2 gap-4">
              {gensetNFTs.isLoading &&
                Array(6).fill(
                  <Skeleton className="col-span-1 h-32 rounded-lg" />
                )}
              {!gensetNFTs.isLoading &&
                gensetNFTs.data?.map((gensetNFT) => (
                  <Button
                    variant="ghost"
                    key={gensetNFT.serialNumber}
                    onClick={() => setGensetDetails(gensetNFT)}
                    className="col-span-1 h-32 justify-center flex items-center border border-gray-500 rounded-lg border-dashed overflow-hidden"
                  >
                    {hexToString(gensetNFT.sertificateName)}
                  </Button>
                ))}
            </div>
          </ScrollArea>
        )}

        {gensetDetails && (
          <>
            <ScrollArea>
              <div className="grid grid-cols-2 gap-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="text-start">
                      <Card>
                        <CardHeader>
                          <CardTitle>
                            {truncateMiddle(gensetDetails.serialNumber, 12)}
                          </CardTitle>
                          <CardDescription>Serial Number</CardDescription>
                        </CardHeader>
                      </Card>
                    </TooltipTrigger>
                    <TooltipContent>
                      {gensetDetails.serialNumber}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {hexToString(gensetDetails.customerName)}
                    </CardTitle>
                    <CardDescription>Customer Name</CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {hexToString(gensetDetails.sellerName)}
                    </CardTitle>
                    <CardDescription>Seller Name</CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {hexToString(gensetDetails.sertificateName)}
                    </CardTitle>
                    <CardDescription>Sertificate Name</CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {hexToString(gensetDetails.sertiticateModel)}
                    </CardTitle>
                    <CardDescription>Sertificate Model</CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {format(
                        fromUnixTime(gensetDetails.publishedDate),
                        "PPPP"
                      )}
                    </CardTitle>
                    <CardDescription>Published Date</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </ScrollArea>

            <DialogFooter>
              <div className="flex justify-start w-full">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setGensetDetails(null)}
                >
                  <ArrowLeftIcon className="mr-2 h-4 w-4" />
                  Back
                </Button>
              </div>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
