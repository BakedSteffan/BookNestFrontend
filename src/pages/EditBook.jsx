import { useParams } from "react-router-dom";

function EditBook() {

    const { id } = useParams();

    return (
        <div className="container my-5">

            <h2 className="fw-bold">
                Edit Book
            </h2>

            <p>
                Editing book with ID: <strong>{id}</strong>
            </p>

        </div>
    );
}

export default EditBook;