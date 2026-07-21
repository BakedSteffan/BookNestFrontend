import { useEffect, useState } from "react";
import {
    getBorrowRequests,
    approveBorrowRequest,
    rejectBorrowRequest,
    returnBorrowRequest
} from "../services/borrowService";

function AdminBorrowRequests() {

    const [requests, setRequests] = useState([]);

    async function fetchRequests() {
        try {
            const data = await getBorrowRequests();
            setRequests(data);
        }
        catch (error) {
            console.error(error);
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

    return (

        <div className="container my-5">

            <h2 className="mb-4">
                Borrow Requests
            </h2>

            <table className="table table-striped align-middle">

                <thead>

                    <tr>
                        <th>Request ID</th>
                        <th>Borrower</th>
                        <th>Book</th>
                        <th>Borrow Date</th>
                        <th>Expected Return</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>

                </thead>

                <tbody>

                    {requests.map(request => (

                        <tr key={request.id}>

                            <td>{request.id}</td>

                            <td>{request.borrowerName}</td>

                            <td>{request.bookTitle}</td>

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

                           <td>

                                {request.status === "Pending" && (

                                    <div className="d-flex gap-2">

                                        <button
                                            className="btn btn-success btn-sm"
                                            onClick={() => handleApprove(request.id)}
                                        >
                                            Approve
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleReject(request.id)}
                                        >
                                            Reject
                                        </button>

                                    </div>

                                )}

                                {request.status === "Approved" && (

                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => handleReturn(request.id)}
                                    >
                                        Return
                                    </button>

                                )}

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );
}

export default AdminBorrowRequests;