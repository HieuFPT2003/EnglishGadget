import { Outlet } from 'react-router-dom';
import BlogNavigation from '../components/Blog/BlogNav/BlogNavigation';
import BlogLeft from '../components/Blog/BlogNav/BlogLeft';
function BlogRoot() {
    return (
        <>
            <BlogNavigation />
            <div className='container mt-8 mx-20 grid grid-cols-4 gap-4'>
                <BlogLeft />
                <Outlet />
            </div>
        </>
    );
}

export default BlogRoot;
