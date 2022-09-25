import type { AppProps } from "next/app";

import { usePostHog } from "../components/hooks/usePosthog";

export default function MyApp({ Component, pageProps }: AppProps) {
  usePostHog(
    process.env.NEXT_PUBLIC_POSTHOG_KEY || "",
    { api_host: "https://app.posthog.com" },
    "baily.io"
  );

  return <Component {...pageProps} />;
}
