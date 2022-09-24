import { useEffect } from "react";
import posthog from "posthog-js";

export default function Web() {
  useEffect(() => {
    posthog.capture("my event", { property: "value" });
  }, []);

  return (
    <div>
      <h1>Web</h1>
    </div>
  );
}
