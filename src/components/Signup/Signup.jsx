import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signupSuccess, signupFailure } from "../../redux/authActions";
import bcrypt from "bcryptjs";
import { Bounce, toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (!/^[a-zA-Z ]+$/.test(formData.name)) {
      newErrors.name = "Name must contain only letters";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (!/^[a-zA-Z0-9!@#$%^&*]{6,}$/.test(formData.password)) {
      newErrors.password =
        "Password must be at least 6 characters long and contain only letters, numbers, or special characters: !@#$%^&*";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const hashedPassword = bcrypt.hashSync(formData.password, 5);
      formData.password = hashedPassword;
      dispatch(signupSuccess(formData));
      localStorage.setItem(
        "authState",
        JSON.stringify({ isAuthenticated: true, user: formData })
      );
      navigate("/");
      toast.success("Registration Successful !", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } else {
      dispatch(signupFailure());
    }
  };

  return (
    <div>
      <section
        className="desktop-only d-flex align-items-center"
        style={{ padding: "2rem", backgroundColor: "var(--background-blue)" }}
      >
        <div className="container">
          <div className="row gy-4 align-items-center">
            <div className="col-12 col-md-6 col-xl-7">
              <div
                className="d-flex justify-content-center "
                style={{ color: "var(--white)" }}
              >
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
                  <h2 className="mb-4">
                    Zero Trust Cloud Native Application Protection Platform
                  </h2>
                  <p className="lead mb-5">
                    AccuKnox provides one of the industry’s most comprehensive
                    and integrated CNAPP solutions which brings together
                    multiple disparate security modules such as AppSec, Cloud
                    security, and Runtime security capabilities [CSPM, ASPM,
                    CIEM, CWPP, KIEM] into a single platform.
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
                            className={`form-control ${
                              errors.name ? "is-invalid" : ""
                            }`}
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
                          {errors.name && (
                            <div className="invalid-feedback">
                              {errors.name}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-2">
                          <input
                            type="email"
                            className={`form-control ${
                              errors.email ? "is-invalid" : ""
                            }`}
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
                          {errors.email && (
                            <div className="invalid-feedback">
                              {errors.email}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="input-group form-floating mb-2">
                          <input
                            type={showPassword ? "text" : "password"}
                            className={`form-control border-end-0 ${
                              errors.password ? "is-invalid" : ""
                            }`}
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
                          <span
                            className="input-group-text bg-white"
                            onClick={() => {
                              setShowPassword(!showPassword);
                            }}
                          >
                            <i>{showPassword ? <FaEyeSlash /> : <FaEye />}</i>
                          </span>

                          {errors.password && (
                            <div className="invalid-feedback">
                              {errors.password}
                            </div>
                          )}
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
