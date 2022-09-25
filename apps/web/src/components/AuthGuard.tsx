import { memo, PropsWithChildren } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Loading from "./Loading";

const AuthGuard = memo(({ children }: PropsWithChildren<{}>) => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/");
  } else if (status === "loading") {
    return <Loading />;
  }

  return <>{children}</>;
});

AuthGuard.displayName = "AuthGuard";

export default AuthGuard;
