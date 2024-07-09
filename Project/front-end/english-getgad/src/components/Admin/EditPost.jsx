import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminContext from "../../store/AdminContext";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const AdminCtx = useContext(AdminContext);

  // Get the post data from the AdminContext
  const post = AdminCtx.posts.find((p) => p.id === id);

  console.log(post);
  // State to hold the form data
  const [formData, setFormData] = useState({
    id: post.id,
    title: post.title,
    userID: post.userID,
    imagePost: post.imagePost,
    content: post.content,
    category: post.category,
    datePosted: post.datePosted,
  });

  const handleInputChange = (e) => {
    if (e.target.name === "category") {
      setFormData({ ...formData, [e.target.name]: e.target.value * 1 });
      return;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update the post data in the AdminContext
    AdminCtx.updatePost(id, formData);
    // Navigate back to the ManagerPosts component
    navigate("/admin/posts");
  };

  return (
    <div className="col-span-9">
      <h1 className="text-5xl">Edit Post</h1>
      <form onSubmit={handleSubmit} className="mt-8">
        <div className="mb-4">
          <label htmlFor="title" className="block font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="border border-gray-400 p-2 w-full text-gray-900"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="imagePost" className="block font-bold mb-2">
            Image
          </label>
          <input
            type="text"
            id="imagePost"
            name="imagePost"
            value={formData.imagePost}
            onChange={handleInputChange}
            className="border border-gray-400 p-2 w-full text-gray-900"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block font-bold mb-2">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            className="border border-gray-400 p-2 h-40 w-full text-gray-900"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block font-bold mb-2">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category * 1}
            onChange={handleInputChange}
            className="border border-gray-400 p-2 w-full text-gray-900"
          >
            {AdminCtx.categories.map((category) => (
              <option key={category.id} value={category.id * 1}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditPost;
