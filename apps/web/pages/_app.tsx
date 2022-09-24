import type { AppProps } from "next/app";
import { usePostHog } from "../components/hooks/usePosthog";

export default function MyApp({ Component, pageProps }: AppProps) {
  usePostHog(
    "phc_darhmDxr9LpwRMsm9smBOrLIDCYduUvDugY4IakBDyA",
    { api_host: "https://app.posthog.com" },
    "baily.io"
  );

  return <Component {...pageProps} />;
}
