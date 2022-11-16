import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import components from '@/components/UI/index'

import '@/assets/sass/main.scss'

Vue.config.productionTip = false

const app = new Vue({
  router,
  store,
  render: (h) => h(App),
})

components.forEach(component => {
  Vue.component(component.name, component)
})

app.$mount('#app')
