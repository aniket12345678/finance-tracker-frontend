import axios from 'axios'

const frontEndUrl = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
});

export { frontEndUrl }