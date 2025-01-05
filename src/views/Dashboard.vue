<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { use } from "echarts/core"
import { CanvasRenderer } from "echarts/renderers"
import { LineChart, PieChart } from "echarts/charts"
import { GridComponent, TooltipComponent, LegendComponent } from "echarts/components"
import VChart from "vue-echarts"
import { ref as vueRef } from 'vue'

use([
  CanvasRenderer,
  LineChart,
  PieChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
])

const cpuData = vueRef({
  title: { text: 'CPU 使用率' },
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', data: ['12:00', '13:00', '14:00', '15:00', '16:00'] },
  yAxis: { type: 'value' },
  series: [{
    data: [30, 45, 62, 38, 55],
    type: 'line',
    smooth: true
  }]
})

const memoryData = vueRef({
  title: { text: '内存使用情况' },
  tooltip: { trigger: 'item' },
  legend: { orient: 'vertical', left: 'left' },
  series: [{
    type: 'pie',
    radius: '50%',
    data: [
      { value: 60, name: '已使用' },
      { value: 40, name: '可用' },
    ]
  }]
})
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-semibold text-gray-900">系统概览</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white p-6 rounded-lg shadow">
        <v-chart class="h-80" :option="cpuData" />
      </div>
      <div class="bg-white p-6 rounded-lg shadow">
        <v-chart class="h-80" :option="memoryData" />
      </div>
    </div>
  </div>
</template>