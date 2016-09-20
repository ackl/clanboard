import 'material-design-lite/material.css';
import 'material-design-lite/material.js';
import App from './components/App.vue';
import Thread from './components/Thread.vue';
import ThreadList from './components/ThreadList.vue';

import Vue from 'vue';
import VueMdl from 'vue-mdl';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

Vue.use(VueMdl);
Vue.use(VueResource);
Vue.use(VueRouter);


const router = new VueRouter();
router.map({
    '/': {
        name: 'home',
        component: ThreadList
    },
    '/thread/:threadId': {
        name: 'thread',
        component: Thread
    }
});

window.vm = new Vue({
    el: 'body',
    components: {
        app: router.start(App, 'app')
    }
});
