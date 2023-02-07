import { useState } from "react";
import "./login.css";

const LoginForm = ({ login }) => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!username || !password)
        throw new Error("Username and Password is required");
      // Signed in
      await login({ username, password });
    } catch (error) {
      setError(true);
      setMessage(error.message);
    }
  };

  return (
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
        {error && <span className="error">{message}</span>}
      </form>
    </div>
  );
};

export default LoginForm;
