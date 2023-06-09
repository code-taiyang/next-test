import Layout from "@/components/layout";
import type { GetStaticPaths, GetStaticPathsResult, GetStaticProps, InferGetStaticPropsType } from "next";
import { getPostDataById, getPostList, PostData } from "../../../lib/posts";
import utilStyles from "@/styles/utils.module.css";
import { useRouter } from "next/router";

// import "tailwindcss/tailwind.css"


export const getStaticPaths: GetStaticPaths = async (context) => {
  console.log(`当前环境是否跳过动态路由编译 :>> ${process.env.SKIP_BUILD_DYNAMIC_ROUTE}`);
  const postList = getPostList();
  // const paths = postList.map((id) => ({ params: {id} }));
  const paths = postList.slice(0, 1).map((id) => ({ params: {id} }));

  return {
    paths: paths,
    fallback: true
  };
}

export const getStaticProps: GetStaticProps<{data: PostData | null}> = async ({params}) => {
  if(!params || !params.id || Array.isArray(params.id)) {
    return {
      props: { data: null },
    };
  }

  const postsData = await getPostDataById(params.id);

  return {
    props: { data: postsData },
  };
};

export default function Post(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { data } = props;
  const route = useRouter();

  if(route.isFallback) {
    return <h1>loading....</h1>
  }

  return (
    <Layout title={"post"}>
      {
        data === null ? <p>博客数据解析失败</p>
        : (<section>
            <h1>《{data.title}》</h1>
            <p>作者：{data.author}</p>
            <p>更新时间: {data.updateTime}</p>
            <br />
            <div dangerouslySetInnerHTML={{ __html: data.htmlContent }} />
          </section>)
      }
    </Layout>
  );
}
