import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classes from './Pagination.module.css';
function Pagination({ current }) {
    const [page, setPage] = useState([]);
    useEffect(() => {
        const fetchPage = async () => {
            try {
                const response = await fetch('http://localhost:9999/UserPost');
                const data = await response.json();
                if (data.length % 5 === 0) {
                    setPage(data.length / 5);
                } else {
                    setPage(data.length / 5 + 1);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchPage();
    }, []);
    return (
        <div className={classes.pagination}>
            {Array.from({ length: page }, (_, i) => i + 1).map((item) => (
                <Link
                    key={item}
                    to={`/blog/page/${item}`}
                    className={
                        current * 1 === item
                            ? `${classes.active} ${classes.pageItem}`
                            : `${classes.pageItem}`
                    }
                >
                    {item}
                </Link>
            ))}
        </div>
    );
}

export default Pagination;
