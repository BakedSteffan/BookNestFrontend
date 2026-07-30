import { Link } from 'react-router-dom';
import '../styles/Hero.css';
import heroImage from "../assets/images/hero-image.jpg";

function Hero() {
    return (
        <section className="hero">

            <div className="container">

                <div className="row align-items-center">

                    {/* Left Side */}
                    <div className="col-lg-6">

                        <span className="hero-badge">
                            <i className="bi bi-book-half me-2"></i>
                            Welcome to BookNest
                        </span>

                        <h1 className="hero-title">
                            Your Digital Library,
                            <br />
                            Simplified.
                        </h1>

                        <p className="hero-description">
                            Discover thousands of books, borrow with ease,
                            and enjoy a modern library experience designed
                            for students and librarians.
                        </p>

                        <Link
                            to="/books"
                            className="btn btn-booknest btn-lg"
                        >
                            Browse Books
                        </Link>

                    </div>

                    {/* Right Side */}

                    <div className="col-lg-6 text-center">

                        <img
                            src={heroImage}
                            alt="BookNest Library"
                            className="img-fluid hero-image"
                        />

                    </div>

                </div>

            </div>

        </section>
    );
}

export default Hero;
