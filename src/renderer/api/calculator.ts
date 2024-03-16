import http from '../utils/request.ts'

export function amountPerPeriod(param: any){
    return http.request({
        url: '/usury/spill',
        method: 'post',
        data: param
    })
}