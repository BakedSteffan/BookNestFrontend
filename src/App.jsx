import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Books from './pages/Books';
import Navbar from './components/Navbar';
import BorrowRequests from './pages/BorrowRequests';
import BorrowHistory from './pages/BorrowHistory';
import Register from "./pages/Register";
import BookDetails from "./pages/BookDetails";
import BorrowBook from "./pages/BorrowBook";
import AdminBorrowRequests from "./pages/AdminBorrowRequests";
import ProtectedRoute from "./components/ProtectedRoute";
import AddBook from "./pages/AddBook";

function App() {
    return (
        <>
            <Navbar />

            <main className="container my-5">
                <Routes>

    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    <Route
        path="/"
        element={
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
        }
    />

    <Route
        path="/books"
        element={
            <ProtectedRoute>
                <Books />
            </ProtectedRoute>
        }
    />

    <Route
        path="/books/:id"
        element={
            <ProtectedRoute>
                <BookDetails />
            </ProtectedRoute>
        }
    />

    <Route
        path="/borrow/:id"
        element={
            <ProtectedRoute>
                <BorrowBook />
            </ProtectedRoute>
        }
    />

    <Route
        path="/borrow-requests"
        element={
            <ProtectedRoute>
                <BorrowRequests />
            </ProtectedRoute>
        }
    />

    <Route
        path="/borrow-history"
        element={
            <ProtectedRoute>
                <BorrowHistory />
            </ProtectedRoute>
        }
    />

    <Route
        path="/admin/borrow-requests"
        element={
            <ProtectedRoute adminOnly={true}>
                <AdminBorrowRequests />
            </ProtectedRoute>
        }
    />

    <Route
        path="/books/add"
        element={
            <ProtectedRoute roles={["Admin"]}>
                <AddBook />
            </ProtectedRoute>
        }
    />

</Routes>
            </main>

            <Footer />
        </>
    );
}

export default App;
