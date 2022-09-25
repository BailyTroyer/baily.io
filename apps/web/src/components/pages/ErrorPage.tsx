import { Center, Container, Text, VStack } from "@chakra-ui/react";
import type { TRPCClientErrorLike } from "@trpc/client";

import type { ServerRouter } from "../../server/routers/_app";
import Layout from "./Layout";

const ErrorPage = (error: TRPCClientErrorLike<ServerRouter>) => {
  return (
    <Layout>
      <Container as="main" display="flex" flex={1} centerContent>
        <Center display="flex" flex={1}>
          <VStack>
            <Text fontSize="4xl">Oh no!</Text>
            <Text fontSize="sm">{JSON.stringify(error.data)}</Text>
          </VStack>
        </Center>
      </Container>
    </Layout>
  );
};

export default ErrorPage;
