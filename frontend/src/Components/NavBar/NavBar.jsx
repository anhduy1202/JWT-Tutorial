import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./navbar.css";
import { logOut } from "../../redux/apiRequests";
const NavBar = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const token = user?.accessToken;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    logOut(dispatch,navigate);
  };
  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-home">
        Home
      </Link>
      {user ? (
        <>
          <p className="navbar-user">
            Hi, <span> {user.username} </span>
          </p>
          <button onClick={handleLogout} className="navbar-logout">
            Log out
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="navbar-login">
            Login
          </Link>
          <Link to="/register" className="navbar-register">
            Register
          </Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
