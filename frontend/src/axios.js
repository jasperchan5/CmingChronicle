import axios from 'axios';

const instance = axios.create({
    baseURL: "https://cmingchronicle.herokuapp.com/"
})
// const instance = axios.create({
//     baseURL: "http://localhost:4000/"
// })

export default instance;