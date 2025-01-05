<script setup lang="ts">
import { ref } from 'vue'
import { use } from "echarts/core"
import { CanvasRenderer } from "echarts/renderers"
import { LineChart } from "echarts/charts"
import { GridComponent, TooltipComponent, LegendComponent } from "echarts/components"
import VChart from "vue-echarts"

use([
  CanvasRenderer,
  LineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
])

const metrics = ref([
  { name: 'CPU 使用率', value: '45%', trend: 'up' },
  { name: '内存使用率', value: '60%', trend: 'down' },
  { name: '网络延迟', value: '120ms', trend: 'stable' },
  { name: '磁盘使用率', value: '75%', trend: 'up' },
])

const performanceData = ref({
  title: { text: '系统性能监控' },
  tooltip: { trigger: 'axis' },
  legend: { data: ['响应时间', '请求数'] },
  xAxis: { type: 'category', data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'] },
  yAxis: [
    { type: 'value', name: '响应时间(ms)' },
    { type: 'value', name: '请求数' }
  ],
  series: [
    {
      name: '响应时间',
      type: 'line',
      smooth: true,
      data: [120, 132, 101, 134, 90, 230]
    },
    {
      name: '请求数',
      type: 'line',
      smooth: true,
      yAxisIndex: 1,
      data: [220, 182, 191, 234, 290, 330]
    }
  ]
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold text-gray-900">数据监控</h1>
      <div class="flex space-x-4">
        <select class="rounded-md border-gray-300 shadow-sm">
          <option>最近 1 小时</option>
          <option>最近 24 小时</option>
          <option>最近 7 天</option>
        </select>
        <button class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
          刷新
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="metric in metrics" :key="metric.name" class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-sm font-medium text-gray-500">{{ metric.name }}</h3>
        <p class="mt-2 text-3xl font-semibold text-gray-900">{{ metric.value }}</p>
      </div>
    </div>

    <div class="bg-white p-6 rounded-lg shadow">
      <v-chart class="h-96" :option="performanceData" />
    </div>
  </div>
</template>