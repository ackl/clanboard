import 'material-design-lite/material.css'
import 'material-design-lite/material.js'

import App from './components/App.vue'

import Vue from 'vue'
import VueMdl from 'vue-mdl'
import VueResource from 'vue-resource'

Vue.use(VueMdl)
Vue.use(VueResource)

window.vm = new Vue({
    el: 'body',
    components: {
        app: App
    }
})
