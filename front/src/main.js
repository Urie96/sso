import Vue from 'vue';
import { Card, Form, FormItem, Input, Button, Icon, Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/form.css';
import 'element-ui/lib/theme-chalk/form-item.css';
import 'element-ui/lib/theme-chalk/input.css';
import 'element-ui/lib/theme-chalk/icon.css';
import 'element-ui/lib/theme-chalk/message.css';
import App from './App.vue';

Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Icon);
Vue.prototype.$message = Message;

Vue.config.productionTip = false;

new Vue({
  render: function(h) {
    return h(App);
  },
}).$mount('#app');
