import axios from 'axios'

const apiClient = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://mern-choir.vercel.app/"
      : "http://localhost:4000",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
  },
  //   process.env.NODE_ENV === "development" ? "http://localhost:4000" : "/",
  // headers: {
  //   "Content-type": "application/json",
  // },
});

apiClient.interceptors.request.use(
  async (config) => {
    if (localStorage.getItem('userInfo'))
      config.headers.authorization = `Bearer ${
        JSON.parse(localStorage.getItem('userInfo')!).token
      }`
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

export default apiClient
