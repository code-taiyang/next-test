import Layout from "@/components/layout";
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { getSortedPostData } from "../../../lib/posts";
import utilStyles from "@/styles/utils.module.css";
import { useContext, useRef } from "react";
// import "tailwindcss/tailwind.css"

interface PostsData {
  count: number;
  blogs: {
    [key: string]: any;
    id: string;
    name?: string;
    date?: string;
  }[];
}


export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: false
  };
}

export const getStaticProps: GetStaticProps<{data: PostsData}> = async ({params}) => {
  const postsData = getSortedPostData();
  const data: PostsData = {
    blogs: postsData,
    count: postsData.length,
  };

  return {
    props: { data },
  };
};

export default function Post({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout title={"post1"}>
      <h1>post1</h1>
      <p>你目前已有{data.count}篇博客，再接再厉哦</p>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px} bg-sky-400`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {data.blogs.map(({ id, date, title, name }) => (
            <li className={utilStyles.listItem} key={id}>
              《{title}》
              <br />
              作者：{name}
              <br />
              日期：{date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
