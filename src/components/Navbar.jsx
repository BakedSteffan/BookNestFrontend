import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {

    const navigate = useNavigate();

    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");

        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-booknest">

            <div className="container">

                <Link className="navbar-brand" to="/">
                    <i className="bi bi-book-half me-2"></i>
                    BookNest
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">

                    <ul className="navbar-nav me-auto">

                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/books">
                                Books
                            </Link>
                        </li>

                        {token && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/borrow-requests">
                                    My Requests
                                </Link>
                            </li>
                        )}

                        {role === "Admin" && (
                            <>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link"
                                        to="/admin/borrow-requests"
                                    >
                                        Admin Requests
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link
                                        className="nav-link"
                                        to="/borrow-history"
                                    >
                                        Borrow History
                                    </Link>
                                </li>
                            </>
                        )}

                    </ul>

                    {token ? (
                        <div className="d-flex align-items-center gap-3">

                            <span className="navbar-username fw-semibold">
                                Hello, {username}
                            </span>

                            <button
                                className="btn login-btn"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>

                        </div>
                    ) : (
                        <Link className="btn login-btn" to="/login">
                            Login
                        </Link>
                    )}

                </div>

            </div>

        </nav>
    );
}

export default Navbar;