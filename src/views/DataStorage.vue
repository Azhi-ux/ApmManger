<script setup lang="ts">
import { ref } from 'vue'

const storageData = ref([
  { id: 1, name: '用户数据', size: '2.5GB', lastUpdate: '2024-03-15', type: 'MySQL' },
  { id: 2, name: '日志文件', size: '1.8GB', lastUpdate: '2024-03-15', type: 'Elasticsearch' },
  { id: 3, name: '配置文件', size: '156MB', lastUpdate: '2024-03-14', type: 'Redis' },
  { id: 4, name: '性能指标', size: '890MB', lastUpdate: '2024-03-15', type: 'InfluxDB' },
])

const searchQuery = ref('')
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold text-gray-900">数据存储管理</h1>
      <div class="flex space-x-4">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="搜索..."
          class="rounded-md border-gray-300 shadow-sm"
        />
        <button class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
          导出数据
        </button>
      </div>
    </div>

    <div class="bg-white shadow rounded-lg">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              名称
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              存储类型
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              大小
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              最后更新
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              操作
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="item in storageData" :key="item.id">
            <td class="px-6 py-4 whitespace-nowrap">{{ item.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.type }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.size }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.lastUpdate }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button class="text-primary-600 hover:text-primary-900">查看</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>