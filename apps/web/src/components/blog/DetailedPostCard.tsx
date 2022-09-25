import { HStack, Tag, TagLabel, Text, VStack, Image } from "@chakra-ui/react";
import Link from "next/link";

import type { Post } from "../../server/routers/post";

const DetailedPostCard = ({
  id,
  createdAt,
  title,
  categories,
  description,
}: Post) => (
  <Link href={`/blog/${id}`}>
    <VStack alignItems="flex-start" _hover={{ cursor: "pointer" }} data-group>
      <Image
        borderRadius="md"
        src="https://images.unsplash.com/photo-1662581872277-0fd0bf3ae8f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
        alt="blog post splash"
        height={150}
        width="100%"
        objectFit="cover"
        fallbackSrc="https://via.placeholder.com/150"
        mb={2}
        _groupHover={{ opacity: 0.7 }}
      />
      <Text m="0 !important" color="gray.500" fontSize="sm" cursor="text">
        {new Date(createdAt).toDateString()}
      </Text>
      <Text
        as="h5"
        fontSize="lg"
        fontWeight={800}
        m="0 !important"
        _groupHover={{ color: "blue.500" }}
      >
        {title}
      </Text>

      <HStack flexWrap="wrap" gap={2}>
        {categories.map((category) => (
          <Link href={`/blog/category/${category.name}`}>
            <Tag
              size="md"
              colorScheme="purple"
              variant="outline"
              key={category.id}
              m="0 !important"
              _hover={{ bg: "purple.500", color: "white", cursor: "pointer" }}
            >
              <TagLabel>{category.name}</TagLabel>
            </Tag>
          </Link>
        ))}
      </HStack>

      <Text fontSize="md" noOfLines={3}>
        {description}
      </Text>
    </VStack>
  </Link>
);

export default DetailedPostCard;
