import { useEffect, useState } from "react";
import {
    getBorrowHistory,
    getMyBorrowHistory
} from "../services/borrowService";
import LoadingSpinner from "../components/LoadingSpinner";

function BorrowHistory() {

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

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

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>
                    <h2 className="fw-bold mb-1">
                        <i className="bi bi-clock-history me-2"></i>
                        {role === "Admin"
                            ? "Borrow History"
                            : "My Borrow History"}
                    </h2>

                    <p className="text-muted mb-0">
                        {role === "Admin"
                            ? "View all borrowing records."
                            : "View your borrowing history."}
                    </p>
                </div>

                <div className="card shadow-sm border-0">
                    <div className="card-body text-center px-4 py-3">
                        <h4 className="fw-bold mb-0">
                            {history.length}
                        </h4>
                        <small className="text-muted">
                            Record{history.length !== 1 && "s"}
                        </small>
                    </div>
                </div>

            </div>

            <div className="card shadow-sm border-0">

                <div className="card-body p-0">

                    {history.length === 0 ? (

                        <div className="text-center py-5">

                            <i
                                className="bi bi-journal-x display-4 text-secondary"
                            ></i>

                            <h5 className="mt-3">
                                No borrow history found
                            </h5>

                            <p className="text-muted mb-0">
                                There are no records to display.
                            </p>

                        </div>

                    ) : (

                        <div className="table-responsive">

                            <table className="table table-hover align-middle mb-0">

                                <thead className="table-dark">

                                    <tr>

                                        <th>ID</th>

                                        {role === "Admin" && (
                                            <th>Borrower</th>
                                        )}

                                        <th>Book</th>
                                        <th>Borrow Date</th>
                                        <th>Return Status</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {history.map(item => (

                                        <tr key={item.id}>

                                            <td>
                                                <strong>#{item.id}</strong>
                                            </td>

                                            {role === "Admin" && (
                                                <td>{item.borrowerName}</td>
                                            )}

                                            <td className="fw-semibold">
                                                {item.bookTitle}
                                            </td>

                                            <td>
                                                {new Date(
                                                    item.borrowDate
                                                ).toLocaleDateString()}
                                            </td>

                                            <td>

                                                {item.returnDate ? (

                                                    <>
                                                        <span className="badge bg-success me-2">
                                                            Returned
                                                        </span>

                                                        <small className="text-muted">
                                                            {new Date(
                                                                item.returnDate
                                                            ).toLocaleDateString()}
                                                        </small>
                                                    </>

                                                ) : (

                                                    <span className="badge bg-warning text-dark">
                                                        Not Returned
                                                    </span>

                                                )}

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </div>

        </div>

    );

}

export default BorrowHistory;