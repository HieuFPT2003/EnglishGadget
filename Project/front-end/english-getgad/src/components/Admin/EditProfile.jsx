import React, { useState, useEffect } from "react";
import {useParams } from "react-router-dom";
import axios from "axios";

function EditProfile() {
  const [currentUser, setCurrentUser] = useState({});
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    address: "",
    premium: "",
  });
  const handleChange = (e) => {
    if (e.target.age < 0) {
      e.target.age = 0;
    }
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`http://localhost:9999/Users/${id}`);
      const user = await response.json();
      setCurrentUser(user);
      setForm({
        id:user.id,
        avatar:user.avatar,
        name: user.name,
        email: user.email,
        password: user.password,
        phone: user.phone,
        address: user.address,
        age: user.age,
        role:user.role,
        premium: user.premium,
      });
    };

    fetchUser();
  }, [id]);

const handleSubmit = async (e) => {
    e.preventDefault();

    const changeProfile = async () => {
        const confirm = window.confirm("Do you want to change the information of this user?");
        if (confirm) {
            try {
                await axios.put(`http://localhost:9999/Users/${id}`, form);
                window.location.href = '/admin/users';
            } catch (error) {
                console.error(error);
                // Handle the error here
            }
        }
    };
    changeProfile();
};

  const handleDelete = () =>{
    const deleteUser = async () => {
        const confirm = window.confirm("Do you want delete this user?");
        if (confirm) {
            try {
                await axios.delete(`http://localhost:9999/Users/${id}`, form);
                window.location.href = '/admin/users';
            } catch (error) {
                console.error(error);
                // Handle the error here
            }
        }
    }
    deleteUser();
  }
  

  return (
    <div className="col-span-9 text-center">
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label>
          <p className="justify-start">Name:</p>
          <input
            type="text"
            value={form.name || ""}
            name="name"
            className="w-2/6 p-2 text-black"
            onChange={handleChange}
          />
        </label>
        <label>
          <p className="justify-start">Email:</p>
          <input
            className="w-2/6 p-2 text-black"
            type="text"
            value={form.email || ""}
            name="email"
            onChange={handleChange}
          />
        </label>
        <label>
          <p className="justify-start">Password:</p>
          <input
            className="w-2/6 p-2 text-black"
            type="text"
            value={form.password || ""}
            name="password"
            onChange={handleChange}
          />
        </label>
        <label>
          <p className="justify-start">Phone:</p>
          <input
            className="w-2/6 p-2 text-black"
            type="text"
            value={form.phone || ""}
            name="phone"
            onChange={handleChange}
          />
        </label>
        <label>
          <p className="justify-start">Address:</p>
          <input
            className="w-2/6 p-2 text-black"
            type="text"
            value={form.address || ""}
            name="address"
            onChange={handleChange}
          />
        </label>
        <label>
          <p className="justify-start"> Age:</p>
          <input
            className="w-2/6 p-2 text-black"
            type="number"
            value={form.age || ""}
            name="age"
            onChange={handleChange}
          />
        </label>
        <label>
          <p className="justify-start">Premium:</p>
          <select
            className="w-2/6 text-black"
            value={form.premium}
            name="premium"
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>
        <label className="mt-7">
          <button onClick={ handleDelete} className="px-8 mr-8 py-2 rounded-full bg-amber-400">
            Delete
          </button>
          <button type="submit" className="px-8 py-2 rounded-full bg-amber-400">
            Save
          </button>
        </label>
      </form>
    </div>
  );
}

export default EditProfile;
