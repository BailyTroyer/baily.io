import { useEffect } from "react";

import Posthog from "posthog-js";

export default function Web() {
  useEffect(() => {
    Posthog.capture("my event", { property: "value" });
  }, []);

  return (
    <div>
      <h1>Web</h1>
    </div>
  );
}
