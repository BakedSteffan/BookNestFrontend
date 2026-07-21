import api from "./api";

export async function createBorrowRequest(data) {
    const response = await api.post("/BorrowRequests", data);
    return response.data;
}

export async function getMyBorrowRequests() {
    const response = await api.get("/BorrowRequests/my");
    return response.data;
}

export async function getBorrowRequests() {
    const response = await api.get("/BorrowRequests");
    return response.data;
}

export async function approveBorrowRequest(id) {
    const response = await api.put(`/BorrowRequests/${id}/approve`);
    return response.data;
}

export async function rejectBorrowRequest(id) {
    const response = await api.put(`/BorrowRequests/${id}/reject`);
    return response.data;
}

export async function returnBorrowRequest(id) {
    const response = await api.put(`/BorrowRequests/${id}/return`);
    return response.data;
}

