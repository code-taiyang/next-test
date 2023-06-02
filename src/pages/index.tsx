import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import {
  GetStaticProps, InferGetStaticPropsType,
} from "next";
import { RouteInfo } from "@/components/navigator";
import { getPostList } from "../../lib/posts";

export const getStaticProps: GetStaticProps<{routes: RouteInfo[]}> = async () => {
  
  const routes: RouteInfo[] = [
    {
      path: '/',
      name: 'home'
    },
    {
      path: '/about',
      name: 'about'
    },
  ]

  const postPathList = getPostList().map(name => ({
    path: `/post/${name}`,
    name: name
  } as RouteInfo))

  routes.push(...postPathList);

  return {
    props: { routes },
  };
};
export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Layout home={true} extData={{routes: props.routes}}>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
    </Layout>
  );
}
