import { ZodError } from "zod";

import { createRouter } from "../createRouter";
import { postRouter } from "./post";

export const serverRouter = createRouter()
  // https://trpc.io/docs/v9/error-formatting#adding-custom-formatting
  .formatError(({ shape, error }) => {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === "BAD_REQUEST" && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    };
  })
  // Simple healthcheck
  .query("healthz", {
    async resolve() {
      return "ok";
    },
  })
  // https://trpc.io/docs/v9/merging-routers
  .merge("post.", postRouter);

export type ServerRouter = typeof serverRouter;
