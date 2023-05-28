import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";

interface SSRData {
  html: string;
  time: string;
}

export const getServerSideProps: GetServerSideProps<{ data: SSRData }> = async (
  context: GetServerSidePropsContext
) => {
  const data = {} as SSRData;
  const res = await fetch("https://staiyang.top/")
  const txt = await res.text();

  data.html = txt;
  data.time = Date.now().toString();

  return {
    props: {
      data,
    },
  };
};

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <Layout home>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
        <div>
          {props.data.html}
          {props.data.time}
        </div>
      </section>
    </Layout>
  );
}
