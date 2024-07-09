import { useState, useEffect } from "react";
import { tokenLoader } from "../../../util/auth.js";
import classes from "./Profile.module.css";
import { Link } from "react-router-dom";
import PostList from "../PostList/PostList.jsx";

function Profile() {
  const [currentUser, setCurrentUser] = useState([]);

  const fetchUser = async (token) => {
    const response = await fetch(`http://localhost:9999/Users?token=${token}`);
    const users = await response.json();
    return users;
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = tokenLoader();
      const users = await fetchUser(token);
      setCurrentUser(users[0]);
    };

    fetchData();
  }, []);
  
  console.log(currentUser); 
  return (
    <div className="col-span-3">
      <div>
        <div className={classes.user}>
          <div className="flex gap-5">
            <img
              className="w-20 h-20 rounded-full ml-5"
              src={currentUser.avatar}
              alt=""
            />

            <div>
              <h1 className="font-bold text-2xl">{currentUser.name}</h1>
              <h4 className="text-orange-400">{currentUser.email}</h4>
            </div>
          </div>

          <div>
            <Link to={"/blog/profile/create"} className={classes.createBtn}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Create Post
            </Link>
          </div>
        </div>
        <PostList userID={currentUser.id} />
      </div>
    </div>
  );
}

export default Profile;
