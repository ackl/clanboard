import 'material-design-lite/material.css'
import 'material-design-lite/material.js'

import VueMdl from 'vue-mdl'
import Vue from 'vue'
import App from './components/App.vue'

Vue.use(VueMdl)

new Vue({
    el: 'body',
    components: {
        app: App
    }
})

