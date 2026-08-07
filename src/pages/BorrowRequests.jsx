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

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="fw-bold mb-1">
                        <i className="bi bi-clipboard-check me-2"></i>
                        My Borrow Requests
                    </h2>

                    <p className="text-muted mb-0">
                        Track the status of your borrowing requests.
                    </p>

                </div>

                <div className="card shadow-sm border-0">

                    <div className="card-body text-center px-4 py-3">

                        <h4 className="fw-bold mb-0">
                            {requests.length}
                        </h4>

                        <small className="text-muted">
                            Request{requests.length !== 1 && "s"}
                        </small>

                    </div>

                </div>

            </div>

            <div className="card shadow-sm border-0">

                <div className="card-body p-0">

                    {requests.length === 0 ? (

                        <div className="text-center py-5">

                            <i className="bi bi-journal-x display-4 text-secondary"></i>

                            <h5 className="mt-3">
                                No borrow requests found
                            </h5>

                            <p className="text-muted mb-0">
                                You haven't submitted any borrow requests yet.
                            </p>

                        </div>

                    ) : (

                        <div className="table-responsive">

                            <table className="table table-hover align-middle mb-0">

                                <thead className="table-dark">

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
                                                {new Date(
                                                    request.borrowDate
                                                ).toLocaleDateString()}
                                            </td>

                                            <td>
                                                {new Date(
                                                    request.expectedReturnDate
                                                ).toLocaleDateString()}
                                            </td>

                                            <td>

                                                {request.status === "Approved" && (
                                                    <span className="badge bg-success">
                                                        Approved
                                                    </span>
                                                )}

                                                {request.status === "Pending" && (
                                                    <span className="badge bg-warning text-dark">
                                                        Pending
                                                    </span>
                                                )}

                                                {request.status === "Rejected" && (
                                                    <span className="badge bg-danger">
                                                        Rejected
                                                    </span>
                                                )}

                                                {request.status === "Returned" && (
                                                    <span className="badge bg-secondary">
                                                        Returned
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

export default BorrowRequests;