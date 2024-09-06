import axios from "axios";
const API = axios.create({ baseURL: "https://jsonplaceholder.typicode.com" });

export const fetchUsers = () => API.get("/users");
console.log(" Hi from fetchUsers");
export const addUsers = (newUser) => API.post("/", newUser);
export const deleteUser = (id) => API.delete(`/${id}`);
export const fetchUserByID = (id) => API.get(`/${id}`);
export const putUser = (userId, updatedUser) => API.put(`/users/${userId}`, updatedUser);

