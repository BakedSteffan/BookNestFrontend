import api from "./api";

export async function register(user) {
    const response = await api.post("/Auth/register", user);
    return response.data;
}

export async function login(user) {
    const response = await api.post("/Auth/login", user);
    return response.data;
}