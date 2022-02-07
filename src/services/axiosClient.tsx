import axios from "axios";

const axiosClient = axios.create();

const developmentBaseURL = "http://localhost:5000/v1/";
const productionBaseURL = "https://drifting-server.herokuapp.com/v1/";
//axiosClient.defaults.baseURL = "http://localhost:5000/v1/";
//axiosClient.defaults.baseURL = "https://drifting-server.herokuapp.com/v1/";
axiosClient.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? developmentBaseURL
    : productionBaseURL;
axiosClient.defaults.withCredentials = true;

//All request will wait 2 seconds before timeout
axiosClient.defaults.timeout = 3000;

export default axiosClient;
