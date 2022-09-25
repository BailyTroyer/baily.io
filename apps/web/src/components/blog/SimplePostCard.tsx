import { Avatar, HStack, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

import type { Post } from "../../server/routers/post";

const SimplePostCard = ({ id, createdAt, title, author }: Post) => (
  <Link href={`/blog/${id}`}>
    <VStack alignItems="flex-start" _hover={{ cursor: "pointer" }}>
      <Text m="0 !important" color="gray.500" fontSize="sm" cursor="text">
        {new Date(createdAt).toDateString()}
      </Text>
      <Text
        as="h4"
        fontSize="2xl"
        fontWeight={800}
        m="0 !important"
        _hover={{ color: "blue.500" }}
      >
        {title}
      </Text>
      <Link href={`/blog/author/${author.id}`}>
        <HStack display="flex" m="0 !important" _hover={{ color: "blue.500" }}>
          <Avatar src={author?.profile?.url || ""} size="xs" />

          <VStack alignItems="flex-start">
            <Text>{author?.name}</Text>
          </VStack>
        </HStack>
      </Link>
    </VStack>
  </Link>
);

export default SimplePostCard;
