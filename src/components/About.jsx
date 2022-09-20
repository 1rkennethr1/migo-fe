import Layout from "./Layout";
import { motion } from "framer-motion";
import {FaBrain, FaTachometerAlt, FaThumbsUp} from "react-icons/fa"
import {HiSearch} from 'react-icons/hi'
import {AiOutlineRise} from 'react-icons/ai'
import {BiRadar} from 'react-icons/bi'
const About = () =>{
    const abouts = [
        {
            name: 'AI-Powered',
            details: 'Uses AI to determine appropriate trainings and benefits based on employee performance',
            icon: <FaBrain/>
        },
        {
            name: 'Efficient',
            details: 'Receive fast updates on employee data',
            icon: <FaTachometerAlt/>
        },
        {
            name: 'Easy-to-Use',
            details: 'Intuitive design for user ease of usage',
            icon: <FaThumbsUp/>
        },
        {
            name: 'Real-time Monitoring',
            details: 'Monitor and receive updates on employee progress in real-time',
            icon: <HiSearch/>
        },
        {
            name: 'Performance-boosting',
            details: 'Boost employee performance by suggesting trainings through AI ',
            icon: <AiOutlineRise/>
        },
        {
            name: 'Tracks performance',
            details: 'Keep close track of how your employees are doing!',
            icon: <BiRadar/>
        },
    ]
    return(
        <Layout>
            <div className="flex flex-col items-center justify-center">
                <h1 className="font-bold text-7xl before:content-[''] before:border-8 before:border-t-0 before:border-x-0 before:rounded-md before:absolute before:mt-[5.5rem] before:border-[#E04344] before:px-20 before:ml-[10rem] before:w-[20rem] before:m-auto border-black pb-10">
                    Get to know Migo
                </h1>
                <h3 className="s font-regular text-5xl text-center w-[60%] pb-20">
                    Migo, a system focusing on automated process of rating and determining benefits ranking them based on criteria.
                </h3>
                <div className="grid grid-cols-3 gap-10 items-center justify-center text-center w-[80%] pb-10">
                    {abouts.map(e =>{
                        return (
                        <div className="bg-[#E04344] text-white grid grid-rows-3 items-center justify-center text-center p-10 h-[18rem] rounded-lg shadow-lg shadow-[#000]/30">
                            <span className="justify-self-center text-3xl bg-white text-[#a0a0a0] p-3 rounded-full">{e.icon}</span>
                            <h5 className="font-bold text-xl">{e.name}</h5>
                            <p className="w-[70%] m-auto text-lg">{e.details}</p>
                        </div>
                        )
                    })}
                </div>
            </div>
       </Layout>
    )
}
export default About