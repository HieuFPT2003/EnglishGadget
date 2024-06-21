import React from 'react';
import PostItem from './PostItem';
function PostList({ posts }) {
    return (
        <div className='ml-10'>{posts.map((post) => PostItem({ post }))}</div>
    );
}

export default PostList;
