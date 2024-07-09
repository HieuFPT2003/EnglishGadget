import {useContext} from "react";
import { Link } from "react-router-dom";
import AdminContext from "../../store/AdminContext";
import HeaderManageUser from "./HeaderManageUser";
function ManagerUser() {
  const AdminCtx = useContext(AdminContext);

  return (
    <div className="col-span-9">
      <h1 className="text-5xl">Manage Users</h1>
    <HeaderManageUser />
      <table className="table-fixed border-collapse border border-slate-500">
        <thead>
          <tr className="">
            <th className="border border-slate-600 px-4 py-4">No.</th>
            <th className="border border-slate-600 px-4 py-4">Name</th>
            <th className="border border-slate-600 px-4 py-4">Email</th>
            <th className="border border-slate-600 px-4 py-4">Password</th>
            <th className="border border-slate-600 px-4 py-4">Phone</th>
            <th className="border border-slate-600 px-4 py-4">Address</th>
            <th className="border border-slate-600 px-4 py-4">Age</th>
            <th className="border border-slate-600 px-4 py-4">Premium</th>
            <th className="border border-slate-600 px-4 py-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            AdminCtx.filterUser.map((user,index)=>{
              return(
                <tr key={user.id}>
                  <td className="border border-slate-600 px-4 py-4">{index + 1}</td>
                  <td className="border border-slate-600 px-4 py-4">{user.name}</td>
                  <td className="border border-slate-600 px-4 py-4">{user.email}</td>
                  <td className="border border-slate-600 px-4 py-4">{user.password}</td>
                  <td className="border border-slate-600 px-4 py-4">{user.phone}</td>
                  <td className="border border-slate-600 px-4 py-4">{user.address}</td>
                  <td className="border border-slate-600 px-4 py-4">{user.age}</td>
                  <td className="border border-slate-600 px-4 py-4">{user.premium ? "YES": "NO"}</td>
                  <td className="border border-slate-600 px-4 py-4">
                    <Link to={user.id} className="p-2 bg-orange-500">EDIT</Link>
                  </td>
                </tr>
              )
            })  
          }
        </tbody>
      </table>
    </div>
  );
}

export default ManagerUser;
