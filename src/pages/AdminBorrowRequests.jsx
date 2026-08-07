import { useEffect, useState } from "react";
import {
    getBorrowRequests,
    approveBorrowRequest,
    rejectBorrowRequest,
    returnBorrowRequest
} from "../services/borrowService";
import LoadingSpinner from "../components/LoadingSpinner";

function AdminBorrowRequests() {

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchRequests() {

        try {

            const data = await getBorrowRequests();
            setRequests(data);

        }
        catch (error) {

            console.error(error);

        }
        finally {

            setLoading(false);

        }

    }

    useEffect(() => {
        fetchRequests();
    }, []);

    async function handleApprove(id) {

        try {

            await approveBorrowRequest(id);
            await fetchRequests();

        }
        catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ??
                "Failed to approve request."
            );

        }

    }

    async function handleReject(id) {

        try {

            await rejectBorrowRequest(id);
            await fetchRequests();

        }
        catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ??
                "Failed to reject request."
            );

        }

    }

    async function handleReturn(id) {

        try {

            await returnBorrowRequest(id);
            await fetchRequests();

        }
        catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ??
                "Failed to return book."
            );

        }

    }

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
                        <i className="bi bi-shield-lock me-2"></i>
                        Admin Borrow Requests
                    </h2>

                    <p className="text-muted mb-0">
                        Review, approve, reject, and return borrowed books.
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

                            <i
                                className="bi bi-journal-x display-4 text-secondary"
                            ></i>

                            <h5 className="mt-3">
                                No borrow requests
                            </h5>

                            <p className="text-muted mb-0">
                                There are currently no borrow requests.
                            </p>

                        </div>

                    ) : (

                        <div className="table-responsive">

                            <table className="table table-hover align-middle mb-0">

                                <thead className="table-dark">

                                    <tr>
                                        <th>ID</th>
                                        <th>Borrower</th>
                                        <th>Book</th>
                                        <th>Borrow Date</th>
                                        <th>Expected Return</th>
                                        <th>Status</th>
                                        <th className="text-center">Actions</th>
                                    </tr>

                                </thead>

                                <tbody>

                                    {requests.map(request => (

                                        <tr key={request.id}>

                                            <td>
                                                <strong>#{request.id}</strong>
                                            </td>

                                            <td>{request.borrowerName}</td>

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
                                                    className={`badge ${request.status === "Approved"
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

                                            <td className="text-center">

                                                {request.status === "Pending" && (

                                                    <div className="d-flex justify-content-center gap-2">

                                                        <button
                                                            className="btn btn-success btn-sm"
                                                            onClick={() => handleApprove(request.id)}
                                                        >
                                                            <i className="bi bi-check-lg me-1"></i>
                                                            Approve
                                                        </button>

                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => handleReject(request.id)}
                                                        >
                                                            <i className="bi bi-x-lg me-1"></i>
                                                            Reject
                                                        </button>

                                                    </div>

                                                )}

                                                {request.status === "Approved" && (

                                                    <button
                                                        className="btn btn-primary btn-sm"
                                                        onClick={() => handleReturn(request.id)}
                                                    >
                                                        <i className="bi bi-arrow-return-left me-1"></i>
                                                        Return
                                                    </button>

                                                )}

                                                {(request.status === "Returned" ||
                                                    request.status === "Rejected") && (

                                                        <span className="text-muted">
                                                            N/A
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

export default AdminBorrowRequests;