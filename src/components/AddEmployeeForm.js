import { motion } from "framer-motion";
import { useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  IconButton,
  useToast,
} from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";
import { useStateContext } from "../context/contextApi";
const AddEmployeeForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);

  const {} = useStateContext();
  const [formData, setFormData] = useState({
    fn: "",
    ln: "",
    pos: "",
  });
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const toast = useToast();
  const addEmployee = (e) => {
    e.preventDefault();
    const data = {
      FirstName: formData.fn,
      LastName: formData.ln,
      Position: formData.pos,
    };
    let fn = data.FirstName.trim().split(" ");
    fn = fn
      .map((e) => {
        return e.split("").splice(0, 1).join("").toUpperCase() + e.split("").splice(1, e.length).join("");
      })
      .join(" ");
    console.log(fn);
    let ln =
      data.LastName.split("").splice(0, 1).join("").toUpperCase() +
      data.LastName.split("").splice(1, data.LastName.length).join("");
    let position = data.Position.trim().split(" ");
    position = position
      .map((e) => {
        return e.split("").splice(0, 1).join("").toUpperCase() + e.split("").splice(1, e.length).join("");
      })
      .join(" ");
    console.log(position);
    const url = `https://allianceapi20220724134106.azurewebsites.net/api/Employee?FirstName=${fn}&LastName=${ln}&Position=${position}`;
    axios.post(url).then((result) => console.log(result));
    onClose();
    setFormData({
      fn: "",
      ln: "",
      pos: "",
    });
    toast({
      title: "Employee created.",
      description: "You added an employee!!",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };
  return (
    <motion.div>
      <IconButton icon={<AddIcon />} onClick={onOpen} />

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>

              <Input value={formData.fn} name="fn" onChange={handleChange} ref={initialRef} placeholder="John" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input value={formData.ln} name="ln" onChange={handleChange} placeholder="Doe" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Position</FormLabel>
              <Input value={formData.pos} name="pos" onChange={handleChange} placeholder="Business Manager" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={addEmployee}>
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </motion.div>
  );
};

export default AddEmployeeForm;
