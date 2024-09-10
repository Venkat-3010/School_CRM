import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { RxHamburgerMenu } from "react-icons/rx";
import DashboardPage from "./pages/DashboardPage";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import ClassPage from "./pages/ClassPage";
import StudentPage from "./pages/StudentPage";
import TeacherPage from "./pages/TeacherPage";
import FinancialAnalyticsPage from "./pages/FinancialAnalyticsPage";
import ClassAnalytics from "./components/ClassAnalytics";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-200 flex">
        <div
          className={`bg-white ${
            isOpen ? "block" : "hidden"
          } md:block`}
        >
          <div className='md:hidden' onClick={() => setIsOpen(!isOpen)}>
            <RxHamburgerMenu />
          </div>
          <Sidebar />
        </div>
        <div className="w-full">
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path='/classes' element={<ClassPage />}/>
            <Route path='/classes/:id/analytics' element={<ClassAnalytics />}/>
            <Route path='/students' element={<StudentPage />}/>
            <Route path='/teachers' element={<TeacherPage />}/>
            <Route path='/analytics' element={<FinancialAnalyticsPage />}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
