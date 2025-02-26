import Axios from "axios";

const baseUrl = import.meta.env.VITE_APP_URL + "/api/";

const apiService = Axios.create();

const withToken = (config) => {
    let user = JSON.parse(localStorage.getItem('user') || "null");

    return {
        ...config,
        headers: {
            ...config.headers,
            ...(user ? { Authorization: `Bearer ${user.token}` } : {}),
        },
    };
};

apiService.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (401 === error.response.status) {
            // localStorage.removeItem('user');
            // if (window.location.pathname !== "/") {
            //     window.location.href = "/";
            // }
        } else {
            return Promise.reject(error);
        }
    }
);

apiService.interceptors.request.use(withToken);
apiService.defaults.baseURL = baseUrl;

export default apiService;