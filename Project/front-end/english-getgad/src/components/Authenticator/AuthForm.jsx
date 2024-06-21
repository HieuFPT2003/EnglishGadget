import { useState, useEffect } from "react";
import {
  Form,
  Link,
  useSearchParams,
  useNavigation,
  useActionData,
  useLocation,
} from "react-router-dom";
import classes from "./AuthForm.module.css";

function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmP, setConfirmP] = useState("");
  const [error, setError] = useState(false);

  const data = useActionData();
  const [searchParams] = useSearchParams();
  const navigation = useNavigation();

  const isLogin = searchParams.get("mode") === "login";
  const isSignup = searchParams.get("mode") === "signup";
  const isSubmitting = navigation.state === "submitting";

  const location = useLocation();

  // Clear the form when the URL changes
  useEffect(() => {
    setEmail("");
    setPassword("");
  }, [location]);

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>
          {isLogin ? "Login with English GetGad" : "Create a new account"}
        </h1>
        {data && data.errors && (
          <ul>
            {data.errors.map((err) => (
              <li key={err} className={classes.message__error}>
                {err}
              </li>
            ))}
          </ul>
        )}

        <p>
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </p>

        {isSignup && (
          <>
            <p>
              <label htmlFor="password">Confirm Password</label>
              <input
                type="password"
                className={confirmP !== password ? classes.error : ""}
                id="password"
                name="password"
                value={confirmP}
                onChange={(e) => {
                  setConfirmP(e.target.value);
                }}
                required
              />
            </p>
            <p>
              <label htmlFor="Phone">Phone</label>
              <input
                type="phone"
                id="phone"
                name="phone"
                onChange={(e) => {
                  const containsNonNumeric = /[^0-9]/.test(e.target.value);
                  if (containsNonNumeric) {
                    setError(true);
                  } else {
                    setError(false);
                  }
                }}
                required
              />
            </p>
            <p>
              <label htmlFor="Address">Address</label>
              <input type="text" id="address" name="address" required />
            </p>
            <p>
              <label htmlFor="Account">Name Account</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="Age">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                onChange={(e) => {
                  if (e.target.value <= 0) {
                    setError(true);
                  } else {
                    setError(false);
                  }
                }}
                required
              />
            </p>
          </>
        )}
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "Create new user" : "Login"}
          </Link>
          <button disabled={isSubmitting || error}>
            {isSubmitting ? "Submitting..." : "Save"}
          </button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
