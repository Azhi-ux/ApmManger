<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  BellIcon,
  UserCircleIcon
} from '@heroicons/vue/24/outline'

const router = useRouter()
const showUserMenu = ref(false)

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<template>
  <header class="bg-white shadow-sm">
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="flex">
          <div class="flex flex-shrink-0 items-center">
            <img class="h-8 w-auto"  alt="Logo" />
          </div>
        </div>
        <div class="flex items-center">
          <button
            type="button"
            class="rounded-full p-1 text-gray-400 hover:text-gray-500"
          >
            <BellIcon class="h-6 w-6" />
          </button>
          
          <div class="relative ml-3">
            <div>
              <button
                type="button"
                class="flex rounded-full bg-white text-sm"
                @click="showUserMenu = !showUserMenu"
              >
                <UserCircleIcon class="h-8 w-8 text-gray-400" />
              </button>
            </div>
            
            <div
              v-if="showUserMenu"
              class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5"
            >
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