import { Outlet } from "react-router-dom";
import CheckingNavigation from "../components/Checking/CheckingNav/CheckingNavigation";

function CheckingRoot() {
  return (
    <>
      <CheckingNavigation />
      <Outlet />
    </>
  );
}

export default CheckingRoot;