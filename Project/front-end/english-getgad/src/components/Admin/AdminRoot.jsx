import AdminNav from "./AdminNav";
import { Outlet } from "react-router-dom";
import { AdminContextProvider } from "../../store/AdminContext";

function AdminRoot() {
  return (
    <div className="grid grid-cols-12">
      <AdminNav className="" />
      <AdminContextProvider>
        <Outlet />
      </AdminContextProvider>
    </div>
  );
}

export default AdminRoot;
