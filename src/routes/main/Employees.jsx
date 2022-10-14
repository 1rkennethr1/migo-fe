//lib
import { motion } from "framer-motion";
import { CircularProgress } from "@chakra-ui/react";

//context
import { useStateContext } from "../../lib/context";

//components
import MainLayout from "../../components/MainLayout";
import EmployeeRow from "../../components/EmployeeRow";
import AddEmployeeForm from "../../components/AddEmployeeForm";

const Employees = () => {
  const { minimized, employees, isFetchingEmployees } = useStateContext();

  if (isFetchingEmployees) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center w-full">
          <CircularProgress isIndeterminate color="red" />
        </div>
      </MainLayout>
    );
  }
  return (
    <MainLayout>
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.5,
          type: "spring",
          damping: 20,
          stiffness: 90,
        }}
      >
        <div
          className={`w-screen transition-all duration-500 ${
            minimized ? "max-w-[75rem]" : "2xl:max-w-[90rem] max-w-5xl"
          } ml-20 h-[80vh] overflow-y-scroll mt-10  bg-white dark:bg-[#171717]  shadow-lg rounded-xl border border-gray-200 dark:border-neutral-600`}
        >
          <header className="px-5 py-4 border-b border-gray-100 dark:border-neutral-600 transition duration-500 dark:bg-[#0d0d0d] flex justify-between items-center sticky top-0 bg-white">
            <h2 className="font-semibold text-gray-800 py-3 text-xl dark:text-white transition duration-500 ">
              Alliance Software Inc. Employees
            </h2>
            <AddEmployeeForm />
          </header>
          <div className="">
            <div className="">
              <table className="table-auto w-full">
                <thead className="text-xs sticky transition duration-500 top-[85px] w-full font-semibold uppercase dark:bg-[#1f1f1f] text-gray-700 dark:text-white bg-gray-200  ">
                  <tr>
                    <th className="whitespace-nowrap">
                      <div className="font-semibold text-left pl-10">ID</div>
                    </th>
                    <th className="pl-24 whitespace-nowrap">
                      <div className="font-semibold text-left">Name</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Role</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">
                        Date Joined
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-md divide-y divide-gray-100 dark:divide-neutral-700">
                  {employees.map((e) => {
                    return <EmployeeRow key={e.id} e={e} />;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default Employees;
