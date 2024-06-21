import { useState, useEffect } from 'react';
import classes from './PostList.module.css';
import { Link, useLocation } from 'react-router-dom';

function PostList({ userID }) {
    const [posts, setPosts] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                `http://localhost:9999/UserPost?userID=${userID}`
            );
            const data = await response.json();
            setPosts(data);
        };

        fetchData();
    }, [location.pathname, userID]);

    return (
        <div className={classes.postList}>
            {posts.map((post) => {
                return (
                    <Link
                        to={`/blog/${post.id}`}
                        key={post.id}
                        className='mt-10'
                    >
                        <div className='flex'>
                            <img
                                src={post.imagePost}
                                alt='IMG'
                                className='w-40 h-40 object-cover'
                            />
                            <div className='ml-5'>
                                <h1 className='font-bold text-2xl'>
                                    {post.title}
                                </h1>
                                <p>{post.postText}</p>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

export default PostList;
