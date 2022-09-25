import * as React from "react";

import { Container, VStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { trpc } from "../../../common/trpc";
import SimplePostCard from "../../../components/blog/SimplePostCard";
import Nav from "../../../components/Navbar";
import ErrorPage from "../../../components/pages/ErrorPage";
import Layout from "../../../components/pages/Layout";
import Loading from "../../../components/pages/Loading";
import type { CustomNextPage } from "../../_app";

const Category: CustomNextPage = () => {
  const name = useRouter().query.name as string;
  const posts = trpc.useQuery(["post.posts", { categories: [name] }]);

  if (posts.error) {
    return <ErrorPage {...posts.error} />;
  }

  if (!posts.data) {
    return <Loading />;
  }

  return (
    <Layout navbar={<Nav />}>
      <Container
        as="main"
        display="flex"
        flexDir="column"
        flex={1}
        alignItems="flex-start"
        maxW="4xl"
        p={3}
        mt={8}
        gap={5}
      >
        <Text as="h1" fontSize="3xl" fontWeight={800}>
          Latest {name} Posts
        </Text>

        <VStack gap={4}>
          {posts.data?.map((post) => (
            <SimplePostCard key={post.id} {...post} />
          ))}
        </VStack>
      </Container>
    </Layout>
  );
};

export default Category;
