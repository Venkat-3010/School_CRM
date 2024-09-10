import { useEffect, useState } from "react";
import Header from "../components/Header";
import { getAllClasses } from "../api/classApi";
import { getAllTeachers } from "../api/teacherApi";
import { getAllStudentsInClass } from "../api/studentApi";

const DashboardPage = () => {
  const [totalClasses, setTotalClasses] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classResponse = await getAllClasses();
        const teacherResponse = await getAllTeachers();
        const studentResponse = await getAllStudentsInClass();

        setTotalClasses(classResponse.total);
        setTotalTeachers(teacherResponse.total);
        setTotalStudents(studentResponse.total);
      } catch (error) {
        console.error("error fetching data", error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Header head={"Dashboard"} />
      <div className="mt-12 flex flex-wrap justify-center items-center gap-8 p-6">
        <div className="p-6 bg-white shadow-md rounded-lg w-60 text-center">
          <h2 className="text-xl font-semibold">Total Classes</h2>
          <p className="text-2xl font-bold">{totalClasses}</p>
        </div>
        <div className="p-6 bg-white shadow-md rounded-lg w-60 text-center ">
          {/* <img src={teacher} alt="Teacher" className="h-24 w-24" /> */}
          <h2 className="text-xl font-semibold">Total Teachers</h2>
          <p className="text-2xl font-bold">{totalTeachers}</p>
        </div>
        <div className="p-6 bg-white shadow-md rounded-lg w-60 text-center">
          <h2 className="text-xl font-semibold">Total Students</h2>
          <p className="text-2xl font-bold">{totalStudents}</p>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
