import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-app-burger-9be18.firebaseio.com/'
});

export default instance;