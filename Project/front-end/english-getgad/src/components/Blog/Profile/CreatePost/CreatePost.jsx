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

  console.log(data.get("userID"));

  function getCurrentDateTime() {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const date = `${day}/${month}/${year}`;
    const time = `${hours}:${minutes}:${seconds}`;

    return `${date} ${time}`;
  }

  const postData = {
    userID: data.get("userID") ,
    title: data.get("title"),
    imagePost: data.get("image"),
    content: data.get("content"),
    category: data.get("category") * 1,
    datePosted: getCurrentDateTime(),
    like: 0,
  };
  console.log(postData);

  try {
    console.log(postData)
    await axios.post("http://localhost:9999/UserPost", postData);
    return redirect("/blog/profile");

  } catch (error) {
    throw error;
  }
}
