import { useEffect, useState } from "react";
import {
    getBorrowHistory,
    getMyBorrowHistory
} from "../services/borrowService";
import LoadingSpinner from "../components/LoadingSpinner";

function BorrowHistory() {

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRecord, setSelectedRecord] = useState(null);

    // Pagination States
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

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

    const handleRowClick = (record) => {
        setSelectedRecord(record);
    };

    const handleCloseModal = () => {
        setSelectedRecord(null);
    };

    // Helper to calculate expected return date
    const getExpectedReturnDate = (record) => {
        if (!record) return "N/A";
        if (record.expectedReturnDate) {
            return new Date(record.expectedReturnDate).toLocaleDateString();
        }
        if (record.dueDate) {
            return new Date(record.dueDate).toLocaleDateString();
        }
        if (record.borrowDate) {
            const borrow = new Date(record.borrowDate);
            borrow.setDate(borrow.getDate() + 14);
            return borrow.toLocaleDateString();
        }
        return "N/A";
    };

    // --- Pagination Logic ---
    const totalItems = history.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

    // Ensure currentPage doesn't go out of bounds on itemsPerPage change
    const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

    const indexOfLastItem = validCurrentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentRecords = history.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    // Generate pagination numbers array with ellipsis handling
    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (validCurrentPage <= 3) {
                pages.push(1, 2, 3, 4, "...", totalPages);
            } else if (validCurrentPage >= totalPages - 2) {
                pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, "...", validCurrentPage - 1, validCurrentPage, validCurrentPage + 1, "...", totalPages);
            }
        }
        return pages;
    };

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
                            ? "View all borrowing records. Click a record to view details."
                            : "View your borrowing history. Click a record to view details."}
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

                        <>
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
                                            <th className="text-end pe-4">Action</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {currentRecords.map(item => (

                                            <tr
                                                key={item.id}
                                                onClick={() => handleRowClick(item)}
                                                style={{ cursor: "pointer" }}
                                                title="Click to view full details"
                                            >

                                                <td>
                                                    <strong>#{item.id}</strong>
                                                </td>

                                                {role === "Admin" && (
                                                    <td>{item.borrowerName || item.userEmail || item.userName || "N/A"}</td>
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

                                                <td className="text-end pe-4">
                                                    <button
                                                        className="btn btn-sm btn-outline-primary"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleRowClick(item);
                                                        }}
                                                    >
                                                        <i className="bi bi-eye me-1"></i> View Details
                                                    </button>
                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>

                            {/* Integrated Pagination Footer */}
                            <div className="card-footer bg-white border-0 py-3 px-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                                <div className="d-flex align-items-center">
                                    <span className="text-muted me-2 small">Show</span>
                                    <select
                                        className="form-select form-select-sm"
                                        value={itemsPerPage}
                                        onChange={handleItemsPerPageChange}
                                        style={{ width: "80px" }}
                                    >
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                        <option value={50}>50</option>
                                    </select>
                                    <span className="text-muted ms-2 small">entries per page</span>
                                </div>

                                <div className="small text-muted">
                                    Showing <span className="fw-semibold">{totalItems === 0 ? 0 : indexOfFirstItem + 1}</span> to{" "}
                                    <span className="fw-semibold">{Math.min(indexOfLastItem, totalItems)}</span> of{" "}
                                    <span className="fw-semibold">{totalItems}</span> records
                                </div>

                                {totalPages > 1 && (
                                    <nav aria-label="Table navigation">
                                        <ul className="pagination pagination-sm mb-0">
                                            <li className={`page-item ${validCurrentPage === 1 ? "disabled" : ""}`}>
                                                <button
                                                    className="page-item-link page-link"
                                                    onClick={() => handlePageChange(validCurrentPage - 1)}
                                                >
                                                    <i className="bi bi-chevron-left"></i>
                                                </button>
                                            </li>

                                            {getPageNumbers().map((page, index) =>
                                                page === "..." ? (
                                                    <li key={`ellipsis-${index}`} className="page-item disabled">
                                                        <span className="page-link">...</span>
                                                    </li>
                                                ) : (
                                                    <li
                                                        key={page}
                                                        className={`page-item ${validCurrentPage === page ? "active" : ""}`}
                                                    >
                                                        <button
                                                            className="page-link"
                                                            onClick={() => handlePageChange(page)}
                                                        >
                                                            {page}
                                                        </button>
                                                    </li>
                                                )
                                            )}

                                            <li className={`page-item ${validCurrentPage === totalPages ? "disabled" : ""}`}>
                                                <button
                                                    className="page-link"
                                                    onClick={() => handlePageChange(validCurrentPage + 1)}
                                                >
                                                    <i className="bi bi-chevron-right"></i>
                                                </button>
                                            </li>
                                        </ul>
                                    </nav>
                                )}
                            </div>
                        </>

                    )}

                </div>

            </div>

            {/* Details Modal */}
            {selectedRecord && (
                <div
                    className="modal fade show d-block"
                    tabIndex="-1"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                    onClick={handleCloseModal}
                >
                    <div
                        className="modal-dialog modal-dialog-centered"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-content border-0 shadow rounded-4">

                            <div className="modal-header border-0 pb-0">
                                <h5 className="modal-title fw-bold">
                                    <i className="bi bi-receipt me-2 text-primary"></i>
                                    Borrowing Record #{selectedRecord.id}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={handleCloseModal}
                                ></button>
                            </div>

                            <div className="modal-body py-4">

                                <ul className="list-group list-group-flush">

                                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                        <span className="text-muted">
                                            <i className="bi bi-book me-2"></i>Book
                                        </span>
                                        <span className="fw-bold text-end ms-3">
                                            {selectedRecord.bookTitle}
                                        </span>
                                    </li>

                                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                        <span className="text-muted">
                                            <i className="bi bi-person me-2"></i>Borrower
                                        </span>
                                        <span className="fw-bold">
                                            {selectedRecord.borrowerName || selectedRecord.userEmail || selectedRecord.userName || "Current User"}
                                        </span>
                                    </li>

                                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                        <span className="text-muted">
                                            <i className="bi bi-calendar-check me-2"></i>Borrow Date
                                        </span>
                                        <span className="fw-semibold">
                                            {selectedRecord.borrowDate
                                                ? new Date(selectedRecord.borrowDate).toLocaleDateString()
                                                : "N/A"}
                                        </span>
                                    </li>

                                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                        <span className="text-muted">
                                            <i className="bi bi-calendar-event me-2"></i>Expected Return Date
                                        </span>
                                        <span className="fw-semibold">
                                            {getExpectedReturnDate(selectedRecord)}
                                        </span>
                                    </li>

                                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                        <span className="text-muted">
                                            <i className="bi bi-calendar2-x me-2"></i>Actual Return Date
                                        </span>
                                        <span className="fw-semibold">
                                            {selectedRecord.returnDate
                                                ? new Date(selectedRecord.returnDate).toLocaleDateString()
                                                : "Not Returned Yet"}
                                        </span>
                                    </li>

                                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                        <span className="text-muted">
                                            <i className="bi bi-info-circle me-2"></i>Return Status
                                        </span>
                                        <span>
                                            {selectedRecord.returnDate ? (
                                                <span className="badge bg-success">Returned</span>
                                            ) : (
                                                <span className="badge bg-warning text-dark">Active (Borrowed)</span>
                                            )}
                                        </span>
                                    </li>

                                </ul>

                            </div>

                            <div className="modal-footer border-0 pt-0">
                                <button
                                    type="button"
                                    className="btn btn-secondary px-4"
                                    onClick={handleCloseModal}
                                >
                                    Close
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}

        </div>

    );

}

export default BorrowHistory;