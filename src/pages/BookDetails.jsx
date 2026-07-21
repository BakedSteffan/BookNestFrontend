import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getBookById } from "../services/bookService";

function BookDetails() {

    const { id } = useParams();

    const [book, setBook] = useState(null);

    useEffect(() => {

        async function fetchBook() {
            try {
                const data = await getBookById(id);
                setBook(data);
            }
            catch (error) {
                console.error(error);
            }
        }

        fetchBook();

    }, [id]);

    if (!book) {
        return (
            <div className="text-center py-5">
                <h3>Loading book...</h3>
            </div>
        );
    }

    return (

        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-lg-10">

                    <div className="card shadow border-0">

                        <div className="row g-0">

                            <div className="col-md-4">

                                <img
                                    src={book.coverImageUrl}
                                    alt={book.title}
                                    className="img-fluid rounded-start h-100"
                                    style={{
                                        objectFit: "cover"
                                    }}
                                />

                            </div>

                            <div className="col-md-8">

                                <div className="card-body p-4">

                                    <h2 className="fw-bold">
                                        {book.title}
                                    </h2>

                                    <h5 className="text-muted mb-4">
                                        {book.author}
                                    </h5>

                                    <p>
                                        <strong>Category:</strong> {book.category}
                                    </p>

                                    <p>
                                        <strong>Publication Year:</strong> {book.publicationYear}
                                    </p>

                                    <p>
                                        <strong>ISBN:</strong> {book.isbn}
                                    </p>

                                    <p>
                                        <strong>Status:</strong>{" "}
                                        <span
                                            className={`badge ${book.isAvailable
                                                    ? "bg-success"
                                                    : "bg-danger"
                                                }`}
                                        >
                                            {book.isAvailable
                                                ? "Available"
                                                : "Borrowed"}
                                        </span>
                                    </p>

                                    <div className="d-flex gap-3 mt-4">

                                        <Link
                                            to={`/borrow/${book.id}`}
                                            className={`btn ${book.isAvailable ? "btn-success" : "btn-secondary disabled"}`}
                                            aria-disabled={!book.isAvailable}
                                        >
                                            Borrow Book
                                        </Link>

                                        <Link
                                            to="/books"
                                            className="btn btn-outline-secondary"
                                        >
                                            Back to Books
                                        </Link>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default BookDetails;