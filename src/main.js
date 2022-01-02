import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {postRequest} from "@/utils/api";

Vue.config.productionTip = false

Vue.use(ElementUI);

Vue.prototype.postRequest = postRequest;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
