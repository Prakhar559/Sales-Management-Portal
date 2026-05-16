import axios from 'axios';

const API = axios.create({
    
    baseURL: 'http://localhost:5001/api/sales-management', 
});

export const fetchPipeline = () => API.get('/pipeline');
export const registerDeal = (data) => API.post('/add-deal', data);
export const fetchContacts = () => API.get('/contacts'); 
export const registerContact = (data) => API.post('/add-contact', data);
export const approveDiscount = (id) => API.patch(`/approve-discount/${id}`);
export const purgeRecord = (id) => API.delete(`/remove/${id}`);
export const fetchTerritories = () => API.get('/territories'); 
export const registerTerritory = (data) => API.post('/add-territory', data);
export const fetchSettings = () => API.get('/settings');
export const updateSettings = (data) => API.post('/settings/update', data);
export default API;