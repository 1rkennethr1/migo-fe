import Layout from "./Layout";
import { motion } from "framer-motion";
import pc from '../assets/pc.png'

const Info = () =>{
    return(
        <Layout>
            <div className="flex flex-col items-center justify-center">
                <h1 className="font-bold text-7xl before:content-[''] before:border-8 before:border-t-0 before:border-x-0 before:rounded-md before:absolute before:mt-[5.5rem] before:border-[#E04344] before:px-20 before:ml-[12rem] before:w-[20rem] before:m-auto border-black pb-10">
                    A new way to assess
                </h1>
                <h3 className="s font-regular text-5xl text-center w-[80%] pb-16">We’re changing the corporate world by ditching the manual assessment and outdated systems. That means it's fast, easy and friendly.</h3>
                <img src={pc} alt='PC'></img>
            </div>
       </Layout>
    )
}
export default Info