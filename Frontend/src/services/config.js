import axios from 'axios'

// Odredi baseURL u zavisnosti od mode
let baseURL = ''


let okruzenje = "production";



if (okruzenje === 'development') {
  // Development URL
  baseURL = 'http://localhost:1000'
} else {
  // Production URL (nakon build-a)
  baseURL = 'http://160.99.40.212:1000'
}

console.log('Axios baseURL:', baseURL)

const api = axios.create({
  baseURL: baseURL,
  timeout: 5000
})

export default api
