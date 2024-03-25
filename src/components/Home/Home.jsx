import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authActions";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selector = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    console.log("Logout Sucessfully");
    navigate("/");
  };
  return (
    <div>
      <h1>Hi {selector.user} Welcome to AccuKnox</h1>
      <button type="submit" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Home;
