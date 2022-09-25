import { PropsWithChildren } from "react";

import {
  Image,
  Code,
  Divider,
  Heading,
  Text,
  Link,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  UnorderedList,
  OrderedList,
  Checkbox,
  ListItem,
  VStack,
} from "@chakra-ui/react";
import { chakra } from "@chakra-ui/system";
import ReactMarkdown from "react-markdown";
import {
  CodeProps,
  HeadingProps,
  LiProps,
  OrderedListProps,
  UnorderedListProps,
} from "react-markdown/lib/ast-to-react";
import { ReactMarkdownOptions } from "react-markdown/lib/react-markdown";

type GetCoreProps = {
  children?: React.ReactNode;
  "data-sourcepos"?: any;
};

const getCoreProps = (props: GetCoreProps): any =>
  props["data-sourcepos"] ? { "data-sourcepos": props["data-sourcepos"] } : {};

const headingSizes = ["3xl", "2xl", "xl", "lg", "md", "sm", "xs"];

const HeadingRenderer = ({ children, level }: HeadingProps) => (
  <Heading as={`h${level}` as any} size={headingSizes[level - 1]}>
    {children}
  </Heading>
);

const DefaultRenderer = (as: any) => {
  const MarkdownComponent = ({ children }: PropsWithChildren<{}>) => (
    <Text as={as}>{children}</Text>
  );

  return MarkdownComponent;
};

const ListRenderer = (props: OrderedListProps | UnorderedListProps) => {
  const { ordered, children, depth } = props;
  const attrs = getCoreProps(props);
  let Element = UnorderedList;
  let styleType = "disc";
  if (ordered) {
    Element = OrderedList;
    styleType = "decimal";
  }
  if (depth === 1) styleType = "circle";
  return (
    <Element
      spacing={2}
      as={ordered ? "ol" : "ul"}
      styleType={styleType}
      pl={4}
      {...attrs}
    >
      {children}
    </Element>
  );
};

/**
 * A custom `ReactMarkdown` wrapper that injects Chakra UI styles instead of default unstyled HTML elements.
 *
 * @also @see https://github.com/mustaphaturhan/chakra-ui-markdown-renderer/blob/master/src/index.tsx#L37
 */
const Markdown = ({ children, ...props }: ReactMarkdownOptions) => (
  <VStack alignItems="flex-start" flex={1} w="100%">
    <ReactMarkdown
      components={{
        h1: HeadingRenderer,
        h2: HeadingRenderer,
        h3: HeadingRenderer,
        h4: HeadingRenderer,
        h5: HeadingRenderer,
        h6: HeadingRenderer,
        p: ({ children }) => <Text>{children}</Text>,
        em: ({ children }) => <Text as="em">{children}</Text>,
        blockquote: ({ children }) => <Text as="blockquote">{children}</Text>,
        code: ({ children, inline }: CodeProps) => {
          if (inline) return <Code>{children}</Code>;

          return (
            <Code
              whiteSpace="break-spaces"
              display="block"
              w="full"
              p={4}
              m={2}
            >
              {children}
            </Code>
          );
        },
        del: DefaultRenderer("del"),
        hr: () => <Divider />,
        a: Link,
        img: Image,
        text: DefaultRenderer("span"),
        ul: ListRenderer,
        ol: ListRenderer,
        li: (props: LiProps) => {
          const { children, checked } = props;
          let checkbox = null;
          if (checked !== null && checked !== undefined) {
            checkbox = (
              <Checkbox isChecked={checked} isReadOnly>
                {children}
              </Checkbox>
            );
          }
          return (
            <ListItem
              {...getCoreProps(props)}
              listStyleType={checked !== null ? "none" : "inherit"}
            >
              {checkbox || children}
            </ListItem>
          );
        },
        pre: (
          props: React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLPreElement>,
            HTMLPreElement
          >
        ) => <chakra.pre {...getCoreProps(props)}>{props.children}</chakra.pre>,
        table: Table,
        thead: Thead,
        tbody: Tbody,
        tr: Tr,
        td: ({ children }) => <Td>{children}</Td>,
        th: ({ children }) => <Th>{children}</Th>,
      }}
      {...props}
    >
      {children}
    </ReactMarkdown>
  </VStack>
);

export default Markdown;
