
import {config} from "@/components/Constants";
import axios, {AxiosInstance} from "axios";

export const apiInstance: AxiosInstance = axios.create({
    baseURL: config.url.API_BASE_URL
});
