import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';
import MainNavigation from '../components/MainPage/MainNavigation.jsx';
import { getTokenDuration } from '../util/auth.js';
import { useEffect } from 'react';

function RootLayout() {
    const token = useLoaderData();

    const submit = useSubmit();

    useEffect(() => {
        if (!token) {
            return;
        }

        if (token === 'EXPIRED') {
            // Redirect to the logout action
            submit(null, { action: '/logout', method: 'post' });
            return;
        }

        const tokenDuration = getTokenDuration();

        setTimeout(() => {
            // Redirect to the logout action
            submit(null, { action: '/logout', method: 'post' });
        }, tokenDuration);
    }, [token, submit]);

    return (
        <>
            <MainNavigation />
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default RootLayout;
