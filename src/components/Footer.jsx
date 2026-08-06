import { Link } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
    return (
        <footer className="footer-booknest">

            <div className="container text-center">

                <div className="footer-brand">
                    <i className="bi bi-book-half me-2"></i>
                    BookNest
                </div>

                <p className="footer-tagline mb-3">
                    Your digital library management system.
                </p>

                <div className="footer-links mb-3">

                    <Link to="/">Home</Link>

                    <span>•</span>

                    <Link to="/books">Books</Link>

                    <span>•</span>

                    <Link to="/borrow-requests">My Requests</Link>

                </div>

                <small className="footer-copy">
                     2026 BookNest. All rights reserved.
                </small>

            </div>

        </footer>
    );
}

export default Footer;