<template>
  <!-- Card Header -->
  <div class="flex justify-between items-start mb-4">
    <h3 class="font-bold text-gray-900 text-base">{{ title }}</h3>
    <el-dropdown trigger="click">
      <button
        class="border border-gray-200 rounded px-3 py-1 text-xs text-gray-600 flex items-center gap-1 hover:bg-gray-50 cursor-pointer bg-white hover:text-[#3B82F6] hover:border-[#3B82F6] transition-colors outline-none"
      >
        操作
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>编辑广告</el-dropdown-item>
          <el-dropdown-item>复制广告</el-dropdown-item>
          <el-dropdown-item>删除广告</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>

  <!-- Card Content -->
  <div class="text-gray-500 text-sm mb-8 min-h-[20px]">
    {{ content }}
  </div>

  <!-- Card Footer -->
  <div class="flex justify-between items-center text-sm">
    <div class="text-red-500">热度：{{ heat }}</div>
    <div class="text-[#1E40AF] font-medium">出价：{{ price }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
defineProps<{ content: string; title: string; price: number; heat: number }>()
</script>

<style scoped lang="scss"></style>
