<template>
  <div>
    <div>
      <label for="event">Event:</label>
      <input v-model="event" id="event" />
    </div>
    <div>
      <label for="meAge">Me Age:</label>
      <input v-model="meAge" id="meAge" />
    </div>
    <div>
      <label for="fatherAge">Father Age:</label>
      <input v-model="fatherAge" id="fatherAge" />
    </div>
    <div>
      <label for="motherAge">Mother Age:</label>
      <input v-model="motherAge" id="motherAge" />
    </div>
    <div>
      <label for="sisterAge">Sister Age:</label>
      <input v-model="sisterAge" id="sisterAge" />
    </div>
    <button @click="addData">Add Data</button>

    <v-chart class="chart" :option="option" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const data = ref([]);

const event = ref("");
const meAge = ref("");
const fatherAge = ref("");
const motherAge = ref("");
const sisterAge = ref("");

const addData = () => {
  data.value.push({
    event: event.value,
    me: Number(meAge.value),
    father: Number(fatherAge.value),
    mother: Number(motherAge.value),
    sister: Number(sisterAge.value),
  });

  // 清空输入框
  event.value = "";
  meAge.value = "";
  fatherAge.value = "";
  motherAge.value = "";
  sisterAge.value = "";
};

const option = computed(() => {
  const xAxisData = data.value.map((d) => d.event);

  const meData = data.value.map((d) => d.me);
  const fatherData = data.value.map((d) => d.father);
  const motherData = data.value.map((d) => d.mother);
  const sisterData = data.value.map((d) => d.sister);

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
5