import axios from 'axios';

const instance = axios.create({
    baseURL: "https://cmingchronicle.herokuapp.com/"
})

export default instance;