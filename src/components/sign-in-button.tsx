import { Button } from "./ui/button";

import { useMutation } from "react-query";
import { LoadingSpinner } from "./loading-spinner";
import { queryClient } from "../main";
import { usePrivy } from "@privy-io/react-auth";

export const SignInButton = () => {
  const { login } = usePrivy();

  const signIn = useMutation({
    mutationFn: async () => login(),
    onSuccess: () => queryClient.invalidateQueries("is-signed-in"),
  });

  return (
    <Button
      variant="outline"
      onClick={() => signIn.mutate()}
      className="gap-2 items-center w-52"
    >
      {signIn.isLoading && <LoadingSpinner />}
      Sign In
    </Button>
  );
};
