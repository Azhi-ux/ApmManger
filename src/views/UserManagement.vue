<script setup lang="ts">
import { ref } from 'vue'

const users = ref([
  {
    id: 1,
    name: '管理员',
    email: 'admin@example.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-03-15 15:30:00'
  },
  {
    id: 2,
    name: '运维人员',
    email: 'ops@example.com',
    role: 'operator',
    status: 'active',
    lastLogin: '2024-03-15 14:20:00'
  }
])

const roles = ref([
  {
    id: 1,
    name: '管理员',
    permissions: ['all'],
    userCount: 1
  },
  {
    id: 2,
    name: '运维人员',
    permissions: ['read', 'write'],
    userCount: 1
  },
  {
    id: 3,
    name: '访客',
    permissions: ['read'],
    userCount: 0
  }
])

const showNewUserModal = ref(false)
const showNewRoleModal = ref(false)
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold text-gray-900">用户管理</h1>
      <div class="flex space-x-4">
        <button
          @click="showNewUserModal = true"
          class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
        >
          新建用户
        </button>
        <button
          @click="showNewRoleModal = true"
          class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          管理角色
        </button>
      </div>
    </div>

    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg font-medium text-gray-900">用户列表</h3>
      </div>
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              用户名
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              邮箱
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              角色
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              状态
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              最后登录
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              操作
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="user in users" :key="user.id">
            <td class="px-6 py-4 whitespace-nowrap">{{ user.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ user.email }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ user.role }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="[
                user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                'px-2 py-1 rounded-full text-xs font-medium'
              ]">
                {{ user.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">{{ user.lastLogin }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button class="text-primary-600 hover:text-primary-900">编辑</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg font-medium text-gray-900">角色管理</h3>
      </div>
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              角色名称
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              权限
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              用户数量
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              操作
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="role in roles" :key="role.id">
            <td class="px-6 py-4 whitespace-nowrap">{{ role.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ role.permissions.join(', ') }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ role.userCount }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button class="text-primary-600 hover:text-primary-900">编辑</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>