import axios from 'axios';

const API_BASE = "http://localhost:8081/api/clients";

export const getClients = () => axios.get(API_BASE);
export const addClient = (data) => axios.post(API_BASE, data);
export const updateClient = (panId, data) => axios.put(`${API_BASE}/${panId}`, data);
