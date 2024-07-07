import { zodResolver } from "@hookform/resolvers/zod";
import { useWallets } from "@privy-io/react-auth";
import { CalendarIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { format, getUnixTime } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  createWalletClient,
  stringToHex,
  parseEther,
  BaseError,
  ContractFunctionRevertedError,
  custom,
} from "viem";
import { sepolia } from "viem/chains";
import { z } from "zod";
import { Gensets_abi } from "../abi/gensets-abi";
import {
  GENSET_NFT_MINT_PRICE,
  GENSET_NFT_CONTRACT_ADDRESS,
} from "../lib/contants";
import { cn } from "../lib/utils";
import { publicClient } from "../lib/viem";
import { Calendar } from "./ui/calendar";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./ui/dialog";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { queryClient } from "../main";

const mintSchema = z.object({
  _customerName: z.string().min(1, "Customer Name Required"),
  _sellerName: z.string().min(1, "Seller Name Required"),
  _publishedDate: z.date(),
  _sertificateName: z.string().min(1, "Sertificate Name Required"),
  _sertiticateModel: z.string().min(1, "Sertificate Model Name Required"),
});

type TMintSchema = z.infer<typeof mintSchema>;

export const MintNFTDialog = () => {
  const [isopen, setIsOpen] = useState(false);

  const { wallets } = useWallets();

  const form = useForm<TMintSchema>({ resolver: zodResolver(mintSchema) });

  const publishedDate = form.watch("_publishedDate");

  const embeddedWallet = wallets[0];

  const mint = async (values: TMintSchema) => {
    if (!embeddedWallet) return;

    await embeddedWallet.switchChain(sepolia.id);
    const provider = await embeddedWallet.getEthereumProvider();
    const walletClient = createWalletClient({
      chain: sepolia,
      transport: custom(provider),
    });

    const { request } = await publicClient.simulateContract({
      args: [
        BigInt(1),
        stringToHex(values._customerName, { size: 32 }),
        stringToHex(values._sellerName, { size: 32 }),
        getUnixTime(values._publishedDate),
        stringToHex(values._sertificateName, { size: 32 }),
        stringToHex(values._sertiticateModel, { size: 32 }),
      ],
      value: parseEther(GENSET_NFT_MINT_PRICE),
      account: embeddedWallet.address as `0x${string}`,
      address: GENSET_NFT_CONTRACT_ADDRESS,
      abi: Gensets_abi,
      functionName: "mint",
    });

    const transactionHash = await walletClient.writeContract(request);

    setIsOpen(false);
    form.reset();

    await publicClient.waitForTransactionReceipt({
      hash: transactionHash,
    });

    queryClient.invalidateQueries("genset-nfts");
  };

  const mintGensetNFT = form.handleSubmit((data) =>
    toast.promise(mint(data), {
      loading: "Minting your Genset NFT...",
      success: "Minted your Genset NFT!",
      error: (err) => {
        if (err instanceof BaseError) {
          const revertError = err.walk(
            (err) => err instanceof ContractFunctionRevertedError
          );
          if (revertError instanceof ContractFunctionRevertedError) {
            const errorName = revertError.data?.errorName ?? "";
            return errorName;
          }
        }
      },
    })
  );

  return (
    <Dialog open={isopen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={!embeddedWallet}>
          Mint NFT
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[30rem] bg-neutral-900 border-neutral-700">
        <DialogHeader>
          <DialogTitle className="text-white">Mint Genset NFT</DialogTitle>
          <DialogDescription className="text-gray-400">
            Mint your Genset NFT and input your additional information
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={mintGensetNFT}>
            <FormField
              control={form.control}
              name="_customerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Customer Name</FormLabel>
                  <FormControl>
                    <Input
                      className="border-neutral-700"
                      placeholder="Input Customer name"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="_sellerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Seller Name</FormLabel>
                  <FormControl>
                    <Input
                      className="border-neutral-700"
                      placeholder="Input Seller name"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="_sertificateName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Serticate Name</FormLabel>
                  <FormControl>
                    <Input
                      className="border-neutral-700"
                      placeholder="Input Sertificate name"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="_sertiticateModel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Serticate Model</FormLabel>
                  <FormControl>
                    <Input
                      className="border-neutral-700"
                      placeholder="Input Sertificate Model"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="_publishedDate"
              render={() => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-white">Published Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 border-neutral-700 text-left font-normal",
                            !publishedDate && "text-muted-foreground"
                          )}
                        >
                          {publishedDate ? (
                            format(publishedDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0"
                      align="end"
                      side="bottom"
                      alignOffset={10}
                      sideOffset={10}
                    >
                      <Calendar
                        mode="single"
                        selected={publishedDate}
                        onSelect={(date) =>
                          form.setValue("_publishedDate", date ?? new Date())
                        }
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        className="bg-neutral-900 border-neutral-700 border rounded-lg"
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" variant="outline">
                Mint
              </Button>
              <DialogClose asChild>
                <Button type="submit" variant="destructive">
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
