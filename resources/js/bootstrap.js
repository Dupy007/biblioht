import _ from 'lodash';
window._ = _;

import 'bootstrap';
/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */
import axios from 'axios';
window.axios = axios;
import { ref } from 'vue'
window.ref = ref;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.withCredentials = true;

// import Echo from 'laravel-echo';
// import Pusher from 'pusher-js';

// window.Pusher = Pusher;

// window.Echo = new Echo({
//     // broadcaster: 'pusher',
//     // key: import.meta.env.VITE_PUSHER_APP_KEY,
//     // wsHost: import.meta.env.VITE_PUSHER_HOST ?? `ws-${import.meta.env.VITE_PUSHER_APP_CLUSTER}.pusher.com`,
//     // wsPort: import.meta.env.VITE_PUSHER_PORT ?? 80,
//     // wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
//     // forceTLS: (import.meta.env.VITE_PUSHER_SCHEME ?? 'https') === 'https',
//     // enabledTransports: ['ws', 'wss'],
//     // disableStats: true,
//     // cluster:import.meta.env.VITE_PUSHER_APP_CLUSTER,//added this line
//     broadcaster: 'pusher',
//     key: "be4def7ebf6ec62b59a1",
//     cluster: 'mt1',
//     forceTLS: true
// });
// console.log(window.Echo);
// // Pusher.logToConsole = true;

// // window.pusher = new Pusher('be4def7ebf6ec62b59a1', {
// //   cluster: 'mt1'
// // });
