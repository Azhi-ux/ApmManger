<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  HomeIcon,
  ChartBarIcon,
  ServerIcon,
  ShareIcon,
  ExclamationTriangleIcon,
  BellIcon,
  ChartPieIcon,
  UserGroupIcon
} from '@heroicons/vue/24/outline'

const navigation = [
  { name: '仪表盘', icon: HomeIcon, href: '/' },
  { name: '数据监控', icon: ChartBarIcon, href: '/monitoring' },
  { name: '数据存储', icon: ServerIcon, href: '/storage' },
  { name: '网络拓扑', icon: ShareIcon, href: '/topology' },
  { name: '异常检测', icon: ExclamationTriangleIcon, href: '/anomaly' },
  { name: '告警管理', icon: BellIcon, href: '/alerts' },
  { name: '可视化', icon: ChartPieIcon, href: '/visualization' },
  { name: '用户管理', icon: UserGroupIcon, href: '/users' },
]

const router = useRouter()
const route = useRoute()

const isActive = (href: string) => route.path === href
</script>

<template>
  <aside class="w-64 bg-white shadow-lg h-screen">
    <div class="px-4 py-6">
      <h2 class="text-lg font-semibold text-gray-900">性能监测与优化系统</h2>
    </div>
    <nav class="mt-6">
      <div class="px-4 space-y-1">
        <a
          v-for="item in navigation"
          :key="item.name"
          :href="item.href"
          @click.prevent="router.push(item.href)"
          :class="[
            isActive(item.href)
              ? 'bg-primary-50 text-primary-600'
              : 'text-gray-600 hover:bg-gray-50',
            'group flex items-center px-4 py-2 text-sm font-medium rounded-md'
          ]"
        >
          <component
            :is="item.icon"
            :class="[
              isActive(item.href) ? 'text-primary-600' : 'text-gray-400',
              'mr-3 h-5 w-5'
            ]"
          />
          {{ item.name }}
        </a>
      </div>
    </nav>
  </aside>
</template>