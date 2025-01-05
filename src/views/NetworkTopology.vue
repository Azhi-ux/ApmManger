<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { use } from "echarts/core"
import { CanvasRenderer } from "echarts/renderers"
import { GraphChart } from "echarts/charts"
import { TooltipComponent, LegendComponent } from "echarts/components"
import VChart from "vue-echarts"

use([
  CanvasRenderer,
  GraphChart,
  TooltipComponent,
  LegendComponent,
])

const topologyData = ref({
  tooltip: {},
  legend: [{
    data: ['服务', '数据库', '缓存', '消息队列']
  }],
  series: [{
    type: 'graph',
    layout: 'force',
    data: [
      { name: '用户服务', value: 'user-service', category: 0, symbolSize: 50 },
      { name: 'MySQL', value: 'mysql', category: 1, symbolSize: 40 },
      { name: 'Redis', value: 'redis', category: 2, symbolSize: 40 },
      { name: 'RabbitMQ', value: 'rabbitmq', category: 3, symbolSize: 40 },
      { name: '订单服务', value: 'order-service', category: 0, symbolSize: 50 },
    ],
    categories: [
      { name: '服务' },
      { name: '数据库' },
      { name: '缓存' },
      { name: '消息队列' }
    ],
    links: [
      { source: '用户服务', target: 'MySQL' },
      { source: '用户服务', target: 'Redis' },
      { source: '订单服务', target: 'MySQL' },
      { source: '订单服务', target: 'RabbitMQ' },
    ],
    label: {
      show: true,
      position: 'right'
    },
    force: {
      repulsion: 1000,
      edgeLength: 200
    }
  }]
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold text-gray-900">网络拓扑</h1>
      <div class="flex space-x-4">
        <button class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
          刷新拓扑图
        </button>
      </div>
    </div>

    <div class="bg-white p-6 rounded-lg shadow">
      <v-chart class="h-[600px]" :option="topologyData" />
    </div>
  </div>
</template>