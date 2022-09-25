import {
  Container,
  Grid,
  HStack,
  Tag,
  TagLabel,
  Text,
  VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Link from "next/link";

import { trpc } from "../../common/trpc";
import DetailedPostCard from "../../components/blog/DetailedPostCard";
import Nav from "../../components/Navbar";
import Layout from "../../components/pages/Layout";
import Loading from "../../components/pages/Loading";

const Blog: NextPage = () => {
  const posts = trpc.useQuery(["post.posts", {}]);
  const categories = trpc.useQuery(["post.categories", {}]);

  if (!posts.data || !categories.data) {
    return <Loading />;
  }

  return (
    <Layout navbar={<Nav />}>
      <Container
        as="main"
        display="flex"
        flexDir="column"
        alignItems="flex-start"
        maxW="4xl"
        my={4}
        gap={5}
      >
        <VStack alignItems="flex-start" mb={4} w="100%">
          <Text as="h1" fontSize="5xl" fontWeight={800}>
            Latest Posts
          </Text>

          <HStack flexWrap="wrap" gap={2}>
            {categories?.data?.map((category) => (
              <Link href={`/blog/category/${category.name}`}>
                <Tag
                  size="lg"
                  colorScheme="green"
                  variant="outline"
                  key={category.id}
                  m="0 !important"
                  _hover={{
                    bg: "green.500",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  <TagLabel>{category.name}</TagLabel>
                </Tag>
              </Link>
            ))}
          </HStack>
        </VStack>

        <Grid
          templateColumns="repeat(auto-fill,minmax(250px,1fr))"
          gap={5}
          w="100%"
        >
          {posts?.data?.map((post) => (
            <DetailedPostCard key={post.id} {...post} />
          ))}
        </Grid>
      </Container>
    </Layout>
  );
};

export default Blog;
