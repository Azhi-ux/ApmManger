<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  BellIcon,
  UserCircleIcon,
  MagnifyingGlassIcon
} from '@heroicons/vue/24/outline'

const router = useRouter()
const showUserMenu = ref(false)
const notifications = ref([
  {id: 1, title: '系统告警', message: 'CPU使用率超过90%', time: '5分钟前'},
  {id: 2, title: '性能提醒', message: '内存使用率达到85%', time: '10分钟前'}
])
const showNotifications = ref(false)

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<template>
  <header class="bg-white shadow-sm fixed w-full z-10">
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between items-center">
        <div class="flex items-center flex-shrink-0">
          <div class="w-12 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <span class="text-white text-lg font-bold">APM</span>
          </div>
          <span class="ml-2 text-lg font-semibold text-gray-900">性能监测系统</span>
        </div>

        <!-- Search Bar -->
        <div class="flex-1 max-w-lg mx-8">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon class="h-5 w-5 text-gray-400"/>
            </div>
            <input
                type="text"
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="搜索..."
            />
          </div>
        </div>

        <div class="flex items-center">
          <!-- Notifications -->
          <div class="relative">
            <button
                type="button"
                class="relative rounded-full p-1 text-gray-400 hover:text-gray-500"
                @click="showNotifications = !showNotifications"
            >
              <BellIcon class="h-6 w-6"/>
              <span class="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
            </button>

            <div
                v-if="showNotifications"
                class="absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
            >
              <div class="py-2">
                <div class="px-4 py-2 border-b border-gray-200">
                  <h3 class="text-sm font-medium text-gray-900">通知</h3>
                </div>
                <div class="max-h-64 overflow-y-auto">
                  <a
                      v-for="notification in notifications"
                      :key="notification.id"
                      href="#"
                      class="block px-4 py-3 hover:bg-gray-50"
                  >
                    <p class="text-sm font-medium text-gray-900">{{ notification.title }}</p>
                    <p class="mt-1 text-sm text-gray-500">{{ notification.message }}</p>
                    <p class="mt-1 text-xs text-gray-400">{{ notification.time }}</p>
                  </a>
                </div>
                <div class="px-4 py-2 border-t border-gray-200">
                  <a href="#" class="text-sm text-primary-600 hover:text-primary-500">查看全部通知</a>
                </div>
              </div>
            </div>
          </div>

          <!-- User Menu -->
          <div class="relative ml-3">
            <button
                type="button"
                class="flex rounded-full bg-white text-sm focus:outline-none"
                @click="showUserMenu = !showUserMenu"
            >
              <UserCircleIcon class="h-8 w-8 text-gray-400"/>
            </button>
            
            <div
              v-if="showUserMenu"
              class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5"
            >
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">个人设置</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">系统设置</a>
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                @click="logout"
              >
                退出登录
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
