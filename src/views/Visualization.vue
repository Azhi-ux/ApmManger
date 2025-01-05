<script setup lang="ts">
import { ref } from 'vue'
import { use } from "echarts/core"
import { CanvasRenderer } from "echarts/renderers"
import { LineChart, BarChart, PieChart } from "echarts/charts"
import { GridComponent, TooltipComponent, LegendComponent } from "echarts/components"
import VChart from "vue-echarts"

use([
  CanvasRenderer,
  LineChart,
  BarChart,
  PieChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
])

const responseTimeData = ref({
  title: { text: '服务响应时间趋势' },
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
  yAxis: { type: 'value' },
  series: [{
    data: [120, 200, 150, 80, 70, 110, 130],
    type: 'line',
    smooth: true
  }]
})

const errorRateData = ref({
  title: { text: '错误率分布' },
  tooltip: { trigger: 'item' },
  legend: { orient: 'vertical', left: 'left' },
  series: [{
    type: 'pie',
    radius: '50%',
    data: [
      { value: 60, name: '正常请求' },
      { value: 20, name: '超时' },
      { value: 15, name: '服务错误' },
      { value: 5, name: '其他错误' }
    ]
  }]
})

const throughputData = ref({
  title: { text: '系统吞吐量' },
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'] },
  yAxis: { type: 'value' },
  series: [{
    data: [820, 932, 901, 934, 1290, 1330],
    type: 'bar'
  }]
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold text-gray-900">可视化仪表盘</h1>
      <div class="flex space-x-4">
        <select class="rounded-md border-gray-300 shadow-sm">
          <option>最近 24 小时</option>
          <option>最近 7 天</option>
          <option>最近 30 天</option>
        </select>
        <button class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
          导出报告
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white p-6 rounded-lg shadow">
        <v-chart class="h-80" :option="responseTimeData" />
      </div>
      <div class="bg-white p-6 rounded-lg shadow">
        <v-chart class="h-80" :option="errorRateData" />
      </div>
      <div class="bg-white p-6 rounded-lg shadow col-span-2">
        <v-chart class="h-80" :option="throughputData" />
      </div>
    </div>
  </div>
</template>