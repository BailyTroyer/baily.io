import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import * as z from "zod";

import { InferQueryOutput } from "../../common/trpc";
import { createRouter } from "../createRouter";

const postSelect = Prisma.validator<Prisma.PostSelect>()({
  id: true,
  createdAt: true,
  title: true,
  description: true,
  contents: true,
  categories: true,
  author: {
    include: {
      profile: true,
    },
  },
});

const userSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  name: true,
  profile: true,
});

export type Post = InferQueryOutput<"post.posts">[0];

// What happens if form data is wrong (validation)
// What happens if post already exists
// What about emojis
// What if DB is down
// What if server isn't reachable

export const postRouter = createRouter()
  .query("posts", {
    input: z.object({
      skip: z.number().int().nonnegative().default(0),
      take: z.number().int().nonnegative().default(5),
      categories: z.string().min(1).array().default([]),
      authorId: z.number().int().nonnegative().optional(),
    }),
    resolve: async ({ input: { skip, take, categories, authorId }, ctx }) => {
      const posts = await ctx.prisma.post.findMany({
        skip,
        take,
        orderBy: {
          createdAt: "desc",
        },
        ...(categories.length > 0
          ? {
              where: {
                categories: {
                  some: {
                    name: {
                      in: categories,
                    },
                  },
                },
              },
            }
          : {}),

        ...(authorId
          ? {
              where: {
                authorId,
              },
            }
          : {}),
        select: postSelect,
      });

      return posts;
    },
  })
  .query("post", {
    input: z.object({
      id: z.number().int().nonnegative(),
    }),
    resolve: async ({ input: { id }, ctx }) => {
      const post = await ctx.prisma.post.findUnique({
        where: {
          id,
        },
        select: postSelect,
      });
      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No post with id: ${id}`,
        });
      }
      return post;
    },
  })
  .query("author", {
    input: z.object({
      id: z.number().int().nonnegative(),
    }),
    resolve: async ({ input: { id }, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id,
        },
        select: userSelect,
      });
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No user with id: ${id}`,
        });
      }
      return user;
    },
  })
  .query("categories", {
    input: z.object({
      skip: z.number().int().nonnegative().default(0),
      take: z.number().int().nonnegative().default(10),
    }),
    resolve: async ({ input: { skip, take }, ctx }) => {
      const categories = await ctx.prisma.category.findMany({
        skip,
        take,
      });
      return categories;
    },
  })
  .mutation("create", {
    input: z.object({
      title: z.string(),
      contents: z.string(),
      description: z.string(),
      authorId: z.number().int(),
    }),
    resolve: async ({ input, ctx }) => {
      const post = await ctx.prisma.post.create({
        data: input,
        select: postSelect,
      });
      return post;
    },
  });
