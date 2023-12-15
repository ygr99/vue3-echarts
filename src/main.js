// main.js or your entry file
import { createApp } from 'vue'
import App from './App.vue'
import ECharts from 'vue-echarts'
import 'echarts'

// Import ECharts modules manually to reduce bundle size
// import 'echarts/lib/chart/line'
// import 'echarts/lib/component/grid'
// import 'echarts/lib/component/tooltip'

createApp(App)
    .component('v-chart', ECharts)
    .mount('#app');

