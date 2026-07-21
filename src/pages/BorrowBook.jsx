import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookById } from "../services/bookService";
import { createBorrowRequest } from "../services/borrowService";

function BorrowBook() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [book, setBook] = useState(null);
    const [expectedReturnDate, setExpectedReturnDate] = useState("");

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

    const handleBorrow = async () => {

        try {

            await createBorrowRequest({

                bookId: book.id,

                expectedReturnDate: expectedReturnDate

            });

            alert("Borrow request submitted successfully!");

            navigate("/borrow-requests");

        }
        catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ??
                "Failed to submit borrow request."
            );

        }

    };

    if (!book) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="container my-5">

            <div className="row">

                <div className="col-md-4">

                    <img
                        src={book.coverImageUrl}
                        alt={book.title}
                        className="img-fluid rounded shadow"
                    />

                </div>

                <div className="col-md-8">

                    <h2>{book.title}</h2>

                    <p>
                        <strong>Author:</strong> {book.author}
                    </p>

                    <p>
                        <strong>Category:</strong> {book.category}
                    </p>

                    <p>
                        <strong>Published:</strong> {book.publicationYear}
                    </p>

                    <p>
                        <strong>Status:</strong>{" "}
                        {book.isAvailable ? "Available" : "Unavailable"}
                    </p>

                    <div className="mt-4">

                        <label className="form-label">
                            Expected Return Date
                        </label>

                        <input
                            type="date"
                            className="form-control"
                            value={expectedReturnDate}
                            onChange={(e) => setExpectedReturnDate(e.target.value)}
                        />

                    </div>

                    <button
                        className="btn btn-success mt-4"
                        onClick={handleBorrow}
                        disabled={!expectedReturnDate}
                    >
                        Submit Borrow Request
                    </button>

                </div>

            </div>

        </div>
    );
}

export default BorrowBook;