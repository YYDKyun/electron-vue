// router/index.ts
import {createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw} from 'vue-router'
import Home from '@/view/home.vue'
import PrincipalDeduction from '@/view/principalDeduction.vue'
import Layout from '@/components/layout/layout.vue'

const routes: Array<AppRouteRecordRaw> = [

    {
        path: '/',
        name: 'Layout',
        component: Layout,
        redirect: '/principalDeduction',
        meta: {title: '计算工具', icon: 'el-icon-Grid'},
        children: [
            {
                path: 'principalDeduction',
                name: '本金抵扣',
                component: PrincipalDeduction,
                meta: {title: '本金抵扣', icon: 'calculator'}
            },
            {
                path: 'tree',
                name: 'TREE',
                component: Home,
                meta: {title: '测试', icon: 'el-icon-Plus'}
            }
        ],
    },
]

const router = createRouter({
    //这里改成hash就会出现有进程没界面
    history: createWebHashHistory(import.meta.env.RENDERER_VITE_BASE_API),
    //但是history打包后会白屏
    routes: routes as RouteRecordRaw[]
})

export default router
