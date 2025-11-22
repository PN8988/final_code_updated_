// components/Layout.js
import { Outlet } from "react-router-dom";
import Dashboard from "./Dashboard"; // Sidebar layout only

const Layout = () => (
  <div className="dashboard-container">
    <Dashboard />
    <div className="main-content">
      <Outlet />
    </div>
  </div>
);

export default Layout;
