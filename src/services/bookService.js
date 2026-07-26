import api from "./api";

export async function getBooks() {
    const response = await api.get("/Books");
    return response.data;
}

export async function getBookById(id) {
    const response = await api.get(`/Books/${id}`);
    return response.data;
}

export async function createBook(book) {
    const response = await api.post("/Books", book);
    return response.data;
}

export async function deleteBook(id) {
    const response = await api.delete(`/Books/${id}`);
    return response.data;
}