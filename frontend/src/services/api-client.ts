import axios, { AxiosRequestConfig } from 'axios'

export const url = import.meta.env.VITE_BACKEND_DOMAIN

const axiosInstance = axios.create({
  baseURL: url,
  withCredentials: true,
})

// Add request interceptor to include token from sessionStorage on each request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token')
    if (token) {
      config.headers['x-auth-token'] = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

class APIClient<T> {
  endpoint: string

  constructor(endpoint: string) {
    this.endpoint = endpoint
  }

  getAll = (config: AxiosRequestConfig) =>
    axiosInstance.get<T[]>(this.endpoint, config).then((res) => res.data)

  get = (id: number | string) => {
    return axiosInstance
      .get<T>(this.endpoint + '/' + id)
      .then((res) => res.data)
  }
  post = (data: T) => {
    return axiosInstance.post<T>(this.endpoint, data).then((res) => res.data)
  }
  delete = (id: number | string) => {
    return axiosInstance
      .delete<T>(this.endpoint + '/' + id)
      .then((res) => res.data)
  }
}

export default APIClient
