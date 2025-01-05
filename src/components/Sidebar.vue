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
  UserGroupIcon,
  Cog6ToothIcon
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
  {name: '系统设置', icon: Cog6ToothIcon, href: '/settings'}
]

const router = useRouter()
const route = useRoute()

const isActive = (href: string) => route.path === href
</script>

<template>
  <aside class="fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-white shadow-lg overflow-y-auto">
    <nav class="mt-4">
      <div class="px-2 space-y-1">
        <a
          v-for="item in navigation"
          :key="item.name"
          :href="item.href"
          @click.prevent="router.push(item.href)"
          :class="[
            isActive(item.href)
              ? 'bg-primary-50 text-primary-600'
              : 'text-gray-600 hover:bg-gray-50',
            'group flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200'
          ]"
        >
          <component
            :is="item.icon"
            :class="[
              isActive(item.href) ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500',
              'mr-3 h-5 w-5 transition-colors duration-200'
            ]"
          />
          {{ item.name }}
        </a>
      </div>
    </nav>
  </aside>
</template>
