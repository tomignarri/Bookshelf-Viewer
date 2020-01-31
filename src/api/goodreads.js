import axios from 'axios';

export default axios.create({
    baseURL: 'https://www.goodreads.com',
    headers: {
        Authorization: 'Client-ID '
    }
});