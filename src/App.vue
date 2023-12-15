<template>
  <div>
    <div>
      <label for="event">Event:(出生、小事件、小学、中学...)</label>
      <input v-model="event" id="event" />
    </div>

    <!-- 默认显示的输入框 -->
    <div v-for="legend in legends" :key="legend">
      <label :for="`${legend}Age`">{{ `${legend} Age:` }}</label>
      <input v-model="formData[legend]" :id="`${legend}Age`" />
    </div>

    <!-- 添加新的 legend 按钮 -->
    <button @click="addLegend">Add Legend</button>

    <button @click="addData">Add Data</button>

    <v-chart class="chart" :option="option" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const data = ref([]);

const event = ref("");
const formData = ref({
  me: "",
  father: "",
  mother: "",
  sister: "",
});
const legends = ref(["me", "father", "mother"]);

const addLegend = () => {
  const newLegend = prompt('Enter a new legend:');
  if (newLegend && !legends.value.includes(newLegend)) {
    legends.value.push(newLegend);
    formData.value[newLegend] = ""; // 初始化新 legend 的值
  }
};

const addData = () => {
  const newData = {
    event: event.value,
  };

  // 将 formData 中的值添加到 newData
  legends.value.forEach((legend) => {
    newData[legend] = Number(formData.value[legend]) || null;
  });

  data.value.push(newData);

  // 清空输入框
  event.value = "";
  legends.value.forEach((legend) => {
    formData.value[legend] = "";
  });
};

const option = computed(() => {
  const xAxisData = data.value.map((d) => d.event);

  const series = legends.value.map((legend) => ({
    name: legend,
    type: 'line',
    data: data.value.map((d) => d[legend] || null),
  }));

  return {
    title: {
      text: '一家人的年龄历程',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: legends.value,
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
    series,
  };
});

</script>

<style scoped>
.chart {
  height: 600px;
  margin-top: 100px;
}
</style>
