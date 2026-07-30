import { Link } from "react-router-dom";

function BookCard({
    id,
    title,
    author,
    category,
    year,
    image,
    isAvailable,
    isAdmin,
    onDelete
}) {
    return (
        <div className="col-lg-4 col-md-6 mb-4">

            <div className="card h-100 shadow-sm border-0 book-card">

                <img
                    src={image || "/default-book.png"}
                    className="card-img-top book-cover"
                    alt={title}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/default-book.png";
                    }}
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

                    <div className="d-grid gap-2 mt-auto">

                        <Link
                            to={`/books/${id}`}
                            className="btn btn-outline-dark"
                        >
                            View Details
                        </Link>

                        {isAdmin && (
                            <>
                                <Link
                                    to={`/books/edit/${id}`}
                                    className="btn btn-warning"
                                >
                                    Edit Book
                                </Link>

                                <button
                                    className="btn btn-danger"
                                    onClick={() => onDelete(id)}
                                >
                                    Delete Book
                                </button>
                            </>
                        )}

                    </div>

                </div>

            </div>

        </div>
    );
}

export default BookCard;