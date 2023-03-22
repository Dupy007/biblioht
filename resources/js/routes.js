const Welcome = () => import('./components/Welcome.vue')
const Dashboard = () => import('./components/Dashboard.vue')
const Mypyramid = () => import('./components/Mypyramid.vue')
const CategoryList = () => import('./components/Category/List.vue')
const CategoryCreate = () => import('./components/Category/Add.vue')
const CategoryEdit = () => import('./components/Category/Edit.vue')
const PyramidList = () => import('./components/Pyramid/List.vue')
const PyramidCreate = () => import('./components/Pyramid/Add.vue')
const PyramidEdit = () => import('./components/Pyramid/Edit.vue')
const UserList = () => import('./components/User/List.vue')
const UserCreate = () => import('./components/User/Add.vue')
const UserEdit = () => import('./components/User/Edit.vue')
const Profil = () => import('./components/User/Profil.vue')
const Pyramid_user = () => import('./components/User/Pyramid_user.vue')
const UserPyramidEdit = () => import('./components/UserPyramid/Edit.vue')
const Archived = () => import('./components/UserPyramid/Archived.vue')
import auth from './middleware/auth';
import admin from './middleware/admin';

export const routes = [
    {
        name: 'moi',
        path: '/mypyramid',
        component: Mypyramid,
        meta: {
            middleware: [ auth],
        },
    },
    {
        name: 'profil',
        path: '/profil',
        component: Profil,
        meta: {
            middleware: [auth],
        },
    },
    {
        name: 'dashboard',
        path: '/home',
        component: Dashboard,
        meta: {
            middleware: [auth],
        },
    },
    {
        name: 'home',
        path: '/index',
        component: Welcome
    },
    {
        name: 'categoryList',
        path: '/category',
        component: CategoryList,
        meta: {
            middleware: [ admin],
        },
    },
    {
        name: 'categoryEdit',
        path: '/category/:id/edit',
        component: CategoryEdit,
        meta: {
            middleware: [ admin],
        },
    },
    {
        name: 'categoryAdd',
        path: '/category/add',
        component: CategoryCreate,
        meta: {
            middleware: [ admin],
        },
    },
    {
        name: 'pyramidList',
        path: '/pyramid',
        component: PyramidList,
        meta: {
            middleware: [ admin],
        },
    },
    {
        name: 'pyramidEdit',
        path: '/pyramid/:id/edit',
        component: PyramidEdit,
        meta: {
            middleware: [ admin],
        },
    },
    {
        name: 'pyramidAdd',
        path: '/pyramid/add',
        component: PyramidCreate,
        meta: {
            middleware: [ admin],
        },
    },
    {
        name: 'userList',
        path: '/user',
        component: UserList,
        meta: {
            middleware: [ admin],
        },
    },
    {
        name: 'userEdit',
        path: '/user/:id/edit',
        component: UserEdit,
        meta: {
            middleware: [ admin],
        },
    },
    {
        name: 'userAdd',
        path: '/user/add',
        component: UserCreate,
        meta: {
            middleware: [ admin],
        },
    },
    {
        name: 'userpyramidEdit',
        path: '/userpyramid/:id/edit',
        component: UserPyramidEdit,
        meta: {
            middleware: [ admin],
        },
    },
    {
        name: 'Pyramid_user',
        path: '/user/:id/pyramid',
        component: Pyramid_user,
        meta: {
            middleware: [ admin],
        },
    },
    {
        name: 'Archived',
        path: '/archived',
        component: Archived,
        meta: {
            middleware: [ admin],
        },
    },

]
