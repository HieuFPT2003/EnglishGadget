import AddPostForm from "./AddPostForm";
import axios from "axios";
import { redirect } from "react-router-dom";

function CreatePost() {
  return (
    <div className="col-span-3">
      <AddPostForm />
    </div>
  );
}

export default CreatePost;

export async function action({ request }) {
  const data = await request.formData();

  function getCurrentDateTime() {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Tháng trong JavaScript bắt đầu từ 0
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const date = `${day}/${month}/${year}`;
    const time = `${hours}:${minutes}:${seconds}`;

    return `${date} ${time}`;
  }

  const postData = {
    id: data.get("id"),
    userID: data.get("userID"),
    title: data.get("title"),
    imagePost: data.get("image"),
    postText: data.get("content"),
    categoryID: data.get("category") * 1,
    datePosted: getCurrentDateTime(),
    like: 0,
  };

  console.log("Post Data:", postData);

  try {
    const response = await axios.post("http://localhost:9999/UserPost", postData);
    console.log("Post created successfully:", response.data);
    return redirect("/blog/profile");

  } catch (error) {
    console.error("Error creating post:", error.response ? error.response.data : error.message);
    throw error;
  }
}
