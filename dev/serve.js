import Vue from "vue";
import Dev from "./serve.vue";
import Component1 from "./components/component1.vue";
import Component2 from "./components/component2.vue";

Vue.component("Component1", Component1);
Vue.component("Component2", Component2);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(Dev),
}).$mount("#app");
