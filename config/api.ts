export const API_BASE_URL = process.env.API_BASE_URL;

export const API_ENDPOINTS = {
    LOGIN: API_BASE_URL + "/api/Auth/login",
    REGISTER: API_BASE_URL + "/api/User/register",
    EXPENSE: API_BASE_URL + "/api/Expense",
    INCOME: API_BASE_URL + "/api/Income",
    CATEGORY: API_BASE_URL + "/api/Category",
    USER: API_BASE_URL + "/api/User"
}