import { Center, Container, Spinner, Text, VStack } from "@chakra-ui/react";

import Nav from "../Navbar";
import Layout from "./Layout";

const Loading = () => {
  return (
    <Layout navbar={<Nav />}>
      <Container as="main" display="flex" flex={1} centerContent>
        <Center display="flex" flex={1}>
          <VStack>
            <Spinner />
            <Text>Loading...</Text>
          </VStack>
        </Center>
      </Container>
    </Layout>
  );
};

export default Loading;
