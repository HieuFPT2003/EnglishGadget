import { json, redirect } from 'react-router-dom';
import AuthForm from '../components/Authenticator/AuthForm';

function Authentication() {
    return <AuthForm />;
}
export default Authentication;

export async function action({ request }) {
    // const [listAdmin, setListAdmin] = useState([]);
    // Get the search parameters from the URL
    const searchParams = new URL(request.url).searchParams;

    // Get the mode parameter from the URL if it exists, otherwise default to 'login'
    const mode = searchParams.get('mode') || 'login';

    if (mode !== 'login' && mode !== 'signup') {
        throw json({ message: 'Invalid mode parameter', status: 400 });
    }

    if (mode === 'login') {
        const data = await request.formData();
        const authData = {
            email: data.get('email'),
            password: data.get('password'),
        };

        const response = await fetch(
            `http://localhost:9999/Users?email=${authData.email}&password=${authData.password}`
        );

        const users = await response.json();

        const currentUser = users.find((user) => {
            return (
                user.email === authData.email &&
                user.password === authData.password
            );
        });
        // If the user is not found, return an error

        if (currentUser) {
            localStorage.setItem('token', currentUser.token);
            const expiration = new Date();

            // Set the expiration time to 1 hour from now
            expiration.setHours(expiration.getHours() + 1);
            localStorage.setItem('expiration', expiration.toISOString());
            return redirect('/');
        } else {
            return { errors: ['Could not authenticate user.'] };
        }
    } else if (mode === 'signup') {

        const res = await fetch('http://localhost:9999/Users');
        const users = await res.json();
        const token = `yJhbGciOi IUzI1NiIsInR5cCI6IkpXVCJ9${users.length + 1}`;
        const data = await request.formData();
        const authData = {
            userID: users.length + 1,
            email: data.get('email'),
            password: data.get('password'),
            phone: data.get('phone'),
            address: data.get('address'),
            name: data.get('name'),
            age: data.get('age'),
            role: 0,
            token: token,
        };
        
        const fetchEmail = await fetch(
            `http://localhost:9999/Users?email=${authData.email}`
        );

        if (fetchEmail.ok) {
            return { errors: ['Email already exists.'] };
        }

        const response = await fetch('http://localhost:9999/Users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(authData),
        });

        if (response.ok) {
            return redirect('/auth?mode=login');
        } else {
            return { errors: ['Could not create user.'] };
        }
    }
}
