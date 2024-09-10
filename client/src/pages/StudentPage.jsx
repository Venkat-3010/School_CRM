import { useEffect, useState } from "react";
import Header from "../components/Header";
import {
  createStudent,
  deleteStudentById,
  getAllStudentsInClass,
  updateStudentById,
} from "../api/studentApi";
import { getAllClasses } from "../api/classApi";
import Form from "../components/Form";
import Pagination from "../components/Pagination";
import DataTable from "../components/DataTable";
import { useNavigate } from "react-router-dom";

const StudentPage = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents(currentPage, sortField, sortOrder);
    fetchClasses();
  }, [currentPage, sortField, sortOrder]);

  const fetchStudents = async (page, sort, order) => {
    try {
      const response = await getAllStudentsInClass({ page, sort, order });
      const flattenedStudents = response.data.map((student) => ({
        ...student,
        className: student.classId ? student.classId.name : "N/A",
      }));
      setStudents(flattenedStudents);
      setTotalPages(Math.ceil(response.total / 10));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await getAllClasses();
      setClasses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (teacherData) => {
    console.log(teacherData);
    setCurrentStudent(teacherData);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (values) => {
    try {
      console.log(values);
      if (currentStudent) {
        await updateStudentById(currentStudent._id, values);
      } else {
        await createStudent(values);
      }
      fetchStudents(currentPage);
      setIsModalOpen(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteClick = async (_id) => {
    try {
      await deleteStudentById(_id);
      fetchStudents(currentPage);
    } catch (error) {
      console.log(error.message);
    }
  };

  const formFields = [
    {
      label: "Name",
      name: "name",
      type: "text",
      placeholder: "Enter student name",
      required: true,
    },
    {
      label: "Gender",
      name: "gender",
      type: "text",
      placeholder: "Enter gender",
      required: true,
    },
    {
      label: "Date of Birth",
      name: "dob",
      type: "date",
      placeholder: "Enter date of birth",
      required: true,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter email",
      required: true,
    },
    {
      label: "Phone",
      name: "contactNumber",
      type: "tel",
      placeholder: "Enter phone number",
      required: true,
    },
    {
      label: "Assigned Class",
      name: "classId",
      type: "select",
      options: classes.map((c) => ({ value: c._id, label: c.name })),
    },
    {
      label: "fees",
      name: "feesPaid",
      type: "number",
      placeholder: "Enter fees",
      required: true,
    },
  ];

  return (
    <>
      <Header head={"Students"} />
      <div className="m-12">
        <div className="flex space-x-4 mb-4">
          <div>
            <label>Sort By:</label>
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
              className="ml-2 p-2 border"
            >
              <option value="name">Name</option>
              <option value="dob">DOB</option>
              <option value="feesPaid">Fees Paid</option>
            </select>
          </div>
          <div>
            <label>Order:</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="ml-2 p-2 border"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
        <DataTable
          columns={[
            { label: "Name", id: "name" },
            { label: "Gender", id: "gender" },
            {
              label: "Date of Birth",
              id: "dob",
              format: (value) => {
                const date = new Date(value);
                const day = date.getUTCDate().toString().padStart(2, "0");
                const month = (date.getUTCMonth() + 1)
                  .toString()
                  .padStart(2, "0"); 
                const year = date.getUTCFullYear();
                return `${day}/${month}/${year}`;
              },
            },
            { label: "Contact Number", id: "contactNumber" },
            { label: "Fees", id: "feesPaid" },
            { label: "Email", id: "email" },
            { label: "Assigned Class", id: "className" },
          ]}
          data={students}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
          disableRowClick={true}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => {
              if (classes.length === 0) {
                navigate("/classes");
              }
              setIsModalOpen(true);
            }}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Add a new Student
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

export default StudentPage;
