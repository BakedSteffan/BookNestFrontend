import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../services/authService";

function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Client-side validation: Prevents short passwords from hitting the API early
        if (form.password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            await register({
                username: form.username,
                email: form.email,
                password: form.password
            });

            alert("Registration successful!");

            navigate("/login");
        }
        catch (error) {
            console.error(error);

            // Extracts ASP.NET Core automatic ModelState validation errors
            const validationErrors = error.response?.data?.errors;
            let errorMessage;

            if (validationErrors) {
                const firstKey = Object.keys(validationErrors)[0];
                errorMessage = validationErrors[firstKey][0];
            } else {
                errorMessage = error.response?.data?.message || "Registration failed.";
            }

            alert(errorMessage);
        }
    };

    return (
        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-lg-6 col-md-8">

                    <div className="card shadow border-0 rounded-4">

                        <div className="card-body p-5">

                            <div className="text-center mb-4">

                                <i
                                    className="bi bi-person-plus-fill"
                                    style={{
                                        fontSize: "3rem",
                                        color: "#5C3D2E"
                                    }}
                                ></i>

                                <h2
                                    className="fw-bold mt-3"
                                    style={{ color: "#5C3D2E" }}
                                >
                                    Create Your Account
                                </h2>

                                <p className="text-muted">
                                    Join BookNest and start borrowing books.
                                </p>

                            </div>

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Username
                                    </label>

                                    <input
                                        type="text"
                                        name="username"
                                        className="form-control"
                                        placeholder="Enter your username"
                                        value={form.username}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Enter your email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Enter password"
                                        value={form.password}
                                        onChange={handleChange}
                                        minLength={6}
                                        required
                                    />
                                    {/* FEATURE ADDITION: Visible helper text below input informing new users of the rule before submitting */}
                                    <div className="form-text text-muted mt-1">
                                        <i className="bi bi-info-circle me-1"></i>
                                        Password must be at least 6 characters long.
                                    </div>

                                </div>

                                <div className="mb-4">

                                    <label className="form-label">
                                        Confirm Password
                                    </label>

                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        className="form-control"
                                        placeholder="Confirm your password"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                        minLength={6} /* FEATURE ADDITION: prevents submitting input under 6 characters 
                                        required
                                    />

                                </div>

                                <button
                                    type="submit"
                                    className="btn w-100"
                                    style={{
                                        backgroundColor: "#5C3D2E",
                                        color: "white"
                                    }}
                                >
                                    Create Account
                                </button>

                            </form>

                            <hr className="my-4" />

                            <div className="text-center">

                                <span className="text-muted">
                                    Already have an account?
                                </span>

                                <br />

                                <Link
                                    to="/login"
                                    className="text-decoration-none fw-semibold"
                                    style={{ color: "#8B5E3C" }}
                                >
                                    Login Here
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Register;