import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AdminContext from "../../store/AdminContext";

function ManagerPosts() {
  const AdminCtx = useContext(AdminContext);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5; // Set the limit to 5 posts per page

  // Calculate the indices for slicing the posts array
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = AdminCtx.posts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(AdminCtx.posts.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="col-span-9">
      <h1 className="text-5xl">Manage Posts</h1>
      <table className="table-fixed border-collapse border border-slate-500">
        <thead>
          <tr className="">
            <th className="border border-slate-600 px-4 py-4">No.</th>
            <th className="border border-slate-600 px-4 py-4">User</th>
            <th className="border border-slate-600 px-4 py-4">Title</th>
            <th className="border border-slate-600 px-4 py-4">Image</th>
            <th className="border border-slate-600 px-4 py-4">Content</th>
            <th className="border border-slate-600 px-4 py-4">Date</th>
            <th className="border border-slate-600 px-4 py-4">Category</th>
            <th className="border border-slate-600 px-4 py-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post, index) => (
            <tr key={post.id}>
              <td className="border border-slate-600 px-4 py-4">{index + 1 + indexOfFirstPost}</td>
              <td className="border border-slate-600 px-4 py-4">{AdminCtx.getUserName(post.userID)}</td>
              <td className="border border-slate-600 px-4 py-4">{post.title}</td>
              <td className="border border-slate-600 px-4 py-4">{post.imagePost}</td>
              <td className="border border-slate-600 px-4 py-4">Click to show detail</td>
              <td className="border border-slate-600 px-4 py-4">{post.datePosted}</td>
              <td className="border border-slate-600 px-4 py-4">{AdminCtx.getNameCategory(post.category)}</td>
              <td className="border border-slate-600 px-4 py-4">
                <Link to={post.id} className="p-2 bg-orange-500">EDIT</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 ${currentPage === index + 1 ? 'bg-amber-600 text-white' : 'bg-gray-300 text-black'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ManagerPosts;
