import { useEffect, useState } from "react";
import { getMyBorrowRequests } from "../services/borrowService";
import LoadingSpinner from "../components/LoadingSpinner";

function BorrowRequests() {

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function fetchRequests() {

            try {

                const data = await getMyBorrowRequests();
                setRequests(data);

            }
            catch (error) {

                console.error(error);

            }
            finally {

                setLoading(false);

            }

        }

        fetchRequests();

    }, []);

    if (loading) {
        return (
            <LoadingSpinner text="Loading borrow requests..." />
        );
    }

    return (

        <div className="container my-5">

            <div className="card shadow-sm border-0 rounded-4">

                <div className="card-body p-4">

                    <h2 className="mb-4">
                        My Borrow Requests
                    </h2>

                    {requests.length === 0 ? (

                        <div className="text-center text-muted py-5">

                            <i
                                className="bi bi-journal-x"
                                style={{ fontSize: "3rem" }}
                            ></i>

                            <p className="mt-3 mb-0">
                                You haven't made any borrow requests yet.
                            </p>

                        </div>

                    ) : (

                        <div className="table-responsive">

                            <table className="table table-hover align-middle mb-0">

                                <thead className="table-light">

                                    <tr>
                                        <th>Book</th>
                                        <th>Borrow Date</th>
                                        <th>Expected Return</th>
                                        <th>Status</th>
                                    </tr>

                                </thead>

                                <tbody>

                                    {requests.map(request => (

                                        <tr key={request.id}>

                                            <td className="fw-semibold">
                                                {request.bookTitle}
                                            </td>

                                            <td>
                                                {new Date(request.borrowDate).toLocaleDateString()}
                                            </td>

                                            <td>
                                                {new Date(request.expectedReturnDate).toLocaleDateString()}
                                            </td>

                                            <td>

                                                <span
                                                    className={`badge rounded-pill px-3 py-2 ${request.status === "Approved"
                                                            ? "bg-success"
                                                            : request.status === "Rejected"
                                                                ? "bg-danger"
                                                                : request.status === "Returned"
                                                                    ? "bg-secondary"
                                                                    : "bg-warning text-dark"
                                                        }`}
                                                >
                                                    {request.status}
                                                </span>

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

export default BorrowRequests;