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

            <div className="card shadow-sm border-0">

                <div className="card-header bg-primary text-white py-3">

                    <h2 className="h4 mb-1">
                        <i className="bi bi-clipboard-check me-2"></i>
                        My Borrow Requests
                    </h2>

                    <small className="opacity-75">
                        Track the status of your submitted borrow requests.
                    </small>

                </div>

                <div className="card-body p-0">

                    {requests.length === 0 ? (

                        <div className="text-center py-5">

                            <i className="bi bi-inbox fs-1 text-secondary"></i>

                            <h5 className="mt-3">
                                No borrow requests yet
                            </h5>

                            <p className="text-muted mb-0">
                                Your borrow requests will appear here once you submit one.
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
                                        <th className="text-center">Status</th>
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

                                            <td className="text-center">

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