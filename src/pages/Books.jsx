import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBooks, deleteBook } from "../services/bookService";
import "../styles/Books.css";
import BookCard from "../components/BookCard";

function Books() {

    const [books, setBooks] = useState([]);
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

    return (
        <div className="container my-5">

            <div className="books-header">

                <div className="d-flex justify-content-between align-items-center">

                    <div>
                        <h1>Browse Books</h1>

                        <p>
                            Discover your next favorite book.
                        </p>
                    </div>

                    {role === "Admin" && (
                        <Link
                            to="/books/add"
                            className="btn btn-success"
                        >
                            <i className="bi bi-plus-circle me-2"></i>
                            Add Book
                        </Link>
                    )}

                </div>

            </div>

            <input
                type="text"
                className="form-control search-box"
                placeholder="Search by title, author or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="category-buttons">

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

            <div className="row">

                {filteredBooks.map(book => (

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

                ))}

            </div>

        </div>
    );
}

export default Books;