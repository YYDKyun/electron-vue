// router/index.ts
import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Home from '@/view/home.vue'
import Test from '@/view/test.vue'
import Main from '@/components/layout/main.vue'

const routes: Array<RouteRecordRaw> = [
    // {
    //   path: '/',
    //   name: 'Home',
    //   component: Home
    // },
    {
        path: '/test',
        name: 'Test',
        component: Test
    },
    {
        path: '/main/:',
        name: 'Main',
        component: Main
    },
    {
        path: '/',
        redirect: '/main'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
