import axios, {AxiosInstance, AxiosRequestConfig} from 'ts-axios-new'
import { ElMessage } from 'element-plus'


class HttpRequest {

    private readonly baseUrl: string;

    constructor() {
        this.baseUrl = import.meta.env.RENDERER_VITE_BASE_API
    }

    getInsideConfig() {

        return {

            baseURL: this.baseUrl,// 所有的请求地址前缀部分(没有后端请求不用写)

            timeout: 50000, // 请求超时时间(毫秒)

            withCredentials: true,// 异步请求携带cookie

            // headers: {

            // 设置后端需要的传参类型

            // 'Content-Type': 'application/json',

            // 'token': x-auth-token',//一开始就要token

            // 'X-Requested-With': 'XMLHttpRequest',

            // },

        }

    }



    // 请求拦截
    interceptors(instance: AxiosInstance, url: string | number | undefined) {

        instance.interceptors.request.use(config => {
            return config
        }, (error: any) => {
            return Promise.reject(error)
        })

        //响应拦截
        instance.interceptors.response.use(res => {

            //返回数据

            const { data } = res

            if (data.code !== 0) {
                ElMessage({
                    message: data.msg || 'Error',
                    type: 'error',
                    duration: 5 * 1000
                })
                return Promise.reject<Error>(new Error(data.message || 'Error'));
            }else {
                return data
            }
        }, (error: any) => {

            console.log('error==>', error)

            return Promise.reject(error)

        })

    }



    request(options: AxiosRequestConfig) {

        const instance = axios.create()

        options = Object.assign(this.getInsideConfig(), options)

        this.interceptors(instance, options.url)

        return instance(options)

    }

}



const http = new HttpRequest()

export default http