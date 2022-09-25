import { PropsWithChildren, ReactNode, useEffect } from "react";

import {
  Button,
  Container,
  Divider,
  HStack,
  Img,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import Posthog from "posthog-js";

import Nav from "../components/Navbar";
import Layout from "../components/pages/Layout";
import type { CustomNextPage } from "./_app";

const TextLink = ({ children, href }: PropsWithChildren<{ href: string }>) => (
  <Link href={href} target="_blank" rel="noopener noreferrer">
    <Button variant="link" color="blue.500">
      {children}
    </Button>
  </Link>
);

type HistoricalPlace = { href: string; name: string; date: string };
const Place = ({ href, name, date }: HistoricalPlace) => (
  <Link href={href} target="_blank" rel="noopener noreferrer">
    <HStack
      display="flex"
      flex={1}
      w="100%"
      alignItems="center"
      data-group
      _hover={{ cursor: "pointer" }}
    >
      <Text
        whiteSpace="nowrap"
        fontWeight={400}
        _groupHover={{
          color: "blue.500",
          textDecoration: "underline",
        }}
      >
        {name}
      </Text>
      <Divider orientation="horizontal" w="100%" />
      <Text whiteSpace="nowrap">{date}</Text>
    </HStack>
  </Link>
);

type SectionProps = { question: string; answer: ReactNode };
const Section = ({ question, answer }: SectionProps) => (
  <VStack alignItems="flex-start">
    <Text fontWeight={600}>{question}</Text>
    <Text>{answer}</Text>
  </VStack>
);

const Home: CustomNextPage = () => {
  useEffect(() => {
    Posthog.capture("my event", { property: "value" });
  }, []);

  return (
    <Layout navbar={<Nav />}>
      <Container as="main" display="flex" flex={1} maxW="4xl" centerContent>
        <VStack alignItems="flex-start" py={5} display="flex" flex={1} gap={4}>
          <Text fontSize="3xl">Hey, I&apos;m Baily 👋</Text>
          <Text>
            I&apos;m a software engineer,{" "}
            <TextLink href="https://caves.org/">caver</TextLink>, and{" "}
            <TextLink href="">volunteer</TextLink>. During the day, I&apos;m a
            Masters student at{" "}
            <TextLink href="https://www.columbia.edu/">
              Columbia University,
            </TextLink>{" "}
            and I work at{" "}
            <TextLink href="https://www.jumptrading.com/">
              Jump Trading
            </TextLink>
            .
          </Text>

          {[
            {
              question: "What in tarnation is this website Baily?",
              answer:
                "I wanted a to build something somewhat practical that messes with different technologies, frameworks and data all in one place. Most of this site is centralized around personal finance, life and/or videogames (how original).",
            },
            {
              question: "Don't you have a life?",
              answer:
                "I'd like to think so! Most of this site is built on rainy/snowy days when I didn't feel like playing video games or reading a book",
            },
            {
              question: "Did you say snow?",
              answer: (
                <>
                  Did I stutter?! I live in Buffalo, NY which is home to some
                  hefty{" "}
                  <TextLink href="https://scijinks.gov/lake-snow/#:~:text=Lake%20effect%20snow%20forms%20when,the%20ground%2C%20potentially%20becoming%20snow.">
                    lake-effect snow.
                  </TextLink>
                </>
              ),
            },
            {
              question: "What's the big deal with Buffalo",
              answer: (
                <>
                  We&apos;re home to the Buffalo chicken wings, sponge candy,
                  the Buffalo Bills and a whole bunch of new startups incubated
                  by {""}
                  <TextLink href="https://www.43north.org/">43 North.</TextLink>
                </>
              ),
            },
          ].map((section, index) => (
            <Section key={index} {...section} />
          ))}

          <VStack my={2}>
            <Img
              borderRadius="5px"
              // src="https://brianlovin.com/_next/image?url=%2Fstatic%2Fimg%2Fsf.png&w=3840&q=100"
              src="/buffalo.png"
              alt="buffalo"
            />
            <HStack justifyContent="flex-end" flex={1}>
              <Text
                fontSize="sm"
                color={useColorModeValue("gray.500", "gray.200")}
              >
                Buffalo, NY
              </Text>
            </HStack>
          </VStack>

          <VStack display="flex" flex={1} w="100%" alignItems="flex-start">
            <Text fontWeight={700}>Work</Text>
            {[
              {
                name: "Jump trading",
                date: "2022-",
                href: "https://www.jumptrading.com/",
              },
              {
                name: "ACV Auctions",
                date: "2019-2021",
                href: "https://www.acvauctions.com/",
              },
            ].map((company) => (
              <Place key={company.name} {...company} />
            ))}
          </VStack>

          <VStack display="flex" flex={1} w="100%" alignItems="flex-start">
            <Text fontWeight={700}>School</Text>
            {[
              {
                name: "Columbia",
                date: "2022-",
                href: "https://www.cs.columbia.edu/",
              },
              {
                name: "University at Buffalo",
                date: "2016-2019",
                href: "https://engineering.buffalo.edu/computer-science-engineering.html",
              },
            ].map((school) => (
              <Place key={school.name} {...school} />
            ))}
          </VStack>

          <VStack display="flex" flex={1} w="100%" alignItems="flex-start">
            <Text fontWeight={700}>Side Projects</Text>
            {[
              {
                name: "This website",
                date: "2022-",
                href: "https://baily.io/",
              },
              {
                name: "Grab A Latte",
                date: "2021-",
                href: "https://grabalatte.io/",
              },
            ].map((project) => (
              <Place key={project.name} {...project} />
            ))}
          </VStack>
        </VStack>
      </Container>
    </Layout>
  );
};

export default Home;
