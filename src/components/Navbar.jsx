import { NavLink, useNavigate } from "react-router-dom";
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

                <NavLink className="navbar-brand" to="/">
                    <i className="bi bi-book-half me-2"></i>
                    BookNest
                </NavLink>

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

                        {token && (
                            <>
                                <li className="nav-item">
                                    <NavLink
                                        to="/"
                                        end
                                        className={({ isActive }) =>
                                            isActive ? "nav-link active" : "nav-link"
                                        }
                                    >
                                        <i className="bi bi-house-door me-1"></i>
                                        Home
                                    </NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink
                                        to="/books"
                                        className={({ isActive }) =>
                                            isActive ? "nav-link active" : "nav-link"
                                        }
                                    >
                                        <i className="bi bi-journal-bookmark me-1"></i>
                                        Books
                                    </NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink
                                        to="/borrow-requests"
                                        className={({ isActive }) =>
                                            isActive ? "nav-link active" : "nav-link"
                                        }
                                    >
                                        <i className="bi bi-clipboard-check me-1"></i>
                                        My Requests
                                    </NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink
                                        to="/borrow-history"
                                        className={({ isActive }) =>
                                            isActive ? "nav-link active" : "nav-link"
                                        }
                                    >
                                        <i className="bi bi-clock-history me-1"></i>
                                        {role === "Admin" ? "Borrow History" : "My History"}
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {role === "Admin" && (
                            <li className="nav-item">
                                <NavLink
                                    to="/admin/borrow-requests"
                                    className={({ isActive }) =>
                                        isActive ? "nav-link active" : "nav-link"
                                    }
                                >
                                    <i className="bi bi-shield-lock me-1"></i>
                                    Admin Requests
                                </NavLink>
                            </li>
                        )}

                    </ul>

                    {token ? (
                        <div className="d-flex align-items-center gap-3">

                            <span className="navbar-username">
                                <i className="bi bi-person-circle me-2"></i>
                                {username}
                            </span>

                            <button
                                className="btn login-btn"
                                onClick={handleLogout}
                            >
                                <i className="bi bi-box-arrow-right me-2"></i>
                                Logout
                            </button>

                        </div>
                    ) : (
                        <div className="d-flex gap-2">

                            <NavLink className="btn login-btn" to="/login">
                                Login
                            </NavLink>

                            <NavLink className="btn btn-outline-light" to="/register">
                                Register
                            </NavLink>

                        </div>
                    )}

                </div>

            </div>

        </nav>
    );
}

export default Navbar;