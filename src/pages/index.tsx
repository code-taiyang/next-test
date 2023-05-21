import Layout from "@/components/layout";
import Image from "next/image";

export default function Home(){
    return (
        <Layout title={"next应用主页"}>
            <h1>Hello Next.js</h1>
            <Image src="/image/四谎.jpg" alt="四月是你的谎言" width={1080 / 5} height={956 / 5} ></Image>
        </Layout>
    )
}