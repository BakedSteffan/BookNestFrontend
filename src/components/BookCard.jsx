import { Link } from "react-router-dom";

function BookCard({
    id,
    title,
    author,
    category,
    year,
    image,
    isAvailable
}) {
    return (
        <div className="col-lg-4 col-md-6 mb-4">

            <div className="card h-100 shadow-sm border-0">

                <img
                    src={image}
                    className="card-img-top"
                    alt={title}
                />

                <div className="card-body d-flex flex-column">

                    <h5 className="fw-bold">
                        {title}
                    </h5>

                    <p className="text-muted mb-2">
                        {author}
                    </p>

                    <p className="mb-1">
                        <strong>Category:</strong> {category}
                    </p>

                    <p className="mb-2">
                        <strong>Published:</strong> {year}
                    </p>

                    <span
                        className={`badge mb-3 ${isAvailable
                                ? "bg-success"
                                : "bg-danger"
                            }`}
                    >
                        {isAvailable ? "Available" : "Borrowed"}
                    </span>

                    <Link
                        to={`/books/${id}`}
                        className="btn btn-outline-dark mt-auto"
                    >
                        View Details
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default BookCard;