import { ChakraProvider } from "@chakra-ui/react";
import { withTRPC } from "@trpc/next";
import { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";

import { usePostHog } from "../components/hooks/usePosthog";
import AuthGuard from "../components/pages/AuthGuard";
import { ServerRouter } from "../server/routers/_app";

export type CustomNextPage = NextPage & {
  requireAuth?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: CustomNextPage;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  usePostHog(
    process.env.NEXT_PUBLIC_POSTHOG_KEY || "",
    { api_host: "https://app.posthog.com" },
    "baily.io"
  );

  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider>
        {Component.requireAuth ? (
          <AuthGuard>
            <Component {...pageProps} />
          </AuthGuard>
        ) : (
          <Component {...pageProps} />
        )}
      </ChakraProvider>
    </SessionProvider>
  );
};

export default withTRPC<ServerRouter>({
  config() {
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : "http://localhost:3000/api/trpc";

    return {
      url,
    };
  },
  ssr: true,
})(App);
