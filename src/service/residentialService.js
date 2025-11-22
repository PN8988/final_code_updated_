import axios from "axios";



const API_URL = "http://localhost:8080/api/residential";

export const addResidentialProperty = (propertyData) => {
  return axios.post(`${API_URL}/add`, propertyData);
};

export const getResidentialProperties = () => {
  return axios.get(`${API_URL}/list`);
};

export const updateResidentialProperty = (id, data) => {
  return axios.put(`${API_URL}/update/${id}`, data);
};

export const deleteResidentialProperty = (id) => {
  return axios.delete(`${API_URL}/delete/${id}`);
};

const residentialService = {
  addResidentialProperty,
  getResidentialProperties,
  updateResidentialProperty,
  deleteResidentialProperty,
};

export default residentialService;