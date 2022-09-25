import { PropsWithChildren } from "react";

import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  IconButton,
  HStack,
  Spinner,
  VStack,
  Container,
} from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";

const Links = ["Blog"];

const NavLink = ({ children, href }: PropsWithChildren<{ href: string }>) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={`/${href}`}
  >
    {children}
  </Link>
);

export default function Nav() {
  const { data: session, status } = useSession();

  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onClickLogin = () => {
    signIn("google");
  };

  const renderMenu = () => {
    if (status === "authenticated")
      return (
        <Menu>
          <MenuButton
            as={Button}
            rounded={"full"}
            variant={"link"}
            cursor={"pointer"}
            minW={0}
          >
            <Avatar size={"sm"} src={session?.user?.image || ""} />
          </MenuButton>
          <MenuList alignItems={"center"}>
            <VStack gap={2} p={2}>
              <Center>
                <Avatar size={"2xl"} src={session?.user?.image || ""} />
              </Center>

              <Center>
                <p>{session?.user?.name}</p>
              </Center>
            </VStack>

            <MenuDivider />
            <MenuItem onClick={() => signOut()}>Logout</MenuItem>
          </MenuList>
        </Menu>
      );
    else if (status === "loading") {
      return <Spinner />;
    } else
      return (
        <Button variant="ghost" onClick={onClickLogin}>
          Login
        </Button>
      );
  };

  return (
    <Box
      bg={useColorModeValue("gray.100", "gray.900")}
      sx={{
        position: "sticky",
        top: "0",
      }}
      zIndex={3}
    >
      <Container maxW="4xl">
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box fontWeight={600}>Baily.io</Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link} href={link.toLowerCase()}>
                  {link}
                </NavLink>
              ))}
            </HStack>
          </HStack>

          <Flex alignItems={"center"} gap={2}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>

            {renderMenu()}
          </Flex>
        </Flex>
      </Container>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link} href={link.toLowerCase()}>
                {link}
              </NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
