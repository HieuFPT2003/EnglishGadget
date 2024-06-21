import { useEffect, useState } from "react";
import { redirect, Link } from "react-router-dom";
import { tokenLoader } from "../../../util/auth.js";
import classes from "./CheckingNavigation.module.css";

function Logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
  return redirect("/");
}

function CheckingNavigation() {
  const [currentUser, setCurrentUser] = useState([]);

  const fetchUser = async (token) => {
    const response = await fetch(
      `http://localhost:9999/Users?token=${token}`
    );
    const users = await response.json();
    return users;
  
  }

  useEffect(() => {
    const fetchData = async () => {
      const token = tokenLoader();

      if (token === null) {
        return;
      }

      const users = await fetchUser(token);
      setCurrentUser(users[0]);
    };

    fetchData();
  }, []);


  return (
    <nav className={classes.nav}>
      <div className={classes.titlePage}>Checking</div>

      {tokenLoader() !== null && (
        <>
          <div className={classes.navList}>
            <ul className={classes.listBtn}>
              <li>
                <Link to="history">Grammar Checking</Link>
              </li>

              <li>
                <Link to="history">{`/ History `}</Link>
              </li>
              <li>
                <Link to="#">{`/ ${currentUser.name} /`}</Link>
              </li>
              <li>
                <Link onClick={Logout}>Logout</Link>
              </li>
            </ul>
          </div>
        </>
      )}
    </nav>
  );
}

export default CheckingNavigation;
