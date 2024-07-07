import { LightningBoltIcon } from "@radix-ui/react-icons";
import { Layout } from "./components/layout";
import { MintNFTDialog } from "./components/mint-nft-dialog";
import { ViewNftsDialog } from "./components/view-user-nfts-dialog";

function App() {
  return (
    <Layout className="flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-slate-900 via-slate-800 to-sky-900">
      <div className="text-center text-white space-y-2">
        <h1 className="text-5xl font-bold flex items-center justify-center gap-4">
          Genset NFT <LightningBoltIcon className="w-10 h-10" />
        </h1>
        <p>Get your ownership on one of our Engine Generator</p>
      </div>
      <div className="flex justify-center gap-4 items-center">
        <MintNFTDialog />
        <ViewNftsDialog />
      </div>
    </Layout>
  );
}

export default App;
