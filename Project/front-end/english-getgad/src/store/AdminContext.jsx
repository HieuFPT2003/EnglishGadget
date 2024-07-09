import { createContext, useEffect, useState } from "react";
import { tokenLoader } from "../util/auth";
import axios from "axios";

const AdminContext = createContext({});

export function AdminContextProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterUser, setFilterUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          "http://localhost:9999/Users?role=user"
        );
        setUsers(response.data);
        setFilterUser(response.data);
      } catch (error) {
        setError(error);
      }

      setLoading(false);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get("http://localhost:9999/UserPost");
        setPosts(response.data);
      } catch (error) {
        setError(error);
      }

      setLoading(false);
    };

    fetchPosts();
  },[]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get("http://localhost:9999/Category");
        setCategories(response.data);
      } catch (error) {
        setError(error);
      }

      setLoading(false);
    };

    fetchPosts();
  },[]);

  const updatePost = async (id, formData) => {
    await axios.put(`http://localhost:9999/UserPost/${id}`, formData);
    
    const fetchPosts = async () => { 
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:9999/UserPost");
        setPosts(response.data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    } 
    fetchPosts();
  }

  const handleSearch = (name) => {
    const data = users.filter((user) => {
      return user.name.toLowerCase().includes(name.toLowerCase());
    });
    setFilterUser(data);
    console.log(data);
  };

  const getUserName = (id) => {
    const user = users.find((user) => user.id === id);
    return user ? user.name : null;
  };

  const getNameCategory = (id) => {
    const category = categories.find((category) => category.id === id);
    return category ? category.name : null;
  };

  
  const value = {
    users,
    loading,
    error,
    handleSearch,
    filterUser,
    posts,
    getUserName,
    getNameCategory,
    categories,
    updatePost
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}

export default AdminContext;
