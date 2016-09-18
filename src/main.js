import Vue from 'vue'
import VueResource from 'vue-resource'
import VueMdl from 'vue-mdl'

import 'material-design-lite/material.css'
import 'material-design-lite/material.js'

import App from './components/App.vue'

Vue.use(VueResource)
Vue.use(VueMdl)

new Vue({
    el: 'body',
    components: {
        app: App
    }
})

