import Layout from "@/components/layout";
import type { GetStaticPaths, GetStaticPathsResult, GetStaticProps, InferGetStaticPropsType } from "next";
import { getPostDataProcessor, PostData } from "../../../lib/posts";
import utilStyles from "@/styles/utils.module.css";
// import "tailwindcss/tailwind.css"

interface BlogData {
  count: number;
  blogs: PostData[];
}


export const getStaticPaths: GetStaticPaths = async (context) => {
  const processor = getPostDataProcessor();
  const postsData = processor.getSortedPostData();
  
  const paths = [].map(() => ({
    params: {
      id: ""
    },
    
  }))

  return {
    paths: paths,
    fallback: false
  };
}

export const getStaticProps: GetStaticProps<{data: BlogData}> = async ({params}) => {
  const processor = getPostDataProcessor();
  const postsData = processor.getSortedPostData();
  const data: BlogData = {
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
          {data.blogs.map(({ id, modifyTime, title, author }) => (
            <li className={utilStyles.listItem} key={id}>
              《{title}》
              <br />
              作者：{author}
              <br />
              日期：{modifyTime}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
