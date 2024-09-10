import { Link, useLocation } from "react-router-dom";
import { PiStudentFill } from "react-icons/pi";
import { RiDashboardFill } from "react-icons/ri";
import { MdOutlineClass } from "react-icons/md";
import { PiChalkboardTeacherDuotone } from "react-icons/pi";
import { SiGoogleanalytics } from "react-icons/si";

const Sidebar = () => {
  const location = useLocation();

  return (
    <ul className="py-4 w-56 space-y-6">
      <li className="px-8 py-7 border-b-2">
      </li>
      <li
        className={`px-8 py-4 rounded-lg hover:shadow-lg hover:bg-blue-100 ${
          location.pathname === "/" ? "bg-blue-100" : ""
        }`}
      >
        <Link to="/"><RiDashboardFill className="inline-block"/> Dashboard</Link>
      </li>
      <li
        className={`px-8 py-4 rounded-lg hover:shadow-lg hover:bg-blue-100 ${
          location.pathname === "/classes" ? "bg-blue-100" : ""
        }`}
      >
        <Link to="/classes"><MdOutlineClass className="inline-block"/> Classes</Link>
      </li>
      <li
        className={`px-8 py-4 rounded-lg hover:shadow-lg hover:bg-blue-100 ${
          location.pathname === "/teachers" ? "bg-blue-100" : ""
        }`}
      >
        <Link to="/teachers"><PiChalkboardTeacherDuotone className="inline-block"/> Teachers</Link>
      </li>
      <li
        className={`px-8 py-4 rounded-lg hover:shadow-lg hover:bg-blue-100 ${
          location.pathname === "/students" ? "bg-blue-100" : ""
        }`}
      >
        <Link to="/students"><PiStudentFill className="inline-block"/> Students</Link>
      </li>
      <li
        className={`px-8 py-4 rounded-lg hover:shadow-lg hover:bg-blue-100 ${
          location.pathname === "/analytics" ? "bg-blue-100" : ""
        }`}
      >
        <Link to="/analytics"><SiGoogleanalytics className="inline-block"/> Analytics</Link>
      </li>
    </ul>
  );
};

export default Sidebar;
