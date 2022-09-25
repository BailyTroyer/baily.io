import { useEffect } from "react";

import { useRouter } from "next/router";
import Posthog, { PostHogConfig } from "posthog-js";

export const usePostHog = (
  apiKey: string,
  config?: Partial<PostHogConfig>,
  name?: string
): void => {
  const router = useRouter();

  useEffect((): (() => void) => {
    // Init PostHog
    Posthog.init(apiKey, config, name);

    // Track page views
    const handleRouteChange = () => Posthog.capture("$pageview");
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [apiKey, config, name, router.events]);
};
