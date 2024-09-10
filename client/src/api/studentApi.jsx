import axios from "axios";
import { toast } from "react-toastify";
// const url = "http://localhost:7000/api/students";
const url = "https://school-crm-eans.onrender.com/api/students";

const createStudent = async (values) => {
  try {
    const response = await axios.post(`${url}/`, values);
    toast.success("student created successfully");
    return response.data;
  } catch (error) {
    toast.error("Error creating student", error.message);
    console.log(error);
  }
};

const getStudentById = async (_id) => {
  try {
    const response = await axios.get(`${url}/${_id}`);
    return response.data;
  } catch (error) {
    toast.error("Error getting student", error.message);
    console.log(error.message);
  }
};

const updateStudentById = async (_id, updatedStudentData) => {
  try {
    const response = await axios.put(`${url}/${_id}`, updatedStudentData);
    toast.success("student updated successfully");
    return response.data;
  } catch (error) {
    toast.error("Error updating student", error.message);
    console.log(error.message);
  }
};

const deleteStudentById = async (_id) => {
  try {
    await axios.delete(`${url}/${_id}`);
    toast.success("student deleted successfully");
  } catch (error) {
    toast.error("Error deleting student", error.message);
    console.log(error.message);
  }
};

const getAllStudentsInClass = async (params = {}) => {
  try {
    const response = await axios.get(`${url}/`, { params });
    return response.data;
  } catch (error) {
    toast.error("Error getting student", error.message);
    console.log(error.message);
  }
};

export {
  createStudent,
  getStudentById,
  updateStudentById,
  deleteStudentById,
  getAllStudentsInClass,
};
