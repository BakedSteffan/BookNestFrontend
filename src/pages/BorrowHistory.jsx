import { useEffect, useState } from "react";
import {
    getBorrowHistory,
    getMyBorrowHistory
} from "../services/borrowService";
import LoadingSpinner from "../components/LoadingSpinner";

function BorrowHistory() {

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    // Get the user's role once
    const role = localStorage.getItem("role");

    useEffect(() => {

        async function loadHistory() {

            try {

                let data;

                if (role === "Admin") {
                    data = await getBorrowHistory();
                } else {
                    data = await getMyBorrowHistory();
                }

                setHistory(data);

            }
            catch (error) {

                console.error(error);

            }
            finally {

                setLoading(false);

            }

        }

        loadHistory();

    }, [role]);

    if (loading) {
        return (
            <LoadingSpinner text="Loading borrow history..." />
        );
    }

    return (

        <div className="container my-5">

            <h2 className="mb-4">
                Borrow History
            </h2>

            <table className="table table-striped align-middle">

                <thead>

                    <tr>
                        <th>ID</th>

                        {role === "Admin" && <th>Borrower</th>}

                        <th>Book</th>
                        <th>Borrow Date</th>
                        <th>Return Date</th>
                    </tr>

                </thead>

                <tbody>

                    {history.map(item => (

                        <tr key={item.id}>

                            <td>{item.id}</td>

                            {role === "Admin" && (
                                <td>{item.borrowerName}</td>
                            )}

                            <td>{item.bookTitle}</td>

                            <td>
                                {new Date(item.borrowDate).toLocaleDateString()}
                            </td>

                            <td>
                                {item.returnDate
                                    ? new Date(item.returnDate).toLocaleDateString()
                                    : "Not Returned"}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );
}

export default BorrowHistory;