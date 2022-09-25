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

const Tag: CustomNextPage = () => {
  const authorId = parseInt(useRouter().query.id as string);
  const posts = trpc.useQuery(["post.posts", { authorId }]);
  const author = trpc.useQuery(["post.author", { id: authorId }]);

  const error = posts.error ?? author.error;

  if (error) return <ErrorPage {...error} />;
  if (!(posts.data && author.data)) return <Loading />;

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
          Posts by {author.data.name}
        </Text>

        <VStack gap={4}>
          {posts.data?.map((post) => (
            <SimplePostCard key={post.id} {...post} />
          ))}
        </VStack>

        {/* <Flex justifyContent="space-between" m={4} alignItems="center" w="100%">
          <Flex>
            <Tooltip label="First Page">
              <IconButton
                aria-label="first page"
                onClick={() => {}}
                isDisabled={false}
                icon={<ArrowLeftIcon h={3} w={3} />}
                mr={4}
              />
            </Tooltip>
            <Tooltip label="Previous Page">
              <IconButton
                aria-label="previous page"
                onClick={() => {}}
                isDisabled={false}
                icon={<ChevronLeftIcon h={6} w={6} />}
              />
            </Tooltip>
          </Flex>

          <Flex alignItems="center">
            <Text flexShrink="0" mr={8}>
              Page{" "}
              <Text fontWeight="bold" as="span">
                {pageIndex + 1}
              </Text>{" "}
              of{" "}
              <Text fontWeight="bold" as="span">
                {pages}
              </Text>
            </Text>
            <Text flexShrink="0">Go to page:</Text>{" "}
            <NumberInput
              ml={2}
              mr={8}
              w={28}
              min={1}
              max={pages}
              onChange={(value) => {
                const page = value ? parseInt(value) - 1 : 0;
                console.log("new page: ", page);
              }}
              defaultValue={pageIndex + 1}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Select
              w={32}
              value={pageSize}
              onChange={(e) => {
                console.log("new page size: ", Number(e.target.value));
              }}
            >
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </Select>
          </Flex>

          <Flex>
            <Tooltip label="Next Page">
              <IconButton
                onClick={() => {}}
                isDisabled={false}
                aria-label="next page"
                icon={<ChevronRightIcon h={6} w={6} />}
              />
            </Tooltip>
            <Tooltip label="Last Page">
              <IconButton
                aria-label="last page"
                onClick={() => {}}
                isDisabled={false}
                icon={<ArrowRightIcon h={3} w={3} />}
                ml={4}
              />
            </Tooltip>
          </Flex>
        </Flex> */}
      </Container>
    </Layout>
  );
};

export default Tag;
