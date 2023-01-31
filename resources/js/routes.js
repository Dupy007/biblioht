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
const UserPyramidEdit = () => import('./components/UserPyramid/Edit.vue')

export const routes = [
    {
        name: 'moi',
        path: '/mypyramid',
        component: Mypyramid
    },
    {
        name: 'dashboard',
        path: '/',
        component: Dashboard
    },
    {
        name: 'home',
        path: '/index',
        component: Welcome
    },
    {
        name: 'categoryList',
        path: '/category',
        component: CategoryList
    },
    {
        name: 'categoryEdit',
        path: '/category/:id/edit',
        component: CategoryEdit
    },
    {
        name: 'categoryAdd',
        path: '/category/add',
        component: CategoryCreate
    },
    {
        name: 'pyramidList',
        path: '/pyramid',
        component: PyramidList
    },
    {
        name: 'pyramidEdit',
        path: '/pyramid/:id/edit',
        component: PyramidEdit
    },
    {
        name: 'pyramidAdd',
        path: '/pyramid/add',
        component: PyramidCreate
    },
    {
        name: 'userList',
        path: '/user',
        component: UserList
    },
    {
        name: 'userEdit',
        path: '/user/:id/edit',
        component: UserEdit
    },
    {
        name: 'userAdd',
        path: '/user/add',
        component: UserCreate
    },
    {
        name: 'userpyramidEdit',
        path: '/userpyramid/:id/edit',
        component: UserPyramidEdit
    },

]
