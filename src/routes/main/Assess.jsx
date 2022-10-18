import React, {useState} from "react";
import Papa from "papaparse";
import MainLayout from "../../components/MainLayout";
import { 
	Select,
	FormControl,
	FormLabel,
	Input,
} from "@chakra-ui/react";


const Assess = () => {
	const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

	const commonConfig = { delimiter: "," };

	const [CSVData, setCSVData] = useState();

	const handleAssess = (e) =>{
		if(selectedFile != undefined){
			Papa.parse(
				selectedFile,
				{
					...commonConfig,
					header: true,
					complete: (result) => {
						setCSVData(result.data);
					}
				}
				);
			}
		}
	const changeHandler = (e) => {
		setSelectedFile(e.target.files[0]);
		setIsFilePicked(true);
	};
	return (
		<MainLayout>
			<div className="flex flex-col w-full">
				<h1 className="text-5xl font-semibold mb-20">Assess</h1>
				<div className="flex w-full justify-center">
					<div className="flex flex-col w-[70%] rounded-lg shadow-lg dark:shadow-none dark:bg-[#121212] p-10 ">
						<div className="flex items-end gap-10 mb-10">
							<div className="flex flex-col items-start">
								<p className="text-xs mb-2 text-gray-400">Insert data</p>
								<Select>
									<option defaultValue={""}>
										Personal Data Sheet
									</option>
									<option value="">Exam Score</option>
									<option value="">Personality Assessment Exam Result</option>
									<option value="">PES Rating</option>
									<option value="">Assigned Projects</option>
									<option value="">Interview Results</option>
								</Select>
							</div>
							<div className="flex gap-10 items-center">
								<FormControl className="flex flex-row gap-10 h-10 items-center">
									<FormLabel htmlFor="fileInput" className="rounded-md dark:bg-[#1f1f1f] dark:text-white hover:cursor-pointer bg-gray-100 text-black p-[.6rem] mt-2">Upload File</FormLabel>
									<Input id="fileInput" className="p-1 hidden" type="file" accept="text/csv" name="file" onChange={changeHandler} />
									{selectedFile!=undefined && isFilePicked ? (
										<div>
											<p className="whitespace-nowrap overflow-hidden text-ellipsis max-w-xs" dir="rtl">{selectedFile.name}</p>
										</div>
									) : (
										<p>No file selected</p>
									)}
								</FormControl>
							</div>
						</div>
						<button onClick={handleAssess} className="bg-[#ec2224] text-white text-lg py-2 rounded-lg font-semibold hover:opacity-80 transition-opacity duration-300">
							Assess
						</button>
					</div>
				</div>
				<b>Parsed CSV File:</b> {JSON.stringify(CSVData,undefined,4)}
			</div>
		</MainLayout>
	);
};

export default Assess;
