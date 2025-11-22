import axios from "axios";

const API_URL = "http://localhost:8080/api/bank";

export const getAllBankAccounts = () => axios.get(`${API_URL}/getAll`);
export const getBanksByPan = (pan) => axios.get(`${API_URL}/getByPan/${pan}`);
export const getBankMasterList = () => axios.get(`${API_URL}/getbankDetailsMaster`);
export const getBankByIfsc = (ifsc) => axios.get(`${API_URL}/getBankByIfsc/${ifsc}`);

export const saveBankAccount = (data) => axios.post(`${API_URL}/saveBank`, data);
export const updateBankAccount = (id, data) => axios.put(`${API_URL}/update/${id}`, data);
export const deleteBankAccount = (id) => axios.delete(`${API_URL}/delete/${id}`);

export const deleteBankMaster = (ifsc) => axios.delete(`${API_URL}/deleteBankMaster/${ifsc}`);
export const saveBankMaster = (data) => axios.post(`${API_URL}/bankDetailsMaster`, data);

