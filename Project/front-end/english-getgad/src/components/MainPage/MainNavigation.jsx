import { NavLink, useRouteLoaderData, Form } from "react-router-dom";
import { checkPremiumAccount,fetchUserRole  } from "../../util/auth";
import classes from "./MainNavigation.module.css";
import { useEffect, useState } from "react";
function MainNavigation() {
    const token = useRouteLoaderData("root");
    const [premium, setPremium] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
  
    useEffect(() => {
      async function checkPremium() {
        const premiumStatus = await checkPremiumAccount();
        setPremium(premiumStatus);
      }
  
      async function checkAdmin() {
        if (token) {
          const role = await fetchUserRole(token);
         
          setIsAdmin(role === 'admin');
        }
      }
  
      checkPremium();
      checkAdmin();
    }, [token]);


  return (
    <header className={classes.header}>
      <nav className="flex justify-between mx-3">
        <div>
          <ul className={classes.list}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                end
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/checking"
                className={({ isActive }) => {
                  return isActive ? classes.active : undefined;
                }}
              >
                Checking
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blog"
                className={({ isActive }) => {
                  return isActive ? classes.active : undefined;
                }}
              >
                BLOG
              </NavLink>
            </li>
          </ul>
        </div>
        <div>
          <ul className={classes.list}>
            {!premium && (
              <li>
                <NavLink
                  to="/premium"
                  className={({ isActive }) => {
                    return isActive ? classes.active : undefined;
                  }}
                >
                  Premium
                </NavLink>
              </li>
            )}
            {isAdmin && (
              <NavLink
                to="/admin"
                className={({ isActive }) => {
                  return isActive ? classes.active : undefined;
                }}
              >
                Admin
              </NavLink>
            )}

            {!token && (
              <li>
                <NavLink
                  to="/auth?mode=login"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Login
                </NavLink>
              </li>
            )}
            {token && (
              <li>
                <li>
                  <Form action="/logout" method="post">
                    <button>Logout</button>
                  </Form>
                </li>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default MainNavigation;
