<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { use } from "echarts/core"
import { CanvasRenderer } from "echarts/renderers"
import {LineChart, PieChart, BarChart} from "echarts/charts"
import {GridComponent, TooltipComponent, LegendComponent, TitleComponent} from "echarts/components"
import VChart from "vue-echarts"
import { ref as vueRef } from 'vue'

use([
  CanvasRenderer,
  LineChart,
  PieChart,
  BarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent
])

const systemStatus = ref([
  {name: 'CPU使用率', value: '45%', trend: 'up', color: 'text-green-500'},
  {name: '内存使用', value: '6.2GB', trend: 'stable', color: 'text-blue-500'},
  {name: '磁盘使用率', value: '72%', trend: 'up', color: 'text-yellow-500'},
  {name: '网络流量', value: '1.2GB/s', trend: 'down', color: 'text-purple-500'}
])

const recentAlerts = ref([
  {id: 1, type: '警告', message: 'CPU使用率超过阈值', time: '10分钟前', status: 'warning'},
  {id: 2, type: '错误', message: '数据库连接异常', time: '30分钟前', status: 'error'},
  {id: 3, type: '信息', message: '系统更新完成', time: '1小时前', status: 'info'}
])

const cpuData = vueRef({
  title: {text: 'CPU 使用率趋势', left: 'center'},
  tooltip: { trigger: 'axis' },
  grid: {top: 40, right: 20, bottom: 20, left: 40},
  xAxis: {
    type: 'category',
    data: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
    axisLabel: {interval: 0}
  },
  yAxis: {type: 'value', max: 100},
  series: [{
    name: 'CPU使用率',
    data: [30, 45, 62, 38, 55, 48, 60, 42],
    type: 'line',
    smooth: true,
    areaStyle: {
      opacity: 0.2
    },
    lineStyle: {
      width: 3
    }
  }]
})

const memoryData = vueRef({
  title: {text: '内存分配', left: 'center'},
  tooltip: { trigger: 'item' },
  legend: {orient: 'vertical', left: 'left', top: 'center'},
  series: [{
    type: 'pie',
    radius: ['40%', '70%'],
    avoidLabelOverlap: false,
    itemStyle: {
      borderRadius: 10,
      borderColor: '#fff',
      borderWidth: 2
    },
    label: {
      show: false,
      position: 'center'
    },
    emphasis: {
      label: {
        show: true,
        fontSize: '20',
        fontWeight: 'bold'
      }
    },
    labelLine: {
      show: false
    },
    data: [
      {value: 4.8, name: '应用程序'},
      {value: 2.2, name: '系统进程'},
      {value: 1.2, name: '缓存'},
      {value: 3.8, name: '可用内存'}
    ]
  }]
})

const networkData = vueRef({
  title: {text: '网络流量', left: 'center'},
  tooltip: {trigger: 'axis'},
  legend: {data: ['入站流量', '出站流量'], bottom: 0},
  grid: {top: 40, right: 20, bottom: 40, left: 40},
  xAxis: {type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']},
  yAxis: {type: 'value'},
  series: [
    {
      name: '入站流量',
      type: 'bar',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: '出站流量',
      type: 'bar',
      data: [220, 182, 191, 234, 290, 330, 310]
    }
  ]
})
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">系统概览</h1>
        <p class="mt-1 text-sm text-gray-500">实时监控系统性能指标</p>
      </div>
      <div class="flex space-x-3">
        <button
            class="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
          导出报告
        </button>
        <button
            class="px-4 py-2 bg-primary-600 text-white rounded-md shadow-sm text-sm font-medium hover:bg-primary-700">
          刷新数据
        </button>
      </div>
    </div>

    <!-- Status Cards -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div v-for="item in systemStatus" :key="item.name"
           class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-500 truncate">
                {{ item.name }}
              </p>
              <p class="mt-1 text-3xl font-semibold" :class="item.color">
                {{ item.value }}
              </p>
            </div>
            <div class="flex">
              <span v-if="item.trend === 'up'" class="text-green-500">↑</span>
              <span v-else-if="item.trend === 'down'" class="text-red-500">↓</span>
              <span v-else class="text-gray-500">→</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Grid -->
    <div class="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <div class="bg-white rounded-lg shadow">
        <v-chart class="h-80" :option="cpuData" />
      </div>
      <div class="bg-white rounded-lg shadow">
        <v-chart class="h-80" :option="memoryData" />
      </div>
      <div class="bg-white rounded-lg shadow lg:col-span-2">
        <v-chart class="h-80" :option="networkData"/>
      </div>
    </div>

    <!-- Recent Alerts -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">最近告警</h3>
      </div>
      <div class="divide-y divide-gray-200">
        <div v-for="alert in recentAlerts" :key="alert.id" class="px-4 py-4 sm:px-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <span
                  :class="{
                  'bg-yellow-100 text-yellow-800': alert.status === 'warning',
                  'bg-red-100 text-red-800': alert.status === 'error',
                  'bg-blue-100 text-blue-800': alert.status === 'info'
                }"
                  class="px-2.5 py-0.5 rounded-full text-xs font-medium"
              >
                {{ alert.type }}
              </span>
              <p class="ml-3 text-sm text-gray-900">{{ alert.message }}</p>
            </div>
            <p class="text-sm text-gray-500">{{ alert.time }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
