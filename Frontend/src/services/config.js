import axios from 'axios'
 
const api = axios.create({
  baseURL: 'http://160.99.40.212:1000',
  timeout: 5000
})

export default api
