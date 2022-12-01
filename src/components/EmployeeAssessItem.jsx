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
import {IoMdCall} from 'react-icons/io'
import {MdEmail} from 'react-icons/md'
import React from 'react'
const EmployeeAssessItem = ({e}) =>{
    const btnRef = React.useRef()
    const { isOpen, onOpen, onClose } = useDisclosure();

    const onChangeHandler = (event) =>{
        if(event.target.value>=0.00 && event.target.value<=5.00){
            event.target.value = event.target.value.slice(0,4)
        }
        else{
            event.target.value = event.target.value.slice(0,1)
        }
    }
    return(
        <div 
            className=" dark:text-white text-black flex flex-col gap-2 text-3xl p-4 dark:border-white border-none shadow-md border-2 w-72 h-80 rounded-md hover:cursor-pointer hover:bg-[#e8e8e8]"
            onClick={onOpen}
            ref={btnRef}
        >
            {
                e.status ? 
                    (<div className="text-sm self-end border-2 border-green-600 text-green-600 rounded-md px-3"> Active</div>)
                :   (<div className="text-sm self-end border-2 border-red-600 text-red-600 rounded-md px-3">Inactive</div>)
            }
           <div className="flex flex-col gap-5 items-center justify-center">
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
                <h1 className="font-bold text-[.6em] leading-5 overflow-hidden text-center mb-[-1rem]">{e.firstName} {e.lastName}</h1>
                <h1 className="text-sm leading-3 grid grid-flow-col-dense items-center gap-2 mb-[-.5rem]"><span>{e.positionApplied!== 'null' ? e.positionApplied : 'Web Developer'}</span></h1>
                <div className=" bg-gray-100 text-sm w-[100%] items-center flex flex-col p-3 rounded-md">
                    <div className="flex w-[100%] self-start flex-row overflow-hidden whitespace-nowrap text-ellipsis gap-3 mb-3">
                        <div className="text-left">
                            <h1 className="text-gray-500">Profession</h1>
                            <h1 className="leading-3 whitespace-nowrap overflow-hidden text-ellipsis w-24">{e.profession!== 'null' ? e.profession : 'N/A'}</h1>
                        </div>
                        <div className="text-right">
                            <h1 className="text-gray-500">Date Joined</h1>
                            <h1 className="leading-3 text-ellipsis">{e.dateJoined!== 'null' ? e.dateJoined : 'N/A'}</h1>
                        </div>
                    </div>
                    <div className="self-start flex flex-row overflow-hidden whitespace-nowrap text-ellipsis gap-3">
                        <div className="self-start text-left">
                            <h1 className="text-gray-500"><span className="flex gap-1 items-center"><IoMdCall/>{e.contactNumber!== 'null' ? "+63" +e.contactNumber : 'N/A'}</span></h1>
                            <h1 className="text-gray-500"><span className="flex gap-1 items-center"><MdEmail/>{e.emailAddress!== 'null' ? e.emailAddress : 'N/A'}</span></h1>
                        </div>
                    </div>
                </div>
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
                                    {/* //Quality */}
                                    <div className="flex flex-col gap-2 p-2 border-2 border-[#aaa] rounded-lg">
                                        <h1 className=" uppercase font-bold">Quality</h1>
                                        <div className="flex flex-col gap-2 border-2 border-[#aaa] rounded-lg">
                                            <h1 className="bg-[#ddd] p-5 rounded-lg">Q1. Maintains highest standard in the quality of our products and services and focuses on continuous process improvement, to make processes, visible, repeatable and measurable.</h1>
                                            <FormControl className='flex items-center justify-start'>
                                                <FormLabel className="w-[30%] px-2">
                                                    {/* <RadioGroup className="px-5 py-3" onChange={radioOnchangeHandler} name='quality-1' defaultValue='1'>
                                                        <Stack direction='row' gap={'10'}>
                                                            <Radio value='1'>1</Radio>
                                                            <Radio value='2'>2</Radio>
                                                            <Radio value='3'>3</Radio>
                                                            <Radio value='4'>4</Radio>
                                                            <Radio value='5'>5</Radio>
                                                        </Stack>
                                                    </RadioGroup> */}
                                                    <h1 className="italic text-red-500">Input 0.00 - 5.00 only</h1>
                                                    <Input onChange={onChangeHandler} step={0.01} type={'number'} min={1} max={5}></Input>
                                                </FormLabel>
                                            </FormControl>
                                        </div>
                                        <div className="flex flex-col gap-2 border-2 border-[#aaa] rounded-lg">
                                            <h1 className="bg-[#ddd] p-5 rounded-lg">Q2. Focuses on pleasing the customer through producing quality output-on time-on budget.</h1>
                                            <FormControl className='flex items-center justify-start'>
                                                <FormLabel className="w-[30%] px-2">
                                                {/* <RadioGroup className="px-5 py-2" onChange={radioOnchangeHandler} name='quality-2' defaultValue='1'>
                                                    <Stack direction='row' gap={'10'}>
                                                        <Radio value='1'>1</Radio>
                                                        <Radio value='2'>2</Radio>
                                                        <Radio value='3'>3</Radio>
                                                        <Radio value='4'>4</Radio>
                                                        <Radio value='5'>5</Radio>
                                                    </Stack>
                                                </RadioGroup> */}
                                                <h1 className="italic text-red-500">Input 0.00 - 5.00 only</h1>
                                                <Input onChange={onChangeHandler} step={0.01} type={'number'} min={1} max={5}></Input>
                                                </FormLabel>
                                            </FormControl>
                                        </div>
                                    </div>
                                    {/* //Innovation */}
                                    <div className="flex flex-col gap-2 p-2 border-2 border-[#aaa] rounded-lg">
                                        <h1 className=" uppercase font-bold">Innovation</h1>
                                        <div className="flex flex-col gap-2 border-2 border-[#aaa] rounded-lg">
                                            <h1 className="bg-[#ddd] p-5 rounded-lg">Q1. Goes beyond what we have now and constantly improves on current approaches of developing technical solutions and in the processes which support the development. Shows willingness to question traditional assumptions.</h1>
                                            <FormControl className='flex items-center justify-start'>
                                                <FormLabel className="w-[30%] px-2">
                                                    {/* <RadioGroup className="px-5 py-3" onChange={radioOnchangeHandler} name='quality-1' defaultValue='1'>
                                                        <Stack direction='row' gap={'10'}>
                                                            <Radio value='1'>1</Radio>
                                                            <Radio value='2'>2</Radio>
                                                            <Radio value='3'>3</Radio>
                                                            <Radio value='4'>4</Radio>
                                                            <Radio value='5'>5</Radio>
                                                        </Stack>
                                                    </RadioGroup> */}
                                                    <h1 className="italic text-red-500">Input 0.00 - 5.00 only</h1>
                                                    <Input onChange={onChangeHandler} step={0.01} type={'number'} min={1} max={5}></Input>
                                                </FormLabel>
                                            </FormControl>
                                        </div>
                                        <div className="flex flex-col gap-2 border-2 border-[#aaa] rounded-lg">
                                            <h1 className="bg-[#ddd] p-5 rounded-lg">Q2. Has deep knowledge of the business; Equipped with higher value skills in the Area of Technology, Project Management, Client's Market / Industry / Culture / Language </h1>
                                            <FormControl className='flex items-center justify-start'>
                                                <FormLabel className="w-[30%] px-2">
                                                {/* <RadioGroup className="px-5 py-2" onChange={radioOnchangeHandler} name='quality-2' defaultValue='1'>
                                                    <Stack direction='row' gap={'10'}>
                                                        <Radio value='1'>1</Radio>
                                                        <Radio value='2'>2</Radio>
                                                        <Radio value='3'>3</Radio>
                                                        <Radio value='4'>4</Radio>
                                                        <Radio value='5'>5</Radio>
                                                    </Stack>
                                                </RadioGroup> */}
                                                <h1 className="italic text-red-500">Input 0.00 - 5.00 only</h1>
                                                <Input onChange={onChangeHandler} step={0.01} type={'number'} min={1} max={5}></Input>
                                                </FormLabel>
                                            </FormControl>
                                        </div>
                                    </div>
                                    {/* //Agility */}
                                    <div className="flex flex-col gap-2 p-2 border-2 border-[#aaa] rounded-lg">
                                        <h1 className=" uppercase font-bold">Agility</h1>
                                        <div className="flex flex-col gap-2 border-2 border-[#aaa] rounded-lg">
                                            <h1 className="bg-[#ddd] p-5 rounded-lg">Q1. Able to produce expected output in a timely manner despite changing customer demands.</h1>
                                            <FormControl className='flex items-center justify-start'>
                                                <FormLabel className="w-[30%] px-2">
                                                    {/* <RadioGroup className="px-5 py-3" onChange={radioOnchangeHandler} name='quality-1' defaultValue='1'>
                                                        <Stack direction='row' gap={'10'}>
                                                            <Radio value='1'>1</Radio>
                                                            <Radio value='2'>2</Radio>
                                                            <Radio value='3'>3</Radio>
                                                            <Radio value='4'>4</Radio>
                                                            <Radio value='5'>5</Radio>
                                                        </Stack>
                                                    </RadioGroup> */}
                                                    <h1 className="italic text-red-500">Input 0.00 - 5.00 only</h1>
                                                    <Input onChange={onChangeHandler} step={0.01} type={'number'} min={1} max={5}></Input>
                                                </FormLabel>
                                            </FormControl>
                                        </div>
                                        <div className="flex flex-col gap-2 border-2 border-[#aaa] rounded-lg">
                                            <h1 className="bg-[#ddd] p-5 rounded-lg">Q2. Maintains effective work behavior despite set-backs or pressure due to change. Remains calm, stable and in control.</h1>
                                            <FormControl className='flex items-center justify-start'>
                                                <FormLabel className="w-[30%] px-2">
                                                {/* <RadioGroup className="px-5 py-2" onChange={radioOnchangeHandler} name='quality-2' defaultValue='1'>
                                                    <Stack direction='row' gap={'10'}>
                                                        <Radio value='1'>1</Radio>
                                                        <Radio value='2'>2</Radio>
                                                        <Radio value='3'>3</Radio>
                                                        <Radio value='4'>4</Radio>
                                                        <Radio value='5'>5</Radio>
                                                    </Stack>
                                                </RadioGroup> */}
                                                <h1 className="italic text-red-500">Input 0.00 - 5.00 only</h1>
                                                <Input onChange={onChangeHandler} step={0.01} type={'number'} min={1} max={5}></Input>
                                                </FormLabel>
                                            </FormControl>
                                        </div>
                                        <div className="flex flex-col gap-2 border-2 border-[#aaa] rounded-lg">
                                            <h1 className="bg-[#ddd] p-5 rounded-lg">Q3. Enjoys dynamic environment with lots of change.  Reacts quickly to change.</h1>
                                            <FormControl className='flex items-center justify-start'>
                                                <FormLabel className="w-[30%] px-2">
                                                {/* <RadioGroup className="px-5 py-2" onChange={radioOnchangeHandler} name='quality-2' defaultValue='1'>
                                                    <Stack direction='row' gap={'10'}>
                                                        <Radio value='1'>1</Radio>
                                                        <Radio value='2'>2</Radio>
                                                        <Radio value='3'>3</Radio>
                                                        <Radio value='4'>4</Radio>
                                                        <Radio value='5'>5</Radio>
                                                    </Stack>
                                                </RadioGroup> */}
                                                <h1 className="italic text-red-500">Input 0.00 - 5.00 only</h1>
                                                <Input onChange={onChangeHandler} step={0.01} type={'number'} min={1} max={5}></Input>
                                                </FormLabel>
                                            </FormControl>
                                        </div>
                                    </div>
                                    {/* //Efficiency */}
                                    <div className="flex flex-col gap-2 p-2 border-2 border-[#aaa] rounded-lg">
                                        <h1 className=" uppercase font-bold">Efficiency</h1>
                                        <div className="flex flex-col gap-2 border-2 border-[#aaa] rounded-lg">
                                            <h1 className="bg-[#ddd] p-5 rounded-lg">Q1. Produces more output in a shorter period of time, without sacrificing quality.</h1>
                                            <FormControl className='flex items-center justify-start'>
                                                <FormLabel className="w-[30%] px-2">
                                                    {/* <RadioGroup className="px-5 py-3" onChange={radioOnchangeHandler} name='quality-1' defaultValue='1'>
                                                        <Stack direction='row' gap={'10'}>
                                                            <Radio value='1'>1</Radio>
                                                            <Radio value='2'>2</Radio>
                                                            <Radio value='3'>3</Radio>
                                                            <Radio value='4'>4</Radio>
                                                            <Radio value='5'>5</Radio>
                                                        </Stack>
                                                    </RadioGroup> */}
                                                    <h1 className="italic text-red-500">Input 0.00 - 5.00 only</h1>
                                                    <Input onChange={onChangeHandler} step={0.01} type={'number'} min={1} max={5}></Input>
                                                </FormLabel>
                                            </FormControl>
                                        </div>
                                        <div className="flex flex-col gap-2 border-2 border-[#aaa] rounded-lg">
                                            <h1 className="bg-[#ddd] p-5 rounded-lg">Q2. Completes work in a timely manner; reasonable use of overtime which is justified.</h1>
                                            <FormControl className='flex items-center justify-start'>
                                                <FormLabel className="w-[30%] px-2">
                                                {/* <RadioGroup className="px-5 py-2" onChange={radioOnchangeHandler} name='quality-2' defaultValue='1'>
                                                    <Stack direction='row' gap={'10'}>
                                                        <Radio value='1'>1</Radio>
                                                        <Radio value='2'>2</Radio>
                                                        <Radio value='3'>3</Radio>
                                                        <Radio value='4'>4</Radio>
                                                        <Radio value='5'>5</Radio>
                                                    </Stack>
                                                </RadioGroup> */}
                                                <h1 className="italic text-red-500">Input 0.00 - 5.00 only</h1>
                                                <Input onChange={onChangeHandler} step={0.01} type={'number'} min={1} max={5}></Input>
                                                </FormLabel>
                                            </FormControl>
                                        </div>
                                        <div className="flex flex-col gap-2 border-2 border-[#aaa] rounded-lg">
                                            <h1 className="bg-[#ddd] p-5 rounded-lg">Q3. Extremely organized; Exhibits strong planning capability </h1>
                                            <FormControl className='flex items-center justify-start'>
                                                <FormLabel className="w-[30%] px-2">
                                                {/* <RadioGroup className="px-5 py-2" onChange={radioOnchangeHandler} name='quality-2' defaultValue='1'>
                                                    <Stack direction='row' gap={'10'}>
                                                        <Radio value='1'>1</Radio>
                                                        <Radio value='2'>2</Radio>
                                                        <Radio value='3'>3</Radio>
                                                        <Radio value='4'>4</Radio>
                                                        <Radio value='5'>5</Radio>
                                                    </Stack>
                                                </RadioGroup> */}
                                                <h1 className="italic text-red-500">Input 0.00 - 5.00 only</h1>
                                                <Input onChange={onChangeHandler} step={0.01} type={'number'} min={1} max={5}></Input>
                                                </FormLabel>
                                            </FormControl>
                                        </div>
                                    </div>
                                    {/* //Integrity */}
                                    <div className="flex flex-col gap-2 p-2 border-2 border-[#aaa] rounded-lg">
                                        <h1 className=" uppercase font-bold">Integrity</h1>
                                        <div className="flex flex-col gap-2 border-2 border-[#aaa] rounded-lg">
                                            <h1 className="bg-[#ddd] p-5 rounded-lg">Q1. Ensures work responsibilities are covered when absent or updates management of pending responsibilities or upcoming deadlines. </h1>
                                            <FormControl className='flex items-center justify-start'>
                                                <FormLabel className="w-[30%] px-2">
                                                    {/* <RadioGroup className="px-5 py-3" onChange={radioOnchangeHandler} name='quality-1' defaultValue='1'>
                                                        <Stack direction='row' gap={'10'}>
                                                            <Radio value='1'>1</Radio>
                                                            <Radio value='2'>2</Radio>
                                                            <Radio value='3'>3</Radio>
                                                            <Radio value='4'>4</Radio>
                                                            <Radio value='5'>5</Radio>
                                                        </Stack>
                                                    </RadioGroup> */}
                                                    <h1 className="italic text-red-500">Input 0.00 - 5.00 only</h1>
                                                    <Input onChange={onChangeHandler} step={0.01} type={'number'} min={1} max={5}></Input>
                                                </FormLabel>
                                            </FormControl>
                                        </div>
                                        <div className="flex flex-col gap-2 border-2 border-[#aaa] rounded-lg">
                                            <h1 className="bg-[#ddd] p-5 rounded-lg">Q2. Consistent in words and action to management, fellow employees, and external stake holders.  </h1>
                                            <FormControl className='flex items-center justify-start'>
                                                <FormLabel className="w-[30%] px-2">
                                                {/* <RadioGroup className="px-5 py-2" onChange={radioOnchangeHandler} name='quality-2' defaultValue='1'>
                                                    <Stack direction='row' gap={'10'}>
                                                        <Radio value='1'>1</Radio>
                                                        <Radio value='2'>2</Radio>
                                                        <Radio value='3'>3</Radio>
                                                        <Radio value='4'>4</Radio>
                                                        <Radio value='5'>5</Radio>
                                                    </Stack>
                                                </RadioGroup> */}
                                                <h1 className="italic text-red-500">Input 0.00 - 5.00 only</h1>
                                                <Input onChange={onChangeHandler} step={0.01} type={'number'} min={1} max={5}></Input>
                                                </FormLabel>
                                            </FormControl>
                                        </div>
                                        <div className="flex flex-col gap-2 border-2 border-[#aaa] rounded-lg">
                                            <h1 className="bg-[#ddd] p-5 rounded-lg">Q3. Arrives at appointments and meetings on time without the need of reminders; absences and tardiness is excused and reasonable.</h1>
                                            <FormControl className='flex items-center justify-start'>
                                                <FormLabel className="w-[30%] px-2">
                                                {/* <RadioGroup className="px-5 py-2" onChange={radioOnchangeHandler} name='quality-2' defaultValue='1'>
                                                    <Stack direction='row' gap={'10'}>
                                                        <Radio value='1'>1</Radio>
                                                        <Radio value='2'>2</Radio>
                                                        <Radio value='3'>3</Radio>
                                                        <Radio value='4'>4</Radio>
                                                        <Radio value='5'>5</Radio>
                                                    </Stack>
                                                </RadioGroup> */}
                                                <h1 className="italic text-red-500">Input 0.00 - 5.00 only</h1>
                                                <Input onChange={onChangeHandler} step={0.01} type={'number'} min={1} max={5}></Input>
                                                </FormLabel>
                                            </FormControl>
                                        </div>
                                        <div className="flex flex-col gap-2 border-2 border-[#aaa] rounded-lg">
                                            <h1 className="bg-[#ddd] p-5 rounded-lg">Q4. Ethical and Strives for Win-win </h1>
                                            <FormControl className='flex items-center justify-start'>
                                                <FormLabel className="w-[30%] px-2">
                                                {/* <RadioGroup className="px-5 py-2" onChange={radioOnchangeHandler} name='quality-2' defaultValue='1'>
                                                    <Stack direction='row' gap={'10'}>
                                                        <Radio value='1'>1</Radio>
                                                        <Radio value='2'>2</Radio>
                                                        <Radio value='3'>3</Radio>
                                                        <Radio value='4'>4</Radio>
                                                        <Radio value='5'>5</Radio>
                                                    </Stack>
                                                </RadioGroup> */}
                                                <h1 className="italic text-red-500">Input 0.00 - 5.00 only</h1>
                                                <Input onChange={onChangeHandler} step={0.01} type={'number'} min={1} max={5}></Input>
                                                </FormLabel>
                                            </FormControl>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 p-2 border-2 border-[#aaa] rounded-lg">
                                    <h1 className=" uppercase font-bold">Functional Components</h1>
                                    {/* //Individual Contributor & Management Roles */}
                                    <div className="flex flex-col gap-2 p-2 border-2 border-[#aaa] rounded-lg">
                                        <h1 className=" uppercase font-bold">Individual Contributor & Management Roles</h1>
                                        <div className="flex flex-col gap-2 border-2 border-[#aaa] rounded-lg">
                                            <h1 className="bg-[#ddd] p-5 rounded-lg"><span className="font-bold">PERSONAL EXCELLENCE</span><br></br>Q1. Able to continuously seek and act on continuous improvement to all aspects of work and work relations </h1>
                                            <FormControl className='flex items-center justify-start'>
                                                <FormLabel className="w-[30%] px-2">
                                                    <h1 className="italic text-red-500">Input 0.00 - 5.00 only</h1>
                                                    <Input onChange={onChangeHandler} step={0.01} type={'number'} min={1} max={5}></Input>
                                                </FormLabel>
                                            </FormControl>
                                        </div>
                                        <div className="flex flex-col gap-2 border-2 border-[#aaa] rounded-lg">
                                            <h1 className="bg-[#ddd] p-5 rounded-lg"><span className="font-bold">KNOWLEDGE AND SKILLS</span><br></br>Q1. Extent to which the employee possess and use required knowledge and skills, considering the use of experience and judgment in performing the job. </h1>
                                            <FormControl className='flex items-center justify-start'>
                                                <FormLabel className="w-[30%] px-2">
                                                    <h1 className="italic text-red-500">Input 0.00 - 5.00 only</h1>
                                                    <Input onChange={onChangeHandler} step={0.01} type={'number'} min={1} max={5}></Input>
                                                </FormLabel>
                                            </FormControl>
                                        </div>
                                        <div className="flex flex-col gap-2 border-2 border-[#aaa] rounded-lg">
                                            <h1 className="bg-[#ddd] p-5 rounded-lg"><span className="font-bold">TEAM PLAYER</span><br></br>Q1. Able to work with others. Willingness to take instruction. </h1>
                                            <FormControl className='flex items-center justify-start'>
                                                <FormLabel className="w-[30%] px-2">
                                                    <h1 className="italic text-red-500">Input 0.00 - 5.00 only</h1>
                                                    <Input onChange={onChangeHandler} step={0.01} type={'number'} min={1} max={5}></Input>
                                                </FormLabel>
                                            </FormControl>
                                        </div>
                                        <div className="flex flex-col gap-2 border-2 border-[#aaa] rounded-lg">
                                            <h1 className="bg-[#ddd] p-5 rounded-lg"><span className="font-bold">EFFECTIVE COMMUNICATION</span><br></br>Q1. Able to relay honest, transparent and open messages in an appropriate manner </h1>
                                            <FormControl className='flex items-center justify-start'>
                                                <FormLabel className="w-[30%] px-2">
                                                    <h1 className="italic text-red-500">Input 0.00 - 5.00 only</h1>
                                                    <Input onChange={onChangeHandler} step={0.01} type={'number'} min={1} max={5}></Input>
                                                </FormLabel>
                                            </FormControl>
                                        </div>
                                        <div className="flex flex-col gap-2 border-2 border-[#aaa] rounded-lg">
                                            <h1 className="bg-[#ddd] p-5 rounded-lg"><span className="font-bold">LEARNED / TECHNICAL SKILLS</span><br></br>Q1. Able to acquire and apply necessary skills, knowledge and behavior to perform the job effectively and effIciently </h1>
                                            <FormControl className='flex items-center justify-start'>
                                                <FormLabel className="w-[30%] px-2">
                                                    <h1 className="italic text-red-500">Input 0.00 - 5.00 only</h1>
                                                    <Input onChange={onChangeHandler} step={0.01} type={'number'} min={1} max={5}></Input>
                                                </FormLabel>
                                            </FormControl>
                                        </div>
                                    </div>
                                     {/* //For Those Hired as Supervisors & Up Only */}
                                    <div className="flex flex-col gap-2 p-2 border-2 border-[#aaa] rounded-lg">
                                        <h1 className=" uppercase font-bold text-red-500">For Those Hired as Supervisors & Up Only</h1>
                                        <div className="flex flex-col gap-2 border-2 border-[#aaa] rounded-lg">
                                            <h1 className="bg-[#ddd] p-5 rounded-lg"><span className="font-bold">LEADERSHIP</span><br></br>Q1. Able to lead by example, to view others as more important than our self-interest, taking personal responsibility for the employees' experience </h1>
                                            <FormControl className='flex items-center justify-start'>
                                                <FormLabel className="w-[30%] px-2">
                                                    <h1 className="italic text-red-500">Input 0.00 - 5.00 only</h1>
                                                    <Input onChange={onChangeHandler} step={0.01} type={'number'} min={1} max={5}></Input>
                                                </FormLabel>
                                            </FormControl>
                                        </div>
                                        <div className="flex flex-col gap-2 border-2 border-[#aaa] rounded-lg">
                                            <h1 className="bg-[#ddd] p-5 rounded-lg"><span className="font-bold">MANAGEMENT</span><br></br>Q1. Able to effectively plan, organize, lead and control resources in meeting job expectations for self and the team being led.</h1>
                                            <FormControl className='flex items-center justify-start'>
                                                <FormLabel className="w-[30%] px-2">
                                                    <h1 className="italic text-red-500">Input 0.00 - 5.00 only</h1>
                                                    <Input onChange={onChangeHandler} step={0.01} type={'number'} min={1} max={5}></Input>
                                                </FormLabel>
                                            </FormControl>
                                        </div>
                                        <div className="flex flex-col gap-2 border-2 border-[#aaa] rounded-lg">
                                            <h1 className="bg-[#ddd] p-5 rounded-lg"><span className="font-bold">EMPLOYEE DEVELOPMENT</span><br></br>Q1. Able to help employees stay employable and versatile, developing more valued skills </h1>
                                            <FormControl className='flex items-center justify-start'>
                                                <FormLabel className="w-[30%] px-2">
                                                    <h1 className="italic text-red-500">Input 0.00 - 5.00 only</h1>
                                                    <Input onChange={onChangeHandler} step={0.01} type={'number'} min={1} max={5}></Input>
                                                </FormLabel>
                                            </FormControl>
                                        </div>
                                        <div className="flex flex-col gap-2 border-2 border-[#aaa] rounded-lg">
                                            <h1 className="bg-[#ddd] p-5 rounded-lg"><span className="font-bold">EFFECTIVE COMMUNICATION</span><br></br>Q1. Able to relay honest, transparent and open messages in an appropriate manner </h1>
                                            <FormControl className='flex items-center justify-start'>
                                                <FormLabel className="w-[30%] px-2">
                                                    <h1 className="italic text-red-500">Input 0.00 - 5.00 only</h1>
                                                    <Input onChange={onChangeHandler} step={0.01} type={'number'} min={1} max={5}></Input>
                                                </FormLabel>
                                            </FormControl>
                                        </div>
                                    </div>
                                </div>
                                        {/*Performance */}
                                <div className="flex flex-col gap-2 p-2 border-2 border-[#aaa] rounded-lg">
                                        <h1 className=" uppercase font-bold">Performance</h1>
                                        On the set goals/KPI for the period:
                                    <div className="flex flex-row items-center gap-4 p-5 border-2 border-[#aaa] rounded-lg bg-white">
                                        <h1 className="font-bold uppercase w-64">GOAL / Key Performance Indicator (KPI) ACHIEVEMENT  </h1>
                                        <div className="flex flex-col">
                                            {/* On the set goals/KPI for the period: */}
                                            <h1>4.61 - 5.00</h1>
                                            <h1>3.61 - 4.60</h1>
                                            <h1>3.00 - 3.60</h1>
                                            <h1>2.00 - 2.99</h1>
                                            <h1>0.00 - 1.99</h1>
                                        </div>
                                        <div className="flex flex-col">
                                            <h1>(EE)</h1>
                                            <h1>(SS)</h1>
                                            <h1>(ME)</h1>
                                            <h1>(DN)</h1>
                                            <h1>(NI)</h1>
                                        </div>
                                        <div className="flex flex-col">
                                            <h1>Plus Extra Milestones on top of the set goal  </h1>
                                            <h1>achieved the set goal (i.e., 100%)</h1>
                                            <h1>achieved 80% -99% of set goal</h1>
                                            <h1>achieved 60% - 79% of set goal </h1>
                                            <h1>achieved 59% or less than the set goal</h1>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 p-2 border-2 border-[#aaa] rounded-lg">
                                        <h1 className=" uppercase font-bold ">Schedule/ Ontime Delivery</h1>
                                        <div className="flex flex-col gap-2 border-2 border-[#aaa] rounded-lg">
                                            <h1 className="bg-[#ddd] p-5 rounded-lg">Q1. 70% of on-time delivery and placement of ERFs with 90-day SLA</h1>
                                            <FormControl className='flex items-center justify-start'>
                                                <FormLabel className="w-[30%] px-2">
                                                    <h1 className="italic text-red-500">Input 0.00 - 5.00 only</h1>
                                                    <Input onChange={onChangeHandler} step={0.01} type={'number'} min={1} max={5}></Input>
                                                </FormLabel>
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 p-2 border-2 border-[#aaa] rounded-lg">
                                        <h1 className=" uppercase font-bold ">Schedule/ Ontime Delivery</h1>
                                        <div className="flex flex-col gap-2 border-2 border-[#aaa] rounded-lg">
                                            <h1 className="bg-[#ddd] p-5 rounded-lg">Q1. 90% of on-time delivery and placement of target newbies on-boarding</h1>
                                            <FormControl className='flex items-center justify-start'>
                                                <FormLabel className="w-[30%] px-2">
                                                    <h1 className="italic text-red-500">Input 0.00 - 5.00 only</h1>
                                                    <Input onChange={onChangeHandler} step={0.01} type={'number'} min={1} max={5}></Input>
                                                </FormLabel>
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 p-2 border-2 border-[#aaa] rounded-lg">
                                        <h1 className=" uppercase font-bold ">Quality</h1>
                                        <div className="flex flex-col gap-2 border-2 border-[#aaa] rounded-lg">
                                            <h1 className="bg-[#ddd] p-5 rounded-lg">Q1. 90% of regularized new hires on-boarded</h1>
                                            <FormControl className='flex items-center justify-start'>
                                                <FormLabel className="w-[30%] px-2">
                                                    <h1 className="italic text-red-500">Input 0.00 - 5.00 only</h1>
                                                    <Input onChange={onChangeHandler} step={0.01} type={'number'} min={1} max={5}></Input>
                                                </FormLabel>
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 p-2 border-2 border-[#aaa] rounded-lg">
                                        <h1 className=" uppercase font-bold ">Productivity</h1>
                                        <div className="flex flex-col gap-2 border-2 border-[#aaa] rounded-lg">
                                            <h1 className="bg-[#ddd] p-5 rounded-lg">Q1. 60% of total Monthly Productivity within acceptable target, Endorsed to TI vs. successful placement hit rate</h1>
                                            <FormControl className='flex items-center justify-start'>
                                                <FormLabel className="w-[30%] px-2">
                                                    <h1 className="italic text-red-500">Input 0.00 - 5.00 only</h1>
                                                    <Input onChange={onChangeHandler} step={0.01} type={'number'} min={1} max={5}></Input>
                                                </FormLabel>
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 p-2 border-2 border-[#aaa] rounded-lg">
                                        <h1 className=" uppercase font-bold ">Process</h1>
                                        <div className="flex flex-col gap-2 border-2 border-[#aaa] rounded-lg">
                                            <h1 className="bg-[#ddd] p-5 rounded-lg">Q1. 0 (Zero) Number of NCRs based on Audit Findings</h1>
                                            <FormControl className='flex items-center justify-start'>
                                                <FormLabel className="w-[30%] px-2">
                                                    <h1 className="italic text-red-500">Input 0.00 - 5.00 only</h1>
                                                    <Input onChange={onChangeHandler} step={0.01} type={'number'} min={1} max={5}></Input>
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
