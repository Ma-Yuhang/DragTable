<template>
  <ElForm :model="form" label-width="auto" style="max-width: 600px">
    <div>{{ msg }}</div>
    <ElFormItem label="账号">
      <ElInput v-model="form.name" />
    </ElFormItem>
    <ElFormItem label="密码">
      <ElInput v-model="form.password" />
    </ElFormItem>
  </ElForm>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

defineProps({
  msg: String,
})

const form = reactive({
  name: '',
  password: '',
})

const submit = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('submit!!!')
    }, 1000)
  })
}

defineExpose({
  submit,
})
</script>
