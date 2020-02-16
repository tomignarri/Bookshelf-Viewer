import axios from 'axios';

const proxyurl = "https://cors-anywhere.herokuapp.com/";

export default axios.create({
    baseURL: proxyurl + 'http://covers.openlibrary.org/b/isbn',
});