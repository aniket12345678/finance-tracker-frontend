import axios from 'axios'

const frontEndUrl = axios.create({
    baseURL: 'http://localhost:5000/api'
});

export { frontEndUrl }