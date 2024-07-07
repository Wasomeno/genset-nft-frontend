import { LightningBoltIcon } from "@radix-ui/react-icons";
import { AuthButton } from "./auth.button";

export function Navigation() {
  return (
    <nav className="flex fixed w-screen top-0 items-center py-6 px-8 justify-between">
      <div className="text-white">
        <LightningBoltIcon className="w-8 h-8" />
      </div>
      <div>
        <AuthButton />
      </div>
    </nav>
  );
}
