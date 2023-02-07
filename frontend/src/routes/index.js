import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

// context
import { AuthContext } from "../context/AuthContext";

// pages
import Login from "../pages/login/Login";
import Home from "../pages/home/Home";
import Single from "../pages/single/Single";

// ------------------------------------------------

function AppRoutes() {
  const { token } = useContext(AuthContext);

  const AuthGuard = ({ children }) => {
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="login" element={<Login />} />
          <Route
            index
            element={
              <AuthGuard>
                <Home />
              </AuthGuard>
            }
          />
          <Route
            path="single"
            element={
              <AuthGuard>
                <Single />
              </AuthGuard>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
