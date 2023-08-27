import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from "element-plus";
import 'element-plus/dist/index.css'
import store from "./store";

const app = createApp(App);

app.config.errorHandler = err => {
    console.log(err);
}
app.use(ElementPlus)
app.use(store)

app.mount('#app')

// 注册应用范围内可用的资源，例如注册一个组件, 在应用的任何地方都是可用的
// app.component('Common', xx);

// createApp({
//     data() {
//         return {
//             count: 0
//         }
//     }
// }).mount('#app2')
