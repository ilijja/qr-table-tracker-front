import { Outlet, redirect } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {

    return (
        <Sidebar>
          <Outlet/>
        </Sidebar>
      );
};

export default DashboardLayout;


