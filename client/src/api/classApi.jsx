import axios from "axios";
import { toast } from "react-toastify";
// const url = "http://localhost:7000/api/classes";
const url = "https://school-crm-eans.onrender.com/api/classes";

const createClass = async (values) => {
  try {
    const response = await axios.post(`${url}/`, values);
    toast.success("Class created successfully");
    return response.data;
  } catch (error) {
    toast.error("Error creating class", error.message);
    console.log(error.message);
  }
};

const getClassById = async (id) => {
  try {
    const response = await axios.get(`${url}/${id}`);
    return response.data;
  } catch (error) {
    toast.error("Error getting class", error.message);
    console.log(error.message);
  }
};

const updateClassById = async (_id, updatedClassData) => {
  try {
    const response = await axios.put(`${url}/${_id}`, updatedClassData);
    toast.success("Class updated successfully");
    return response.data;
  } catch (error) {
    toast.error("Error updating class", error.message);
    console.log(error.message);
  }
};

const deleteClassById = async (_id) => {
  try {
    await axios.delete(`${url}/${_id}`);
    toast.success("Class deleted successfully");
  } catch (error) {
    toast.error("Error deleting class", error.message);
    console.log(error.message);
  }
};

const getAllClasses = async (params = {}) => {
  try {
    const response = await axios.get(`${url}/`, { params });
    return response.data;
  } catch (error) {
    toast.error("Error getting classes", error.message);
    console.log(error.message);
  }
};

const getFinancialAnalytics = async (params = {}) => {
  try {
    const response = await axios.get(`${url}/analytics/`, { params });
    return response.data;
  } catch (error) {
    toast.error("Error getting financial analytics", error.message);
    console.log(error);
  }
}

export {
  createClass,
  getClassById,
  updateClassById,
  deleteClassById,
  getAllClasses,
  getFinancialAnalytics
};
