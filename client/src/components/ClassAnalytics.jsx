import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { getClassById } from "../api/classApi";
import Header from "./Header";

const ClassAnalytics = () => {
  const { id } = useParams();
  const [classData, setClassData] = useState(null);

  useEffect(() => {
    fetchClassData();
  }, []);

  const fetchClassData = async () => {
    const response = await getClassById(id);
    console.log(response);
    setClassData(response);
  };

  const COLORS = ["#ff6384", "#36a2eb"];

  if (!classData)
    return <div className="flex justify-center items-center">Loading...</div>;

  const genderCounts = classData.students.reduce(
    (acc, student) => {
      acc[student.gender] = (acc[student.gender] || 0) + 1;
      return acc;
    },
    { male: 0, female: 0 }
  );

  const data = [
    { name: "Male", value: genderCounts.male },
    { name: "Female", value: genderCounts.female },
  ];

  return (
    <>
      <Header head={"Class Analytics"} />
      <div className="m-12 p-8 shadow-xl rounded-xl bg-white">
        <h1 className="text-4xl font-bold text-gray-700 text-center mb-6">
          {classData.name}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-600">
            Class Details
          </h2>
          <p className="text-lg mb-2">
            <strong>Year:</strong> {classData.year}
          </p>
          <p className="text-lg mb-2">
            <strong>Teacher(s):</strong>
          </p>
          <ul className="ml-4 list-disc text-lg text-gray-600">
            {classData.teacher.map((item) => (
              <li key={item._id}>{item.name}</li>
            ))}
          </ul>
          <p className="text-lg mt-4">
            <strong>Students:</strong>
          </p>
          <ul className="ml-4 list-disc text-lg text-gray-600">
            {classData.students.map((item) => (
              <li key={item._id}>{item.name}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-center justify-center mt-8">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
              Student Gender Distribution
            </h2>
            <PieChart width={400} height={400} className="mx-auto">
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                label
                isAnimationActive={true}
                animationDuration={800}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>
    </>
  );
};

export default ClassAnalytics;
