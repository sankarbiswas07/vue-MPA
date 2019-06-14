import Vue from "vue";

import router from '../../router';

import About from '../../components/master/About.vue';

Vue.config.productionTip = false;

new Vue({
  render: h => h(About),
  router,
}).$mount(`#about`);
