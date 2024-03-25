import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout } from "../../redux/authActions";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("authState"));
    console.log("🚀 ~ useEffect ~ storedUser:", storedUser.user.name);
    if (storedUser) {
      dispatch(loginSuccess(storedUser.user.name));
    }
  }, [dispatch]);

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
      <h1>Hi {user.name} Welcome to AccuKnox</h1>
      <button type="submit" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Home;
