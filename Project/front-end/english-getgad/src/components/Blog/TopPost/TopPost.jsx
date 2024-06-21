import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classes from './TopPost.module.css';
import formatDate from '../../../util/formatDate';

function TopPost() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(
                'http://localhost:9999/UserPost?_sort=likeCount'
            );
            const data = await response.json();
            if (data.length > 5) {
                setData(data.slice(-5));
            }
        };

        fetchPost();
    }, []);

    return (
        <div className={classes.topPostList}>
            {data.map((post, index) => {
                const data = formatDate(post.datePosted);
                return (
                    <Link
                        key={post.id}
                        className={classes.topPostItem}
                        to={`${post.id}`}
                    >
                        <div className={classes.index}>{index + 1}</div>
                        <div className={classes.body}>
                            <div className={classes.title}>{post.title}</div>
                            <div className={classes.date}>{data}</div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

export default TopPost;
