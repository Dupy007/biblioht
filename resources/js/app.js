/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import './bootstrap';
import { createApp } from 'vue';

/**
 * Next, we will create a fresh Vue application instance. You may then begin
 * registering components with the application instance so they are ready
 * to use in your application's views. An example is included for you.
 */
import { createRouter, createWebHistory } from 'vue-router';
import App from './components/App.vue';
import dashboard from './components/Dashboard.vue';
import welcome from './components/Welcome.vue';
import login from './components/Login.vue';
import register from './components/Register.vue';
import {routes} from './routes';
import './jquery.js';
import SelectPicker from 'vue-bootstrap-selectpicker'
const router = createRouter({
    history: createWebHistory(),
    routes:routes
})
// Creates a `nextMiddleware()` function which not only
// runs the default `next()` callback but also triggers
// the subsequent Middleware function.
function nextFactory(context, middleware, index) {
    const subsequentMiddleware = middleware[index];
    // If no subsequent Middleware exists,
    // the default `next()` callback is returned.
    if (!subsequentMiddleware) return context.next;

    return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters);
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
    };
}
    
router.beforeEach((to, from, next) => {
    if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
        ? to.meta.middleware
        : [to.meta.middleware];

    const context = {
        from,
        next,
        router,
        to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware });
    }

    return next();
});
    
const app = createApp({});

app.component('component-app', App);
app.component('component-dashboard', dashboard);
app.component('component-welcome', welcome);
app.component('component-login', login);
app.component('component-register', register);
app.use(SelectPicker)
app.use(router);
app.mount('#app');
