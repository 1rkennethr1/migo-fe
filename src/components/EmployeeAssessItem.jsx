import def from "../assets/default.png";
import {
    Drawer, 
    DrawerBody, 
    DrawerCloseButton, 
    DrawerContent, 
    DrawerFooter, 
    DrawerHeader, 
    DrawerOverlay, 
    FormControl, 
    FormLabel, 
    Input, 
    Radio, 
    RadioGroup, 
    Stack, 
    useDisclosure
} from "@chakra-ui/react"
import React from 'react'
const EmployeeAssessItem = ({e}) =>{
    const btnRef = React.useRef()
    const { isOpen, onOpen, onClose } = useDisclosure();

    const radioOnchangeHandler = (event) =>{
        console.log(event)
    }
    return(
        <div 
            className=" dark:text-white text-black text-3xl p-8 dark:border-white border-none shadow-md border-2 w-64 h-56 rounded-md hover:cursor-pointer hover:bg-[#eee]"
            onClick={onOpen}
            ref={btnRef}
        >
            <div className="overflow-hidden flex justify-center w-20 h-20 rounded-full">
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
                    className='object-cover'
                    >
                </img>
            </div>
            
            <h1 className="text-[.7em] whitespace-nowrap overflow-hidden text-ellipsis">{e.firstName} {e.lastName}</h1>
            <div className="flex flex-row flex-wrap gap-2">
                {e.assignedProjects.map(ev=>{
                    return (
                        <div className="rounded-full bg-slate-300  w-20 h-8">
                            <p className="text-sm px-2 py-1 overflow-hidden text-ellipsis whitespace-nowrap italic">{ev.name}</p>
                        </div>
                        )
                })}
            </div>

            <Drawer
				isOpen={isOpen}
				placement="right"
				onClose={onClose}
				finalFocusRef={btnRef}
				size={"full"}
			>
                <DrawerOverlay/>
                <DrawerContent>
                    <div >
						<DrawerCloseButton
                            fontSize={"1em"}

							bg={"white"}
							_hover={{ bg: "white" }}
							_focus={{ bg: "white" }}
							size="lg"
                        />
					</div>
                    <DrawerHeader
                        className="bg-[#ccc]"
                    >
                        <h1 className="py-5 text-5xl">Performance Evaluation Form</h1>
                        <div className="flex flex-col gap-2 p-5 border-2 border-[#aaa] rounded-lg bg-white">
                            <div className="grid grid-cols-2 gap-6">
                                <h1 className="font-normal">Name of Employee: <span className="font-bold underline">{e.firstName} {e.lastName}</span></h1>
                                <h1 className="font-normal self-end">Date of Hire/Transfer: <span className="font-bold underline">{e.dateJoined}</span></h1>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <h1 className="font-normal">Role/Position/BU: <span className="font-bold underline">{e.profession}</span></h1>
                            </div>
                        </div>
                    </DrawerHeader>
                    <DrawerBody>
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-row items-center gap-4 p-5 border-2 border-[#aaa] rounded-lg bg-white">
                                <h1 className="font-bold uppercase">Rating Scale</h1>
                                <div className="flex flex-col">
                                    <h1>4.61 - 5.00</h1>
                                    <h1>3.61 - 4.60</h1>
                                    <h1>3.00 - 3.60</h1>
                                    <h1>2.00 - 2.99</h1>
                                    <h1>0.00 - 1.99</h1>
                                </div>
                                <div className="flex flex-col">
                                    <h1>Exceeds Expectation (EE)</h1>
                                    <h1>Significant Strength (SS)</h1>
                                    <h1>Meets Expectations (ME)</h1>
                                    <h1>Development Needed (DN)</h1>
                                    <h1>Needs Improvement (NI)</h1>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 p-2 border-2 border-[#aaa] rounded-lg">
                                <div className="flex flex-col gap-2 p-2 border-2 border-[#aaa] rounded-lg">
                                    <h1 className=" uppercase font-bold">Consistency with Alliance Values</h1>
                                    <div className="flex flex-col gap-2 p-2 border-2 border-[#aaa] rounded-lg">
                                        <h1 className=" uppercase font-bold">Quality</h1>
                                        <div className="flex flex-col gap-2 border-2 border-[#aaa] rounded-lg">
                                            <h1 className="bg-[#ddd] p-5 rounded-lg">Q1. Maintains highest standard in the quality of our products and services and focuses on continuous process improvement, to make processes, visible, repeatable and measurable.</h1>
                                            <FormControl>
                                                <FormLabel>
                                                    <RadioGroup className="px-5 py-3" onChange={radioOnchangeHandler} name='quality-1' defaultValue='1'>
                                                        <Stack direction='row' gap={'10'}>
                                                            <Radio value='1'>1</Radio>
                                                            <Radio value='2'>2</Radio>
                                                            <Radio value='3'>3</Radio>
                                                            <Radio value='4'>4</Radio>
                                                            <Radio value='5'>5</Radio>
                                                        </Stack>
                                                    </RadioGroup>
                                                </FormLabel>
                                            </FormControl>
                                        </div>
                                        <div className="flex flex-col gap-2 border-2 border-[#aaa] rounded-lg">
                                            <h1 className="bg-[#ddd] p-5 rounded-lg">Q2. Focuses on pleasing the customer through producing quality output-on time-on budget.</h1>
                                            <FormControl>
                                                <FormLabel>
                                                <RadioGroup className="px-5 py-2" onChange={radioOnchangeHandler} name='quality-2' defaultValue='1'>
                                                    <Stack direction='row' gap={'10'}>
                                                        <Radio value='1'>1</Radio>
                                                        <Radio value='2'>2</Radio>
                                                        <Radio value='3'>3</Radio>
                                                        <Radio value='4'>4</Radio>
                                                        <Radio value='5'>5</Radio>
                                                    </Stack>
                                                </RadioGroup>
                                                </FormLabel>
                                            </FormControl>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DrawerBody>
                    <DrawerFooter></DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    )
}
export default EmployeeAssessItem
