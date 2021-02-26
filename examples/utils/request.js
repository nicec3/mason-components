import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from "./cookies"

const service = axios.create({
  baseURL: "http://127.0.0.1:9898", // url = base url + request url
  timeout: 5000
  // withCredentials: true // send cookies when cross-domain requests
})

// Request interceptors
service.interceptors.request.use(
  (config) => {
    // Add access-token header to every request, you can add other custom headers here
    config.headers['access-token'] = getToken()
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// Response interceptors
service.interceptors.response.use(
  (response) => {
    const res = response.data
    return res
  },
  (error) => {
    console.error(error);
  }
)

export default service
