import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import {
  createClass,
  deleteClassById,
  getAllClasses,
  updateClassById,
} from "../api/classApi";
import DataTable from "../components/DataTable";
import Form from "../components/Form";
import Pagination from "../components/Pagination";

const ClassPage = () => {
  const [classes, setClasses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentClass, setCurrentClass] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClasses(currentPage);
  }, [currentPage]);

  const fetchClasses = async (page) => {
    try {
      const response = await getAllClasses({ page });
      // console.log(response.data);
      setClasses(response.data);
      setTotalPages(Math.ceil(response.total / 10));
    } catch (error) {
      console.log(error);
    }
  };

  const formFields = [
    {
      name: "name",
      label: "name",
      type: "text",
      placeholder: "Enter class name",
      required: true,
    },
    {
      name: "year",
      label: "year",
      type: "number",
      placeholder: "Enter the class year",
      required: true,
    },
    {
      name: "studentFees",
      label: "studentFees",
      type: "number",
      placeholder: "Enter class fees",
      required: true,
    },
    {
      name: "studentLimit",
      label: "studentLimit",
      type: "number",
      placeholder: "Enter class student limit, Max 40",
      required: true,
    },
  ];

  const handleRowClick = (classData) => {
    navigate(`/classes/${classData._id}/analytics`);
  };

  const handleEditClick = (classData) => {
    setCurrentClass(classData);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (values) => {
    try {
      console.log(values);
      if (currentClass) {
        await updateClassById(currentClass._id, values);
      } else {
        await createClass(values);
      }
      fetchClasses(currentPage);
      setIsModalOpen(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteClick = async (_id) => {
    try {
      await deleteClassById(_id);
      fetchClasses(currentPage);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Header head={"Classes"} />
      <div className="m-12">
        <DataTable
          columns={[
            { label: "Name", id: "name" },
            { label: "Year", id: "year" },
            { label: "Fees", id: "studentFees" },
            { label: "Limit", id: "studentLimit" },
          ]}
          data={classes}
          onRowClick={handleRowClick}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
          // onSort={handleSort}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Add a new Class
          </button>
          <Form
            fields={formFields}
            onsubmit={handleFormSubmit}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </div>
    </>
  );
};

export default ClassPage;
