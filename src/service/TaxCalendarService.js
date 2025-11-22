// services/TaxCalendarService.js
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/tax-calendar";
const CAL_API = "http://localhost:8080/api/tax-calendar";

export const getAllTaxMasters = () =>
  axios.get(`${BASE_URL}/getTaxYearMasters`);

export const createTaxMaster = (data) =>
  axios.post(`${BASE_URL}/addTaxYear`, data);

export const getAllCalendarCodes = () => axios.get(CAL_API);
