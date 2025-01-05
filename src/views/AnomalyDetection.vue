<script setup lang="ts">
import { ref } from 'vue'

const anomalies = ref([
  {
    id: 1,
    service: '用户服务',
    type: '内存泄漏',
    severity: 'high',
    timestamp: '2024-03-15 14:30:00',
    description: '检测到内存使用持续增长，可能存在内存泄漏',
    suggestion: '检查用户服务中的资源释放逻辑，特别是长时间运行的事务'
  },
  {
    id: 2,
    service: '订单服务',
    type: 'CPU 峰值',
    severity: 'medium',
    timestamp: '2024-03-15 13:45:00',
    description: 'CPU 使用率突然升高到 90%',
    suggestion: '优化订单处理逻辑，考虑增加缓存层'
  }
])

const severityClass = (severity: string) => {
  switch (severity) {
    case 'high':
      return 'bg-red-100 text-red-800'
    case 'medium':
      return 'bg-yellow-100 text-yellow-800'
    case 'low':
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold text-gray-900">异常检测</h1>
      <div class="flex space-x-4">
        <select class="rounded-md border-gray-300 shadow-sm">
          <option>全部严重程度</option>
          <option>高</option>
          <option>中</option>
          <option>低</option>
        </select>
        <button class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
          刷新
        </button>
      </div>
    </div>

    <div class="space-y-4">
      <div v-for="anomaly in anomalies" :key="anomaly.id" class="bg-white p-6 rounded-lg shadow">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-lg font-medium text-gray-900">{{ anomaly.service }}</h3>
            <p class="mt-1 text-sm text-gray-500">{{ anomaly.timestamp }}</p>
          </div>
          <span :class="[severityClass(anomaly.severity), 'px-2 py-1 rounded-full text-xs font-medium']">
            {{ anomaly.type }}
          </span>
        </div>
        <p class="mt-4 text-gray-700">{{ anomaly.description }}</p>
        <div class="mt-4 bg-gray-50 p-4 rounded-md">
          <h4 class="text-sm font-medium text-gray-900">优化建议</h4>
          <p class="mt-1 text-sm text-gray-700">{{ anomaly.suggestion }}</p>
        </div>
      </div>
    </div>
  </div>
</template>