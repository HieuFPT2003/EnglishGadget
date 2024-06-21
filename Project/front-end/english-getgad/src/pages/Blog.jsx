import { useParams } from 'react-router-dom';
import PostList from '../components/Blog/HomeBlog/PostList';
import Pagination from '../components/Blog/Pagination/Pagination';
import { useState, useEffect } from 'react';

function BlogPage() {
    const params = useParams();
    const page = params.page || 1;
    const start = (page - 1) * 5;
    const limit = 5;

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(
                `http://localhost:9999/UserPost?_start=${start}&_limit=${limit}`
            );
            const data = await response.json();
            setPosts(data);
        };
        fetchPosts();
    }, [start]);

    return (
        <div className='col-span-3 mr-8'>
            <PostList posts={posts} />
            <Pagination current={page} />
        </div>
    );
}
export default BlogPage;
