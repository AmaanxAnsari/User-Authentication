import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authActions";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("authState"));

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    toast.success("Logout Successful !", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };
  return (
    <div>
      <h1>Hi {storedUser.user.name} Welcome to AccuKnox</h1>
      <button type="submit" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Home;
