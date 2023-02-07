import { useContext, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

// context
import { AuthContext } from "../../context/AuthContext";

import SnackBar from "../../components/snackbar";

const Login = () => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navitage = useNavigate();

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (!username || !password)
        throw new Error("Username and Password is required");

      // Signed in
      const user = { username, password };
      await login(user);
      navitage("/");
    } catch (error) {
      setError(true);
      setMessage(error.message);
    }
  };

  return (
    <>
      {error && <SnackBar open={error} severity="error" message={message} />}
      <div className="login">
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            autoFocus={true}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          {error && <span className="error">Wrong Username or Password!</span>}
        </form>
      </div>
    </>
  );
};

export default Login;
