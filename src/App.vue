<template>
  <v-chart class="chart" :option="option" />
</template>

<script setup>
import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
  LineChart,
  CanvasRenderer
])





const option = {
  title: {
    text: '一家人的年龄历程'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['me', 'father', 'mother', 'sister']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['出生','小学', '中学', '高中', '大学', '大四']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'me',
      type: 'line',
      data: [0, 6, 12, 15, 18, 21]
    },
    {
      name: 'father',
      type: 'line',
      data: [29,35,41,44,47,50 ]
    },
    {
      name: 'mother',
      type: 'line',
      data: [32,38,44,47,50,53]
    },
    {
      name: 'sister',
      type: 'line',
      data: [6,12,18,21,24,27]
    }
  ]
};
</script>

<style scoped>
.chart {
  height: 600px;
  margin-top: 100px;
}
</style>