import {
  Avatar,
  Box,
  Container,
  Divider,
  HStack,
  Tag,
  TagLabel,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

import { trpc } from "../../common/trpc";
import Markdown from "../../components/blog/MarkdownRenderers";
import Nav from "../../components/Navbar";
import ErrorPage from "../../components/pages/ErrorPage";
import Layout from "../../components/pages/Layout";
import Loading from "../../components/pages/Loading";
import type { CustomNextPage } from "../_app";

const Blog: CustomNextPage = () => {
  const id = useRouter().query.id as string;

  const post = trpc.useQuery(["post.post", { id: parseInt(id) }]);

  if (post.error) {
    return <ErrorPage {...post.error} />;
  }

  if (!post.data) {
    return <Loading />;
  }

  return (
    <Layout navbar={<Nav />}>
      <Container as="main" display="flex" flex={1} maxW="4xl" px={4} mt={8}>
        <VStack display="flex" flex={1} alignItems="flex-start" w="100%">
          <Text m="0 !important" color="gray.500" fontSize="sm">
            {new Date(post.data?.createdAt).toDateString()}
          </Text>
          <Text as="h1" fontSize="5xl" fontWeight={800} mt="0 !important">
            {post.data?.title}
          </Text>
          <Link href={`/blog/author/${post.data?.author?.id}`}>
            <HStack
              display="flex"
              _hover={{ cursor: "pointer", color: "blue.500" }}
            >
              <Avatar src={post.data?.author.profile?.url || ""} />

              <VStack alignItems="flex-start">
                <Text>{post.data?.author.name}</Text>
                <Text m="0 !important" color="gray.500" fontSize="sm">
                  {post.data?.author.profile?.bio}
                </Text>
              </VStack>
            </HStack>
          </Link>
          <HStack display="flex" mt="3 !important">
            {post.data.categories?.map((category) => (
              <Link href={`/blog/category/${category.name}`}>
                <Tag
                  size="md"
                  colorScheme="purple"
                  variant="outline"
                  key={category.id}
                  _hover={{
                    bg: "purple.500",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  <TagLabel>{category.name}</TagLabel>
                </Tag>
              </Link>
            ))}
          </HStack>

          <Divider my="5 !important" />

          <Box>
            <Markdown>{post.data.contents}</Markdown>
          </Box>
        </VStack>
      </Container>
    </Layout>
  );
};

export default Blog;
