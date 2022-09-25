import { Button, Center, Container, Text, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import Link from "next/link";

import Layout from "../components/pages/Layout";

const NotFound: NextPage = () => {
  return (
    <Layout>
      <Container as="main" display="flex" flex={1} centerContent>
        <Center display="flex" flex={1}>
          <VStack>
            <Text fontSize="3xl">Not Found</Text>
            <Link passHref href="/">
              <Button>Go Home</Button>
            </Link>
          </VStack>
        </Center>
      </Container>
    </Layout>
  );
};

export default NotFound;
