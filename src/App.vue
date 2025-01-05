<script setup lang="ts">
import { RouterView } from 'vue-router'
import { computed } from 'vue'
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isLoginPage = computed(() => route.path === '/login')
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <template v-if="!isLoginPage">
      <Header />
      <div class="flex">
        <Sidebar />
        <main class="flex-1 ml-64 pt-16">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <RouterView/>
          </div>
        </main>
      </div>
    </template>
    <template v-else>
      <RouterView />
    </template>
  </div>
</template>
