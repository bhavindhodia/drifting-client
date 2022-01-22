import axios from "axios";

const axiosClient = axios.create();

axiosClient.defaults.baseURL = "http://localhost:5000/v1/";
axiosClient.defaults.withCredentials = true;

//All request will wait 2 seconds before timeout
axiosClient.defaults.timeout = 2000;

export default axiosClient;
