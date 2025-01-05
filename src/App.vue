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
  <div class="min-h-screen bg-gray-100">
    <template v-if="!isLoginPage">
      <Header />
      <div class="flex">
        <Sidebar />
        <main class="flex-1 p-6">
          <RouterView />
        </main>
      </div>
    </template>
    <template v-else>
      <RouterView />
    </template>
  </div>
</template>