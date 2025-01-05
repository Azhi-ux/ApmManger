<script setup lang="ts">
import { ref } from 'vue'

const alerts = ref([
  {
    id: 1,
    title: '服务器负载过高',
    service: '用户服务',
    severity: 'critical',
    status: 'active',
    timestamp: '2024-03-15 15:30:00'
  },
  {
    id: 2,
    title: '数据库连接数接近上限',
    service: 'MySQL主库',
    severity: 'warning',
    status: 'resolved',
    timestamp: '2024-03-15 14:20:00'
  }
])

const alertRules = ref([
  {
    id: 1,
    name: 'CPU使用率告警',
    condition: 'CPU使用率 > 80%',
    duration: '5分钟',
    severity: 'critical'
  },
  {
    id: 2,
    name: '内存使用率告警',
    condition: '内存使用率 > 90%',
    duration: '3分钟',
    severity: 'warning'
  }
])

const severityClass = (severity: string) => {
  switch (severity) {
    case 'critical':
      return 'bg-red-100 text-red-800'
    case 'warning':
      return 'bg-yellow-100 text-yellow-800'
    case 'info':
      return 'bg-blue-100 text-blue-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold text-gray-900">告警管理</h1>
      <button class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
        新建告警规则
      </button>
    </div>

    <div class="bg-white rounded-lg shadow">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg font-medium text-gray-900">当前告警</h3>
      </div>
      <div class="border-t border-gray-200">
        <ul class="divide-y divide-gray-200">
          <li v-for="alert in alerts" :key="alert.id" class="px-4 py-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-900">{{ alert.title }}</p>
                <p class="text-sm text-gray-500">{{ alert.service }}</p>
              </div>
              <div class="flex items-center space-x-4">
                <span :class="[severityClass(alert.severity), 'px-2 py-1 rounded-full text-xs font-medium']">
                  {{ alert.severity }}
                </span>
                <span :class="[
                  alert.status === 'active' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800',
                  'px-2 py-1 rounded-full text-xs font-medium'
                ]">
                  {{ alert.status }}
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg font-medium text-gray-900">告警规则</h3>
      </div>
      <div class="border-t border-gray-200">
        <ul class="divide-y divide-gray-200">
          <li v-for="rule in alertRules" :key="rule.id" class="px-4 py-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-900">{{ rule.name }}</p>
                <p class="text-sm text-gray-500">条件: {{ rule.condition }}</p>
                <p class="text-sm text-gray-500">持续时间: {{ rule.duration }}</p>
              </div>
              <span :class="[severityClass(rule.severity), 'px-2 py-1 rounded-full text-xs font-medium']">
                {{ rule.severity }}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>