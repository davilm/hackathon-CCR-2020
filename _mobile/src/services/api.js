import axios from 'axios';

const api = axios.create({
    baseURL:'http://192.168.0.4:2222'
});

export default api;