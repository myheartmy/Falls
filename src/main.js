import Vue from 'vue'
import App from './App.vue'
import { Lazyload } from 'vant'

Vue.config.productionTip = false

Vue.use(Lazyload);

new Vue({
  render: h => h(App),
}).$mount('#app')
