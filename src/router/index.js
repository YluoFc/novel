import Vue from "vue"
import Login from "@/views/Login"
import VueRouter from 'vue-router';
import Home from '@/views/Home'


Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/books',
        name: 'Books',
        component: Books
    },
    {
        path: 'user',
        name: 'User',
        component: User
    }
]

const router = new VueRouter({
    routes
})

export default router