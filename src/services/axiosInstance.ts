import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse
} from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  timeout: 15000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;

      switch (status) {
        case 401:
          console.error("Yetkisiz erişim (401)");

          break;

        case 403:
          console.error("Erişim reddedildi (403)");
          break;

        case 500:
          console.error("Sunucu hatası (500)");
          break;
      }
    }
  }
);

export default axiosInstance
