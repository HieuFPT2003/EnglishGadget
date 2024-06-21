import React from 'react';
import { Link } from 'react-router-dom';
import classes from './PostItem.module.css';
function PostItem({ post }) {
    return (
        <Link
            to={`/blog/${post.id}`}
            key={post.id}
            className={classes.postItem}
        >
            <img
                src={post.imagePost}
                alt='img'
                className={classes.img}
            />
            <p className={classes.content}>{post.postText}</p>
        </Link>
    );
}

export default PostItem;
