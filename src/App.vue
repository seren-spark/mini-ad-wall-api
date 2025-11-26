<script setup lang="ts">
import { ref, reactive } from 'vue'
import AdCard from '@/components/AdCard.vue'
import AdDialog from '@/components/AdDialog.vue'

interface Ad {
  id: number
  title: string
  content: string
  heat: number
  price: number
}

const ads = ref<Ad[]>([
  {
    id: 1,
    title: '我是标题1',
    content: '测试测试',
    heat: 0,
    price: 123,
  },
  {
    id: 2,
    title: '广告标题2',
    content: '123123',
    heat: 0,
    price: 100,
  },
  {
    id: 3,
    title: '广告标题3',
    content: '我是内容',
    heat: 0,
    price: 3,
  },
])

const dialogVisible = ref(false)
const form = reactive({
  title: '',
  publisher: '',
  content: '',
  landingPage: '',
  price: 0.0,
})

const handleCreate = () => {
  dialogVisible.value = false
}
</script>

<template>
  <div class="min-h-screen bg-[#F5F7FA] font-sans text-gray-900">
    <!-- Header -->
    <header class="bg-white h-16 px-6 flex items-center shadow-sm sticky top-0 z-10">
      <div class="font-bold text-lg">Mini广告墙</div>
    </header>

    <!-- Main Content -->
    <main class="p-6 max-w-[1600px] mx-auto w-full">
      <!-- Action Bar -->
      <div class="mb-6">
        <button
          @click="dialogVisible = true"
          class="bg-[#3B82F6] hover:bg-blue-600 text-white px-4 py-2 rounded-sm flex items-center gap-1 text-sm transition-colors cursor-pointer shadow-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          新增广告
        </button>
      </div>

      <!-- Ad Grid -->
      <div class="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="ad in ads"
          :key="ad.id"
          class="bg-white rounded-lg p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          <AdCard :content="ad.content" :title="ad.title" :price="ad.price" :heat="ad.heat" />
        </div>
      </div>

      <!-- Create Ad Dialog -->
      <AdDialog :form="form" v-model="dialogVisible" @create="handleCreate" />
    </main>
  </div>
</template>

<style scoped lang="scss"></style>
