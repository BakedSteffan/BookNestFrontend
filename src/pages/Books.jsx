import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBooks, deleteBook } from "../services/bookService";
import "../styles/Books.css";
import BookCard from "../components/BookCard";
import LoadingSpinner from "../components/LoadingSpinner";

function Books() {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    const role = localStorage.getItem("role");

    useEffect(() => {

        async function fetchBooks() {

            try {

                const data = await getBooks();

                console.log(data);

                setBooks(data);

            }
            catch (error) {

                console.error(error);

            }
            finally {

                setLoading(false);

            }

        }

        fetchBooks();

    }, []);

    async function handleDelete(id) {

        const confirmed = window.confirm(
            "Are you sure you want to delete this book?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await deleteBook(id);

            setBooks(currentBooks =>
                currentBooks.filter(book => book.id !== id)
            );

            alert("Book deleted successfully!");

        }
        catch (error) {

            console.error(error);

            alert(
                error.response?.data ||
                "Failed to delete book."
            );

        }

    }

    const categories = [...new Set(books.map(book => book.category))];

    const filteredBooks = books.filter(book => {

        const matchesCategory =
            selectedCategory === "All" ||
            book.category === selectedCategory;

        const matchesSearch =
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.category.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesCategory && matchesSearch;

    });

    if (loading) {
        return (
            <LoadingSpinner text="Loading books..." />
        );
    }

    return (

        <div className="container my-5">

            {/* Header */}

            <div className="books-header shadow-sm rounded-4 p-4 mb-4">

                <div className="d-flex justify-content-between align-items-center flex-wrap">

                    <div>

                        <h1 className="fw-bold mb-2">
                            BookNest Library
                        </h1>

                        <p className="text-muted mb-0">
                            Discover your next favorite book. Browse by category or search by title, author, or genre.
                        </p>

                    </div>

                    {role === "Admin" && (

                        <Link
                            to="/books/add"
                            className="btn btn-success px-4"
                        >
                            <i className="bi bi-plus-circle me-2"></i>
                            Add Book
                        </Link>

                    )}

                </div>

            </div>

            {/* Search + Categories */}

            <div className="card shadow-sm border-0 rounded-4 mb-4">

                <div className="card-body">

                    <div className="input-group">

                        <span className="input-group-text bg-white border-end-0">
                            <i className="bi bi-search"></i>
                        </span>

                        <input
                            type="text"
                            className="form-control border-start-0"
                            placeholder="Search books, authors or categories..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                    </div>

                    <div className="category-buttons mt-4">

                        <button
                            className={`btn ${selectedCategory === "All"
                                ? "btn-dark"
                                : "btn-outline-dark"
                                }`}
                            onClick={() => setSelectedCategory("All")}
                        >
                            All
                        </button>

                        {categories.map(category => (

                            <button
                                key={category}
                                className={`btn ${selectedCategory === category
                                    ? "btn-dark"
                                    : "btn-outline-dark"
                                    }`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </button>

                        ))}

                    </div>

                </div>

            </div>

            {/* Books */}

            <div className="row">

                {filteredBooks.length > 0 ? (

                    filteredBooks.map(book => (

                        <BookCard
                            key={book.id}
                            id={book.id}
                            title={book.title}
                            author={book.author}
                            category={book.category}
                            year={book.publicationYear}
                            image={book.coverImageUrl}
                            isAvailable={book.isAvailable}
                            isAdmin={role === "Admin"}
                            onDelete={handleDelete}
                        />

                    ))

                ) : (

                    <div className="col-12 text-center py-5">

                        <h4 className="text-muted">
                            No books found
                        </h4>

                        <p className="text-secondary mb-0">
                            Try changing your search or category filter.
                        </p>

                    </div>

                )}

            </div>

        </div>

    );
}

export default Books;