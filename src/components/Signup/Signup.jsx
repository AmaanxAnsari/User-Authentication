import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../redux/authActions";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(formData, navigate));
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };
  return (
    <div>
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
                        <h3>Sign Up</h3>
                        <p>
                          Already have an account?{" "}
                          <Link className="btn btn-primary btn-sm" to="/">
                            Log in!
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
                            type="text"
                            className="form-control"
                            name="name"
                            value={formData.name}
                            id="name"
                            placeholder="Enter full name"
                            onChange={handleInputChange}
                            required
                          />
                          <label htmlFor="name" className="form-label">
                            Name
                          </label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-2">
                          <input
                            type="email"
                            className="form-control"
                            value={formData.email}
                            name="email"
                            id="email"
                            placeholder="name@example.com"
                            onChange={handleInputChange}
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
                            value={formData.password}
                            name="password"
                            id="password"
                            placeholder="Password"
                            onChange={handleInputChange}
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
                            Sign Up!
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

export default Signup;
