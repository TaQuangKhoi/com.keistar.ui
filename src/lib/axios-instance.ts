import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:28071/bonita/API/",
    withCredentials: true,

    // 3rd way to set the AUTH token for any request
    headers: {
        "X-Bonita-API-Token": "2c2afffc-2cca-46e4-88f4-de841063745e",
    },
});

/**
 * Set the AUTH token for any request
 */
// 1st way
// axiosInstance.interceptors.response.use(function (config) {
//     config.headers["X-Bonita-API-Token"] = "2c2afffc-2cca-46e4-88f4-de841063745e";
//     return config;
// });

// 2nd way
// axios.defaults.headers.common["X-Bonita-API-Token"] = "2c2afffc-2cca-46e4-88f4-de841063745e";

export default axiosInstance;