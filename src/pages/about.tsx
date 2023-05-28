import Layout from "@/components/layout";
import type { InferGetStaticPropsType, GetStaticProps } from 'next';
 
type Repo = {
  name: string;
  stargazers_count: number;
  time: string;
};
 
export const getStaticProps: GetStaticProps<{
  repo: Repo;
}> = async () => {
  const res = await fetch('https://api.github.com/repos/vercel/next.js');
  const repo = {...await res.json(), ...{time: Date.now().toString()}};

  return { props: { repo } };
};
 
export default function About({
  repo,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <Layout title={"About"}>
            <h1>about</h1>
            nextjs repo has {repo.stargazers_count / 1000}k star now!!
            {repo.time}
        </Layout>
    )
}
