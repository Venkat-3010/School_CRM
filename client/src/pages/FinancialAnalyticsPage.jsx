import { useEffect, useState } from "react";
import Header from "../components/Header";
import { getFinancialAnalytics } from "../api/classApi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const FinancialAnalyticsPage = () => {
  const [view, setView] = useState("monthly");
  const [data, setData] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchFinancialData();
  }, [view, month, year]);

  const fetchFinancialData = async () => {
    const response = await getFinancialAnalytics({ view, month, year });
    setData(response);
  };

  const barData = [
    { name: "Expenses", amount: data.expenses || 0 },
    { name: "Income", amount: data.income || 0 },
  ];

  return (
    <>
      <Header head={"Analytics"} />
      <div className="m-40 p-8 w-3/4 shadow-2xl rounded-xl bg-white">
        <label htmlFor="" className="mr-2">
          View:
        </label>
        <select value={view} onChange={(e) => setView(e.target.value)} id="">
          <option value="monthly">Month</option>
          <option value="annual">Year</option>
        </select>
        <div className="mb-4 mt-4">
          {view === "monthly" && (
            <>
              <label htmlFor="" className="mr-2">
                Month:
              </label>
              <input
                type="number"
                min="1"
                max="12"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              />
            </>
          )}
          <label className="mr-2 ml-4">Year:</label>
          <input
            type="number"
            min="2000"
            max={new Date().getFullYear()}
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>

        <BarChart width={600} height={300} data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#36a2eb" />
        </BarChart>
      </div>
    </>
  );
};

export default FinancialAnalyticsPage;
