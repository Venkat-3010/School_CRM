import axios from "axios";
import { toast } from "react-toastify";
const url = "http://localhost:7000/api/teachers";

const createTeacher = async (values) => {
  try {
    const response = await axios.post(`${url}/`, values);
    toast.success("Teacher created successfully");
    return response.data;
  } catch (error) {
    toast.error("Error creating teacher", error.message);
    console.log(error);
  }
};

const getTeacherById = async (_id) => {
  try {
    const response = await axios.get(`${url}/${_id}`);
    return response.data;
  } catch (error) {
    toast.error("Error getting teacher", error.message);
    console.log(error.message);
  }
};

const updateTeacherById = async (_id, updatedTeacherData) => {
  try {
    const response = await axios.put(`${url}/${_id}`, updatedTeacherData);
    toast.success("Teacher updated successfully");
    return response.data;
  } catch (error) {
    toast.error("Error updating teacher", error.message);
    console.log(error.message);
  }
};

const deleteTeacherById = async (_id) => {
  try {
    await axios.delete(`${url}/${_id}`);
    toast.success("Teacher deleted successfully");
  } catch (error) {
    toast.error("Error deleting teacher", error.message);
    console.log(error.message);
  }
};

const getAllTeachers = async (params = {}) => {
  try {
    const response = await axios.get(`${url}/`, { params });
    return response.data;
  } catch (error) {
    toast.error("Error getting teacher", error.message);
    console.log(error.message);
  }
};

export {
  createTeacher,
  getTeacherById,
  updateTeacherById,
  deleteTeacherById,
  getAllTeachers,
};
