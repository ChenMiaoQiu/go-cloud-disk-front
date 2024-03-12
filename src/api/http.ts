import router from "@/router";
import { useUserStore } from "@/stores/user";
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import { ElMessageBox } from "element-plus";

export interface Result<T = any> {
    code: number,
    message: string,
    data: T
}

export const serviceJwt: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    timeout: 10 * 1000,
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
    },
})

export const service: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    timeout: 10 * 1000,
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
    },
})

service.interceptors.response.use((response: AxiosResponse) => {
    const data = response.data

    if (data.code == 1250) {
        ElMessageBox.alert('登录已过期, 请重新登录', 'Ops', {
            confirmButtonText: "OK",
            callback: () => {
                router.push('login')
            }
        })
        return Promise.reject(data);
    } else if (data.code === 200) {
        return data.data
    } else {
        return Promise.reject(data.msg);
    }
}, (err) => {
    return Promise.reject(err);
})

// 检查登录状态
serviceJwt.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = useUserStore().token

    if (token == "") {
        ElMessageBox.alert('未登录, 请登录', 'Ops', {
            confirmButtonText: "OK",
            callback: () => {
                router.push('login')
            }
        })
        return config
    }
    config.headers.Authorization = `Bearer ${token}`
    return config
},
    (error) => {
        return Promise.reject(error);
    }
)

// 验证返回
serviceJwt.interceptors.response.use((response: AxiosResponse) => {
    const data = response.data

    if (data.code == 1250) {
        ElMessageBox.alert('登录已过期, 请重新登录', 'Ops', {
            confirmButtonText: "OK",
            callback: () => {
                router.push('/login')
            }
        })
        return Promise.reject(data);
    } else if (data.code === 200) {
        return data.data
    } else {
        return Promise.reject(data);
    }
}, (err) => {
    return Promise.reject(err);
})

export const http = {
    get<T = any>(url: string, jwt?: boolean, config?: AxiosRequestConfig): Promise<T> {
        if (!jwt) return service.get(url, config)
        return serviceJwt.get(url, config)
    },
    post<T = any>(url: string, jwt?: boolean, data?: object, config?: AxiosRequestConfig): Promise<T> {
        if (!jwt) return service.post(url, data, config)
        return serviceJwt.post(url, data, config)
    },
    put<T = any>(url: string, jwt?: boolean, data?: object, config?: AxiosRequestConfig): Promise<T> {
        if (!jwt) service.put(url, data, config)
        return serviceJwt.put(url, data, config)
    },
    del<T = any>(url: string, jwt?: boolean, config?: AxiosRequestConfig): Promise<T> {
        if (!jwt) service.delete(url, config)
        return serviceJwt.delete(url, config)
    }
}