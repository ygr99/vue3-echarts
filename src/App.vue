<template>
  <div>
    <div class="input-container">
      <textarea class="user-input" v-model="userInput" placeholder="输入 JSON 格式的数据数组"></textarea>
      <button class="update-button" @click="updateChartData">更新图表</button>
    </div>
    <v-chart class="chart" :option="option" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const initialData = ([
      { "age": "0", "event": "出生", "me": 0, "father": 29, "mother": 32, "sister": 6 },
      { "age": "6", "event": "小学", "me": 6, "father": 35, "mother": 38, "sister": 12 },
      { "age": "12", "event": "中学", "me": 12, "father": 41, "mother": 44, "sister": 18 },
      { "age": "15", "event": "高中", "me": 15, "father": 44, "mother": 47, "sister": 21 },
      { "age": "18", "event": "大学", "me": 18, "father": 47, "mother": 50, "sister": 24 },
      { "age": "21", "event": "大四", "me": 21, "father": 50, "mother": 53, "sister": 27 },
      { "age": "21.12", "event": "制作一家人的年龄折线图", "me": 21.12, "father": 50, "mother": 53, "sister": 27 }
    ]);

const initialData1 = ([
  { "event": "出生","age": "0",  "me": 0, "father": "", "mother": "" },
  { "event": "小学","age": "6",  "me": 6, "father": "", "mother": ""  },
  { "event": "中学","age": "12",  "me": 12, "father": "", "mother": "" },
  { "event": "高中","age": "15",  "me": 15, "father":"" , "mother": ""}
]);

const data = ref(initialData);

const userInput = ref(formatData(initialData1));

const option = computed(() => {
  const xAxisData = data.value.map(d => d.event);

  const seriesData = Object.keys(data.value[0])
      .filter(key => key !== 'age' && key !== 'event') // Exclude 'age' and 'event' from series
      .map(key => ({
        name: key,
        type: 'line',
        data: data.value.map(d => d[key]),
      }));

  return {
    title: {
      text: ' ',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: seriesData.map(series => series.name), // Dynamically set legend data
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
    series: seriesData,
  };
});


const updateChartData = () => {
  try {
    const newDataArray = JSON.parse(userInput.value);
    data.value = newDataArray;
  } catch (error) {
    console.error('无效的 JSON 格式');
  }
};

function formatData(data) {
  const formattedData = data.map(item => JSON.stringify(item));
  return `[\n  ${formattedData.join(',\n  ')}\n]`;
}

</script>

<style scoped>
.chart {
  height: 600px;
  margin-top: 100px;
}

.input-container {
  margin-top: 20px;
  text-align: center;
}

.user-input {
  white-space: nowrap;
  padding: 5px 15px;
  line-height: 1.5;
  width: 800px;
  height: 300px;
  font-family: Consolas;
  font-size: 14px;
  box-shadow: none;
  border-color: #ccc;
}

.user-input:focus {
  box-shadow: none;
  border-color: mediumseagreen;
}

.update-button {
  padding: 8px 16px;
  font-size: 14px;
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
