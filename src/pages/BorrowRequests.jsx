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

            <h2 className="mb-4">
                My Borrow Requests
            </h2>

            <table className="table table-striped">

                <thead>

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

                            <td>{request.bookTitle}</td>

                            <td>
                                {new Date(request.borrowDate).toLocaleDateString()}
                            </td>

                            <td>
                                {new Date(request.expectedReturnDate).toLocaleDateString()}
                            </td>

                            <td>

                                <span
                                    className={`badge ${
                                        request.status === "Approved"
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

    );
}

export default BorrowRequests;