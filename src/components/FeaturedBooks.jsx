import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import { getBooks } from "../services/bookService";

function FeaturedBooks() {

    const [featuredBooks, setFeaturedBooks] = useState([]);

    useEffect(() => {

    async function fetchBooks() {

        try {

            const books = await getBooks();

            setFeaturedBooks(books.slice(0, 3));

        }
        catch (error) {

            console.error(error);

        }

    }

    fetchBooks();

}, []);

    return (
        <section className="container my-5">

            <div className="text-center mb-5">
                <h2>Featured Books</h2>
                <p className="text-muted">
                    Explore some of the most popular titles in our library.
                </p>
            </div>

            <div className="row">

                {featuredBooks.map(book => (
                    <BookCard
                        key={book.id}
                        id={book.id}
                        title={book.title}
                        author={book.author}
                        category={book.category}
                        year={book.publicationYear}
                        image={book.coverImageUrl}
                        isAvailable={book.isAvailable}
                    />
                ))}

            </div>

        </section>
    );
}

export default FeaturedBooks;
