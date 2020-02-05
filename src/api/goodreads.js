import axios from 'axios';

const proxyurl = "https://cors-anywhere.herokuapp.com/";

export default axios.create({
    baseURL: proxyurl + 'https://www.goodreads.com',
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
});