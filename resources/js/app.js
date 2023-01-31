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
const router = createRouter({
    history: createWebHistory(),
    routes:routes
})
const app = createApp({});

app.component('component-app', App);
app.component('component-dashboard', dashboard);
app.component('component-welcome', welcome);
app.component('component-login', login);
app.component('component-register', register);

app.use(router);
app.mount('#app');
