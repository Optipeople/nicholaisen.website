import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { mdxComponents } from "@/components/mdx/components";

type MdxProps = {
  source: string;
  components?: MDXRemoteProps["components"];
};

export function Mdx({ source, components }: MdxProps) {
  return (
    <MDXRemote
      source={source}
      components={{ ...mdxComponents, ...(components ?? {}) }}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeSlug],
        },
      }}
    />
  );
}
