<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { use } from "echarts/core"
import { CanvasRenderer } from "echarts/renderers"
import { GraphChart } from "echarts/charts"
import {TooltipComponent, LegendComponent, ToolboxComponent} from "echarts/components"
import VChart from "vue-echarts"

use([
  CanvasRenderer,
  GraphChart,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent
])

const selectedCluster = ref('all')
const searchQuery = ref('')
const showDetails = ref(false)
const selectedNode = ref(null)

const clusters = ref([
  {id: 'all', name: '全部集群'},
  {id: 'prod', name: '生产环境'},
  {id: 'test', name: '测试环境'},
  {id: 'dev', name: '开发环境'}
])

const topologyData = ref({
  tooltip: {
    formatter: (params: any) => {
      const data = params.data
      return `
        <div class="p-2">
          <div class="font-bold">${data.name}</div>
          <div>状态: ${data.status}</div>
          <div>CPU: ${data.metrics?.cpu || '-'}</div>
          <div>内存: ${data.metrics?.memory || '-'}</div>
        </div>
      `
    }
  },
  toolbox: {
    feature: {
      restore: {},
      saveAsImage: {}
    }
  },
  legend: [{
    data: ['主节点', '从节点', '数据库', '缓存', '消息队列', '负载均衡器'],
    orient: 'vertical',
    left: 'left',
    top: 'center'
  }],
  series: [{
    type: 'graph',
    layout: 'force',
    animation: true,
    draggable: true,
    roam: true,
    force: {
      repulsion: 400,
      gravity: 0.1,
      edgeLength: 120,
      layoutAnimation: true
    },
    data: [
      {
        name: 'Master-1',
        category: 0,
        symbolSize: 50,
        status: '运行中',
        metrics: {cpu: '45%', memory: '60%'},
        itemStyle: {color: '#34d399'}
      },
      {
        name: 'Master-2',
        category: 0,
        symbolSize: 50,
        status: '运行中',
        metrics: {cpu: '38%', memory: '55%'},
        itemStyle: {color: '#34d399'}
      },
      {
        name: 'Worker-1',
        category: 1,
        symbolSize: 40,
        status: '运行中',
        metrics: {cpu: '78%', memory: '82%'},
        itemStyle: {color: '#fbbf24'}
      },
      {
        name: 'Worker-2',
        category: 1,
        symbolSize: 40,
        status: '运行中',
        metrics: {cpu: '42%', memory: '45%'},
        itemStyle: {color: '#34d399'}
      },
      {
        name: 'MySQL主库',
        category: 2,
        symbolSize: 45,
        status: '运行中',
        metrics: {cpu: '65%', memory: '70%'},
        itemStyle: {color: '#60a5fa'}
      },
      {
        name: 'MySQL从库',
        category: 2,
        symbolSize: 45,
        status: '运行中',
        metrics: {cpu: '45%', memory: '50%'},
        itemStyle: {color: '#60a5fa'}
      },
      {
        name: 'Redis集群',
        category: 3,
        symbolSize: 45,
        status: '运行中',
        metrics: {cpu: '35%', memory: '75%'},
        itemStyle: {color: '#f87171'}
      },
      {
        name: 'RabbitMQ',
        category: 4,
        symbolSize: 45,
        status: '运行中',
        metrics: {cpu: '28%', memory: '45%'},
        itemStyle: {color: '#818cf8'}
      },
      {
        name: 'Nginx-LB',
        category: 5,
        symbolSize: 45,
        status: '运行中',
        metrics: {cpu: '32%', memory: '40%'},
        itemStyle: {color: '#a78bfa'}
      }
    ],
    categories: [
      {name: '主节点'},
      {name: '从节点'},
      { name: '数据库' },
      { name: '缓存' },
      {name: '消息队列'},
      {name: '负载均衡器'}
    ],
    links: [
      {source: 'Nginx-LB', target: 'Master-1'},
      {source: 'Nginx-LB', target: 'Master-2'},
      {source: 'Master-1', target: 'Worker-1'},
      {source: 'Master-1', target: 'Worker-2'},
      {source: 'Master-2', target: 'Worker-1'},
      {source: 'Master-2', target: 'Worker-2'},
      {source: 'Worker-1', target: 'MySQL主库'},
      {source: 'Worker-2', target: 'MySQL主库'},
      {source: 'MySQL主库', target: 'MySQL从库'},
      {source: 'Worker-1', target: 'Redis集群'},
      {source: 'Worker-2', target: 'Redis集群'},
      {source: 'Worker-1', target: 'RabbitMQ'},
      {source: 'Worker-2', target: 'RabbitMQ'}
    ],
    lineStyle: {
      color: '#cbd5e1',
      width: 2,
      curveness: 0.2
    },
    label: {
      show: true,
      position: 'right',
      formatter: '{b}',
      fontSize: 12
    },
    emphasis: {
      focus: 'adjacency',
      lineStyle: {
        width: 4
      }
    }
  }]
})

const handleNodeClick = (node: any) => {
  selectedNode.value = node
  showDetails.value = true
}

const getStatusColor = (status: string) => {
  switch (status) {
    case '运行中':
      return 'bg-green-100 text-green-800'
    case '警告':
      return 'bg-yellow-100 text-yellow-800'
    case '错误':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">网络拓扑</h1>
        <p class="mt-1 text-sm text-gray-500">查看和管理系统网络拓扑结构</p>
      </div>
      <div class="flex space-x-3">
        <select
            v-model="selectedCluster"
            class="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option v-for="cluster in clusters" :key="cluster.id" :value="cluster.id">
            {{ cluster.name }}
          </option>
        </select>
        <button
            class="px-4 py-2 bg-primary-600 text-white rounded-md shadow-sm text-sm font-medium hover:bg-primary-700">
          刷新拓扑图
        </button>
      </div>
    </div>

    <div class="flex gap-6">
      <!-- Main Topology Chart -->
      <div class="flex-1 bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="p-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-medium text-gray-900">集群拓扑图</h3>
            <div class="flex items-center space-x-2">
              <span class="flex items-center text-sm text-gray-500">
                <span class="w-3 h-3 rounded-full bg-green-400 mr-1"></span>
                正常
              </span>
              <span class="flex items-center text-sm text-gray-500">
                <span class="w-3 h-3 rounded-full bg-yellow-400 mr-1"></span>
                警告
              </span>
              <span class="flex items-center text-sm text-gray-500">
                <span class="w-3 h-3 rounded-full bg-red-400 mr-1"></span>
                错误
              </span>
            </div>
          </div>
        </div>
        <v-chart class="h-[600px]" :option="topologyData" @click="handleNodeClick"/>
      </div>

      <!-- Node Details Panel -->
      <div v-if="showDetails" class="w-80 bg-white rounded-lg shadow-lg">
        <div class="p-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-medium text-gray-900">节点详情</h3>
            <button
                @click="showDetails = false"
                class="text-gray-400 hover:text-gray-500"
            >
              <span class="sr-only">关闭</span>
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>
        <div class="p-4 space-y-4" v-if="selectedNode">
          <div>
            <label class="text-sm font-medium text-gray-500">节点名称</label>
            <p class="mt-1 text-sm text-gray-900">{{ selectedNode.name }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-500">状态</label>
            <p class="mt-1">
              <span :class="[getStatusColor(selectedNode.status), 'px-2 py-1 rounded-full text-xs font-medium']">
                {{ selectedNode.status }}
              </span>
            </p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-500">性能指标</label>
            <div class="mt-2 space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500">CPU 使用率</span>
                <span class="text-sm font-medium text-gray-900">{{ selectedNode.metrics?.cpu }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500">内存使用率</span>
                <span class="text-sm font-medium text-gray-900">{{ selectedNode.metrics?.memory }}</span>
              </div>
            </div>
          </div>
          <div class="pt-4 border-t border-gray-200">
            <button
                class="w-full px-4 py-2 bg-primary-600 text-white rounded-md shadow-sm text-sm font-medium hover:bg-primary-700">
              查看详细信息
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
