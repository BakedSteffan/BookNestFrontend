import { useEffect, useState } from "react";
import { getBorrowHistory } from "../services/borrowService";

function BorrowHistory() {

    const [history, setHistory] = useState([]);

    useEffect(() => {
        async function loadHistory() {
            try {
                const data = await getBorrowHistory();
                setHistory(data);
            }
            catch (error) {
                console.error(error);
            }
        }

        loadHistory();
    }, []);

    return (
        <div className="container my-5">

            <h2 className="mb-4">
                Borrow History
            </h2>

            <table className="table table-striped align-middle">

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Borrower</th>
                        <th>Book</th>
                        <th>Borrow Date</th>
                        <th>Return Date</th>
                    </tr>

                </thead>

                <tbody>

                    {history.map(item => (

                        <tr key={item.id}>

                            <td>{item.id}</td>

                            <td>{item.borrowerName}</td>

                            <td>{item.bookTitle}</td>

                            <td>
                                {new Date(item.borrowDate).toLocaleDateString()}
                            </td>

                            <td>
                                {new Date(item.returnDate).toLocaleDateString()}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default BorrowHistory;