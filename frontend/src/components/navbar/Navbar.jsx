import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

// import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CreditCardIcon from "@mui/icons-material/CreditCard";

// context
import { AuthContext } from "../../context/AuthContext";

import ProfileEdit from "../../pages/modal/ProfileEdit";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          {/* <div className="item">
            <DarkModeOutlinedIcon className="icon" />
          </div> */}
          <div className="item" onClick={() => navigate("/")}>
            <CreditCardIcon className="icon" /> Home
          </div>
          <div className="item" onClick={() => setOpen(true)}>
            <AccountCircleOutlinedIcon className="icon" /> Profile
          </div>
          <div className="item" onClick={handleLogin}>
            <ExitToAppIcon className="icon" /> Logout
          </div>
        </div>
      </div>
      <ProfileEdit open={open} handleClose={handleClose} />
    </div>
  );
};

export default Navbar;
