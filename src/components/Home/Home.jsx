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
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };
  return (
    <div>
      <section
        className="desktop-only d-flex align-items-center justify-content-center"
        style={{ padding: "2rem", backgroundColor: "var(--background-blue)" }}
      >
        <div style={{ color: "var(--white)" }}>
          <div className="d-flex ">
            <h1 className="display-3 text-center ">
              Hi {storedUser.user.name} welcome to
              <span>
                <img src="logo-white.png" alt="AccuKnox" className="h-75" />
              </span>
            </h1>
          </div>

          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              onClick={handleLogout}
            >
              Logout !
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
