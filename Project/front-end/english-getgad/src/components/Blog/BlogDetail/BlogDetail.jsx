import { useState, useEffect } from "react";
import {
  useRouteLoaderData,
  useSubmit,
  redirect,
  Link,
} from "react-router-dom";
import { tokenLoader } from "../../../util/auth";

function BlogDetail() {
  const { post } = useRouteLoaderData("page-detail");
  const [dataPost, setDataPost] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const submit = useSubmit();

  useEffect(() => {
    setDataPost(post);
  }, [post]);

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

  const handleDeletePost = async () => {
    const proceed = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (proceed) {
      submit(null, { method: "DELETE" });
    }
  };

  if (!dataPost) {
    return <div>Loading...</div>;
  }

  return (
    <div className="col-span-3">
      <div className="text-5xl font-bold text-center">
        <h1>{dataPost.title}</h1>
      </div>
      <div className="mt-10">
        <img
          src={dataPost.imagePost}
          alt="IMG"
          className="w-full object-cover"
        />
      </div>
      <div className="mt-24 text-xl">
        <p>{dataPost.postText}</p>
      </div>

      {currentUser && currentUser.userID === dataPost.userID && (
        <div className="flex justify-around mt-24">
          <button className="min-w-32 py-4 bg-yellow-500">
            <Link to={`/blog/${dataPost.id}/edit`}>Edit Post</Link>
          </button>
          <button
            className="min-w-32 py-4  bg-yellow-500"
            onClick={handleDeletePost}
          >
            Delete Post
          </button>
        </div>
      )}
    </div>
  );
}

export default BlogDetail;

export async function loader({ params }) {
  const id = params.id;
  const post = await loadPost(id);
  const posts = await loadPosts();
  return { post, posts };
}

async function loadPost(id) {
  const url = `http://localhost:9999/UserPost?id=${id}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data[0];
  } catch (error) {
    return null;
  }
}

async function loadPosts() {
  const response = await fetch("http://localhost:9999/UserPost");
  const data = await response.json();
  return data;
}

export async function action({ params, request }) {
  const id = params.id;
  const response = await fetch(`http://localhost:9999/UserPost/${id}`, {
    method: request.method,
  });

  if (!response.ok) {
    throw new Error("Failed to delete post");
  }

  return redirect("/blog/home");
}
