import { 
    Box,
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    DrawerCloseButton,
    DrawerOverlay, 
    useDisclosure,
    useEditable } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import React from 'react'
import {HiDotsHorizontal} from 'react-icons/hi'

const EmployeeTrainingItem = ({setAssessment, setActive, e}) =>{
    const [assessments, setAssessments] = useState([])

    const getAssessments = async() => {
        const res = await fetch(`https://localhost:7241/api/Assessment?empId=${e.id}`);
		const data = await res.json();
        setAssessments(data)
    }
    useEffect(()=>{
        getAssessments()
    }, [setActive])

    const onClickHandler = () =>{
        setActive(e)
        setAssessment(assessments)
    }
    return(
        <div
        onClick={onClickHandler}
        >
         {assessments.length!==0?(
            <div className="dark:text-white relative dark:hover:border-2 dark:border-2 text-black grid grid-flow-col-dense gap-3 text-3xl p-4 dark:border-white shadow-md w-56 h-32 rounded-md hover:cursor-pointer hover:bg-[#e8e8e8] dark:hover:bg-zinc-900 items-center justify-start">
                <div className="overflow-hidden flex justify-center w-14 h-14 rounded-full">
                <img
                    src={
                        e.imageSrc &&
                        (e.imageSrc.split("/")[5].includes("jpeg") ||
                            e.imageSrc.split("/")[5].includes("png") ||
                            e.imageSrc.split("/")[5].includes("svg") ||
                            e.imageSrc.split("/")[5].includes("jpg"))
                            ? e.imageSrc
                            : def
                    }
                    className={`object-cover`}
                ></img>
                </div>
                <div className="flex flex-col whitespace-nowrap overflow-hidden gap-[-1rem]">
                    <h1 className="text-sm font-bold">{e.firstName} {e.lastName}</h1>
                    <h1 className="text-sm text-ellipsis overflow-hidden">{e.positionApplied}</h1>
                </div>
                <div className="absolute top-3 right-3 text-xl  dark:bg-[#1a1a1a] bg-white p-1 rounded-md">
                    <HiDotsHorizontal/>
                </div>
            </div>
        ):("")}
       </div>
    )

}

export default EmployeeTrainingItem