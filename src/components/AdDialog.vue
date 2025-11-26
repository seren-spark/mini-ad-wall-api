<template>
  <el-dialog
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    title="新建广告"
    width="600px"
    @close="handleClose"
  >
    <el-form :model="form" label-width="100px" class="mt-4">
      <el-form-item label="广告标题" required>
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="发布人" required>
        <el-input v-model="form.publisher" />
      </el-form-item>
      <el-form-item label="内容文案" required>
        <el-input v-model="form.content" type="textarea" :rows="4" />
      </el-form-item>
      <el-form-item label="落地页" required>
        <el-input v-model="form.landingPage" />
      </el-form-item>
      <el-form-item label="出价" required>
        <div class="flex items-center gap-2 w-full">
          <el-input-number
            v-model="form.price"
            :precision="2"
            :step="1"
            :min="0"
            controls-position="right"
            class="!w-48"
          />
          <span>元</span>
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="emit('create')">创建广告</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { type AdForm } from '../types/ad'

defineProps<{ form: AdForm; modelValue: boolean }>()
const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'create'): void
  (e: 'update:modelValue', value: boolean): void
}>()

// 3. 处理关闭逻辑
const handleClose = () => {
  emit('update:modelValue', false)
  emit('cancel')
}
</script>

<style scoped></style>
