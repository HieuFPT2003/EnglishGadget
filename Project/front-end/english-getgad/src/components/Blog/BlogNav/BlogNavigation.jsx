import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { tokenLoader } from '../../../util/auth.js';
import classes from './BlogNavigation.module.css';
import { redirect } from 'react-router-dom';

function Logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    return redirect('/');
}

function BlogNavigation() {
    const [currentUser, setCurrentUser] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = tokenLoader();
            const users = await fetchUser(token);
            setCurrentUser(users[0]);
        };

        fetchData();
    }, []);

    const fetchUser = async (token) => {
        const response = await fetch(
            `http://localhost:9999/Users?token=${token}`
        );
        const users = await response.json();
        return users;
    };

    return (
        <nav className={classes.nav}>
            <div className={classes.titlePage}>Blog</div>
            <div className={classes.navList}>
                <ul className={classes.listBtn}>
                    <li>
                        <Link to='home'>Home</Link>
                    </li>
                    <li>
                        <Link to='profile'>{`/ ${currentUser.name}  /`}</Link>
                    </li>
                    <li>
                        <Link onClick={Logout}>Logout</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default BlogNavigation;
