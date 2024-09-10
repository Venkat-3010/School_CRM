import { useEffect, useState } from "react";
import Header from "../components/Header";
import {
  createTeacher,
  deleteTeacherById,
  getAllTeachers,
  updateTeacherById,
} from "../api/teacherApi";
import { getAllClasses } from "../api/classApi";
import DataTable from "../components/DataTable";
import Pagination from "../components/pagination";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";

const TeacherPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTeacher, setCurrentTeacher] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const navigate = useNavigate();

  useEffect(() => {
    fetchTeachers(currentPage, sortField, sortOrder);
    fetchClasses();
  }, [currentPage, sortField, sortOrder]);

  const fetchTeachers = async (page, sort, order) => {
    try {
      const response = await getAllTeachers({ page, sort, order });
      console.log(response.data);
      const flattenedTeachers = response.data.map((teacher) => ({
        ...teacher,
        className: teacher.assignedClass ? teacher.assignedClass.name : "N/A",
      }));
      setTeachers(flattenedTeachers);
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
    setCurrentTeacher(teacherData);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (values) => {
    try {
      if (currentTeacher) {
        await updateTeacherById(currentTeacher._id, values);
      } else {
        await createTeacher(values);
      }
      fetchTeachers(currentPage);
      setIsModalOpen(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteClick = async (_id) => {
    try {
      await deleteTeacherById(_id);
      fetchTeachers(currentPage);
    } catch (error) {
      console.log(error.message);
    }
  };

  const teacherFormFields = [
    {
      label: "Name",
      name: "name",
      type: "text",
      placeholder: "Enter class name",
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
      placeholder: "select a date",
      required: true,
    },
    {
      label: "Contact Number",
      name: "contactNumber",
      type: "tel",
      placeholder: "Enter contact number",
      required: true,
    },
    {
      label: "Salary",
      name: "salary",
      type: "number",
      placeholder: "Enter salary",
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
      label: "Assigned Class",
      name: "assignedClass",
      type: "select",
      options: classes.map((c) => ({ value: c._id, label: c.name })),
    },
  ];
  return (
    <>
      <Header head={"Teacher"} />
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
              <option value="feesPaid">Salary</option>
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
            { label: "Salary", id: "salary" },
            { label: "Email", id: "email" },
            { label: "Assigned Class", id: "className" },
          ]}
          data={teachers}
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
            Add a new Teacher
          </button>
          <Form
            fields={teacherFormFields}
            onsubmit={handleFormSubmit}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </div>
    </>
  );
};

export default TeacherPage;
