<template>
  <v-chart class="chart" :option="option" />
</template>

<script setup>
import { ref, computed } from "vue";

const data = ref([
  { age: '0', event: '出生' },
  { age: '6', event: '小学' },
  { age: '12', event: '中学' },
  { age: '15', event: '高中' },
  { age: '18', event: '大学' },
  { age: '21', event: '大四' },
]);

const option = computed(() => {
  const xAxisData = data.value.map(d => d.event);

  const meData = data.value.map(d => Number(d.age));
  const fatherData = [29, 35, 41, 44, 47, 50];
  const motherData = [32, 38, 44, 47, 50, 53];
  const sisterData = [6, 12, 18, 21, 24, 27];

  return {
    title: {
      text: '一家人的年龄历程',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['me', 'father', 'mother', 'sister'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xAxisData,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'me',
        type: 'line',
        data: meData,
      },
      {
        name: 'father',
        type: 'line',
        data: fatherData,
      },
      {
        name: 'mother',
        type: 'line',
        data: motherData,
      },
      {
        name: 'sister',
        type: 'line',
        data: sisterData,
      },
    ],
  };
});

</script>

<style scoped>
.chart {
  height: 600px;
  margin-top: 100px;
}
</style>
