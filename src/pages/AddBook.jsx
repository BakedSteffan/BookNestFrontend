import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createBook } from "../services/bookService";

function AddBook() {

    const navigate = useNavigate();

    const [book, setBook] = useState({
        title: "",
        author: "",
        isbn: "",
        category: "",
        publicationYear: "",
        coverImageUrl: ""
    });

    function handleChange(e) {
        setBook({
            ...book,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await createBook(book);

            alert("Book added successfully!");

            navigate("/books");
        }
        catch (error) {
            console.error(error);
            alert(error.response?.data || "Failed to add book.");
        }
    }

    return (
        <div className="container my-5">

            <Link
                to="/books"
                className="btn btn-outline-secondary mb-3"
            >
                <i className="bi bi-arrow-left me-2"></i>
                Back to Books
            </Link>

            <h2 className="fw-bold mb-4">
                Add New Book
            </h2>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        className="form-control"
                        name="title"
                        value={book.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Author</label>
                    <input
                        className="form-control"
                        name="author"
                        value={book.author}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">ISBN</label>
                    <input
                        className="form-control"
                        name="isbn"
                        value={book.isbn}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Category</label>
                    <input
                        className="form-control"
                        name="category"
                        value={book.category}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Publication Year</label>
                    <input
                        type="number"
                        className="form-control"
                        name="publicationYear"
                        value={book.publicationYear}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label">Cover Image URL</label>
                    <input
                        className="form-control"
                        name="coverImageUrl"
                        value={book.coverImageUrl}
                        onChange={handleChange}
                    />
                </div>

                <div className="d-flex gap-2">

                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Add Book
                    </button>

                    <Link
                        to="/books"
                        className="btn btn-outline-secondary"
                    >
                        Cancel
                    </Link>

                </div>

            </form>

        </div>
    );
}

export default AddBook;