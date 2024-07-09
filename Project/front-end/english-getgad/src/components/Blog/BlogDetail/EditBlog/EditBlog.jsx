import { useState } from "react";
import { useRouteLoaderData, Form, useNavigation,useNavigate } from "react-router-dom";
import classes from "./EditBlog.module.css";
import getCurrentDateTime from "../../../../util/currentTime";
import axios from "axios";

function EditBlog() {
  const { post } = useRouteLoaderData("page-detail");
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = navigation.state === "submitting";

  const [form, setForm] = useState({
    userID: post.userID,
    likeCount: post.likeCount,
    title: post.title,
    imagePost: post.imagePost,
    content: post.content,
    category: post.category * 1,
    datePosted: getCurrentDateTime(),
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "http://localhost:9999/UserPost/" + post.id;

    try {
      const response = await axios.put(url, form);
      if (response.status === 200) {
        console.log("Data updated successfully:", response.data);
        navigate("/blog/profile");
      }
    } catch (error) {
      console.log("Data  updated error:", error);
    }
  };

  return (
    <div className="col-span-3">
      <Form  method="post" className={classes.form}>
        <p>
          <input name="userID" type="hidden" value={post.userID} readOnly />
        </p>

        <p>
          <input name="id" type="hidden" value={post.postID} readOnly />
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
            value={form.imagePost}
            onChange={handleChange}
            required
          />
        </p>

        <p>
          <label htmlFor="Title">Content</label>
          <textarea
            name="content"
            type="text"
            placeholder="Enter Content of the post"
            value={form.content}
            onChange={handleChange}
            required
            rows={10}
          ></textarea>
        </p>

        <div className={classes.dateCategory}>
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

          <p>
            <label htmlFor="Date">Date:</label>
            <span className={classes.date}>{post.datePosted}</span>
          </p>
        </div>

        <div className={classes.actions}>
          <button onClick={handleSubmit} disabled={isSubmitting}>
            Save
          </button>
        </div>
      </Form>
    </div>
  );
}

export default EditBlog;
