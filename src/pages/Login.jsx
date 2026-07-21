import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../services/authService";

function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await login(form);

            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.username);
            localStorage.setItem("role", data.role);

            alert("Login successful!");

            navigate("/");
        }
        catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ??
                "Login failed."
            );
        }
    };

    return (
        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-lg-5 col-md-7">

                    <div className="card shadow border-0 rounded-4">

                        <div className="card-body p-5">

                            <div className="text-center mb-4">

                                <i
                                    className="bi bi-book-half"
                                    style={{
                                        fontSize: "3rem",
                                        color: "#5C3D2E"
                                    }}
                                ></i>

                                <h2
                                    className="mt-3 fw-bold"
                                    style={{ color: "#5C3D2E" }}
                                >
                                    Welcome Back
                                </h2>

                                <p className="text-muted">
                                    Sign in to continue to BookNest
                                </p>

                            </div>

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        required
                                    />

                                </div>

                                <div className="mb-4">

                                    <label className="form-label">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
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
                                    Login
                                </button>

                            </form>

                            <hr className="my-4" />

                            <div className="text-center">

                                <span className="text-muted">
                                    Don't have an account?
                                </span>

                                <br />

                                <Link
                                    to="/register"
                                    className="text-decoration-none fw-semibold"
                                    style={{ color: "#8B5E3C" }}
                                >
                                    Create an Account
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;
