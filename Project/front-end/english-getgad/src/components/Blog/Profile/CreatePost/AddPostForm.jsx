import { useState, useEffect } from "react";
import { Form, useNavigation } from "react-router-dom";
import classes from "./AddPostForm.module.css";
import { tokenLoader } from "../../../../util/auth";
import axios from "axios";

function AddPostForm() {
  const navigation = useNavigation();
  const [currentUser, setCurrentUser] = useState([]);
  const isSubmitting = navigation.state === "submitting";

  // Fetch user
  useEffect(() => {
    const fetchData = async () => {
      const token = tokenLoader();
      const response = await fetch(
        `http://localhost:9999/Users?token=${token}`
      );
      const users = await response.json();

      setCurrentUser(users[0]);
      
    };

    fetchData();
  }, []);


  const [form, setForm] = useState({
    id:currentUser.id,
    title: "",
    image: "",
    content: "",
    category: "",
  });

  // Handle change input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  console.log("Post ID:", currentUser.id);

  return (
    <Form method="post" className={classes.form}>
      <p>
        <input
          name="userID"
          type="hidden"
          value={currentUser.id}
        />
      </p>

      <p>
        <label htmlFor="Title">Title</label>
        <input
          name="title"
          type="text"
          placeholder="Enter Title"
          value={form.title}
          onChange={handleChange}
          required
        />
      </p>

      <p>
        <label htmlFor="Title">Image</label>
        <input
          name="image"
          type="url"
          placeholder="Enter URL image"
          value={form.image}
          onChange={handleChange}
          required
        />
      </p>

      <p>
        <label htmlFor="Title">Content</label>
        <input
          name="content"
          type="text"
          placeholder="Enter Content of the post"
          value={form.content}
          onChange={handleChange}
          required
        />
      </p>

      <p>
        <label htmlFor="category">Category</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select a category
          </option>
          <option value="1">Technology</option>
          <option value="2">Science</option>
          <option value="3">Art</option>
          <option value="4">History</option>
          <option value="5">Sports</option>
        </select>
      </p>

      <div className={classes.actions}>
        <button disabled={isSubmitting}>Save</button>
      </div>
    </Form>
  );
}

export default AddPostForm;
