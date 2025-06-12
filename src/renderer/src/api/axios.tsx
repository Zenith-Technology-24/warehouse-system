import Axios from "axios";

const isNgrok = window.location.href.includes('pinggy.link') || window.location.href.includes('ngrok');
const baseUrl = (isNgrok ? import.meta.env.VITE_APP_NGROK_URL : import.meta.env.VITE_APP_URL) + "/api/";

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