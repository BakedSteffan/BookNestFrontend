import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, adminOnly = false }) {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && role !== "Admin") {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;