import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(Element);

// const express = require('express');
// const cors = require('cors');
//
// const app = express();
//
// // 使用 CORS 中间件
// app.use(cors());
//
// // 启动服务器
// app.listen(8081, () => {
//   console.log('Server is running on http://localhost:8081');
// });

new Vue({
  render: h => h(App),
}).$mount('#app')
