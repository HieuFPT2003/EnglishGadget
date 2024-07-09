import { useState, useEffect} from "react";
import { useRouteLoaderData, useLocation } from "react-router-dom";
import classes from "./PersonalPage.module.css";
import axios from "axios";
function PersonalPage() {
  const token = useRouteLoaderData("root");
  const [user, setUser] = useState({});
  const location = useLocation();
  const [form,setForm] = useState({
    name: "",
    avatar: "",
    email:"",
    phone:"",
    age:"",
    address:"",
    premium:""
  })

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await fetch(
            `http://localhost:9999/Users?token=${token}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const users = await response.json();
          console.log("response", users[0])
          setUser(users[0]);

          setForm({
            userID: users[0].userID,
            password:users[0].password,
            role:users[0].role,
            id:users[0].id,
            name:users[0].name,
            avatar:users[0].avatar,
            email:users[0].email,
            phone:users[0].phone,
            age:users[0].age,
            address:users[0].address,
            premium:users[0].premium,
            token:users[0].token 
          });
        } catch (error) {
          
          console.error("Fetching user failed", error);
        }
      }
    };
    fetchUser();
  }, [location, token]);

  const handleChange = (e) =>{
    if(e.target.age < 0) {
      e.target.age = 0
    }
    setForm({
      ...form,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    await axios.put(
      `http://localhost:9999/Users/${form.id}`,form
    )
    window.location.href = "/blog/profile"
  }

  return (
    <div>
      <form className={classes.form} onSubmit={handleSubmit}>
        <label>
          <p>Name:</p>
          <input type="text" value={form.name || ""} name="name" onChange={handleChange}/>
        </label>
        <label>
          <p>Avatar:</p>

          <input type="url" value={form.avatar || ""} name="avatar" onChange={handleChange}/>
        </label>
        <label>
          <p>Email:</p>

          <input type="text" value={form.email || ""} readOnly name="email"/>
        </label>
        <label>
          <p>Phone:</p>

          <input type="text" value={form.phone || ""} name="phone" onChange={handleChange}/>
        </label>
        <label>
          <p>Address:</p>

          <input type="text" value={form.address || ""}  name="address" onChange={handleChange}/>
        </label>
        <label>
          <p> Age:</p>

          <input type="number" value={form.age || ""} name="age" onChange={handleChange}/>
        </label>
        <label>
          <p>Premium:</p>
          <input type="text" value={form.premium } readOnly name="premium"/>
        </label>
        <button type="submit" className="px-8 py-2 rounded-full bg-amber-400">Save</button>
      </form>
    </div>
  );
}

export default PersonalPage;
