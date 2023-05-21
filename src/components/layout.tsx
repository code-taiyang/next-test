import Head from "next/head";
import Navigator from "./navigator";

export default function Layout(props){
    return (
        <>
            <Head>
                <title>{props.title || "next app"}</title>
            </Head>
            <div className="page">
                <Navigator></Navigator>
                {props.children}    
            </div>    
        </>
    );
}