import React, { useState } from "react";
import axios from "axios";

function CreateUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    avatar: "",
    password: "",
    phone: "",
    age: "",
    address: "",
    premium: false,
    role: "user",
    token: ""
  });

  const generateToken = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let newToken = "";
    for (let i = 0; i < 32; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      newToken += characters[randomIndex];
    }
    return newToken;
  };

  const handleChange = (e) => {
    if (e.target.name === "age" && e.target.value < 0) {
      e.target.value = 0;
    }
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = generateToken();
    const updatedForm = { ...form, token };
    setForm(updatedForm);

    try {
      await axios.post(`http://localhost:9999/Users`, updatedForm);
      window.location.href = '/admin/users';
    } catch (error) {
      console.error(error);
    }
  };

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
          <p className="justify-start">Age:</p>
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
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </label>
        <label>
          <p className="justify-start">Role:</p>
          <select
            className="w-2/6 text-black"
            value={form.role}
            name="role"
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <label className="mt-7">
          <button type="submit" className="px-8 py-2 rounded-full bg-amber-400">
            Save
          </button>
        </label>
      </form>
    </div>
  );
}

export default CreateUser;
