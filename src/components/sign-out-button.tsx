import { LoadingSpinner } from "./loading-spinner";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { usePrivy } from "@privy-io/react-auth";
import { truncateMiddle } from "../lib/utils";
import { UserWalletDialog } from "./user-wallet-dialog";

export const SignOutButton = () => {
  const { user, ready } = usePrivy();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2 items-center w-52">
            {!ready ? (
              <LoadingSpinner />
            ) : (
              <span>
                {user?.email
                  ? `${user?.email?.address
                      .split("@")[0]
                      .slice(0, 10)}....${`@${
                      user?.email?.address.split("@")[1]
                    }`}`
                  : truncateMiddle(user?.wallet?.address ?? "", 10)}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-72">
          <DropdownMenuLabel>
            {user?.email?.address ? "Email Address" : "Wallet Address"}
          </DropdownMenuLabel>
          <DropdownMenuLabel className="text-neutral-500">
            {user?.email?.address
              ? user?.email?.address
              : `${user?.wallet?.address?.slice(
                  0,
                  10
                )}....${user?.wallet?.address?.slice(-10)}`}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <UserWalletDialog />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
