import { Button } from "./ui/button";
import { LoadingSpinner } from "./loading-spinner";
import { SignInButton } from "./sign-in-button";
import { SignOutButton } from "./sign-out-button";
import { usePrivy } from "@privy-io/react-auth";

export const AuthButton = () => {
  const { authenticated, ready } = usePrivy();
  return !ready ? (
    <Button variant="outline" className="w-52">
      <LoadingSpinner />
    </Button>
  ) : (
    <>{authenticated ? <SignOutButton /> : <SignInButton />}</>
  );
};
