import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// eslint-disable-next-line
import bcrypt from "bcryptjs";
import { loginFailure, loginSuccess } from "../../redux/authActions";
import { toast, Bounce } from "react-toastify";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authState = JSON.parse(localStorage.getItem("authState"));

    const passwordCheck = bcrypt.compareSync(
      formData.password,
      authState.user.password
    );

    if (authState.user.email === formData.email && passwordCheck === true) {
      dispatch(loginSuccess(authState.user));
      navigate("/home");
      toast.success("Login Successful !", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } else if (
      authState.user.email === formData.email &&
      passwordCheck === false
    ) {
      console.log("Invalid Password");
      dispatch(loginFailure());
    } else if (
      authState.user.email !== formData.email &&
      passwordCheck === true
    ) {
      console.log("Invalid Email");
      dispatch(loginFailure());
    } else {
      console.log("Invalid Credentials");
    }

    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div style={{ height: "100vh" }}>
      <section
        className="bg-primary d-flex align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="container">
          <div className="row gy-4 align-items-center">
            <div className="col-12 col-md-6 col-xl-7">
              <div className="d-flex justify-content-center text-bg-primary">
                <div className="col-12 col-xl-9">
                  <img
                    className="img-fluid rounded mb-2"
                    loading="lazy"
                    src="logo-white.png"
                    width="245"
                    height="80"
                    alt="BootstrapBrain Logo"
                  />
                  <hr className="border-primary-subtle mb-4" />
                  <h2 className="h1 mb-4">
                    We make digital products that drive you to stand out.
                  </h2>
                  <p className="lead mb-5">
                    We write words, take photos, make videos, and interact with
                    artificial intelligence.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xl-5">
              <div className="card border-0 rounded-4">
                <div className="card-body p-3 p-md-4 p-xl-5">
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-4">
                        <h3>Log in</h3>
                        <p>
                          Don't have an account?{" "}
                          <Link className="btn btn-primary btn-sm" to="/signup">
                            Sign up
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="row gy-3 overflow-hidden">
                      <div className="col-12">
                        <div className="form-floating mb-2">
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            id="email"
                            placeholder="name@example.com"
                            required
                          />
                          <label htmlFor="email" className="form-label">
                            Email
                          </label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-2">
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            id="password"
                            placeholder="Password"
                            autoComplete="on"
                            required
                          />
                          <label htmlFor="password" className="form-label">
                            Password
                          </label>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="d-grid">
                          <button
                            className="btn btn-primary btn-lg"
                            type="submit"
                          >
                            Log in !
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
