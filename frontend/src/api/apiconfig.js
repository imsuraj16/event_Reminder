import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://event-reminder-1z71.onrender.com',
    withCredentials: true,
})

export default instance;