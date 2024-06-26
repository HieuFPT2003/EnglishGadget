import { useEffect, useState } from "react";
import { redirect, Link,useLoaderData } from "react-router-dom";
import { tokenLoader,checkPremiumAccount } from "../../../util/auth.js";
import classes from "./CheckingNavigation.module.css";


function CheckingNavigation() {
  const [currentUser, setCurrentUser] = useState([]);
  const premium = useLoaderData();

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
      {!premium &&  <Link to="/premium" className={classes.premiumBtn}>Premium to copy</Link>}
      {tokenLoader() !== null && (
        <>
          <div className={classes.navList}>
            <ul className={classes.listBtn}>
              <li>
                <Link to="grammar">Grammar Checking</Link>
              </li>
              <li>
                <Link to="/personal">{`/ ${currentUser.name}`}</Link>
              </li>
            </ul>
          </div>
        </>
      )}
    </nav>
  );
}

export default CheckingNavigation;
