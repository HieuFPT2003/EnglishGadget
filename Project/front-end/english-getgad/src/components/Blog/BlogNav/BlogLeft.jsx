import React from 'react';
import { Form } from 'react-router-dom';
import classes from './BlogLeft.module.css';
import CategoryList from '../Category/CategoryList';
import TopPost from '../TopPost/TopPost';
import Instagram from '../Instagram/Instagram';
function BlogLeft() {
    return (
        <div className={classes.leftNav}>
            <div>
                <Form className={classes.formSearch}>
                    <input
                        type='text'
                        name='search'
                        id='search'
                        className={classes.searchInput}
                        placeholder='Search...'
                    />
                    <button className={classes.btnSearch}>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            fill='currentColor'
                            className='size-6 text-orange-200'
                        >
                            <path
                                fillRule='evenodd'
                                d='M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z'
                                clipRule='evenodd'
                            />
                        </svg>
                    </button>
                </Form>
            </div>
            <div className={classes.titleSub}>
                <h3 className={`${classes.navHeader} `}>Categories</h3>
                <CategoryList />
            </div>
            <div className={classes.titleSub}>
                <h3 className={classes.navHeader}>Top Posts</h3>
                <TopPost />
            </div>
            <div className=''>
                <h4 className={classes.navHeaderBack}>Instagram</h4>
                <Instagram />
            </div>
        </div>
    );
}

export default BlogLeft;
