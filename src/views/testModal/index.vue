<template>
  <div>
    <ElButton @click="handleClick">打开Modal</ElButton>
  </div>
</template>

<script setup lang="ts">
import LoginForm from './loginForm.vue'
import createDialog from '@/utils/createDialog'

defineOptions({
  name: 'TestModal',
})

const handleClick = () => {
  createDialog(
    LoginForm,
    { msg: '欢迎！！' },
    {
      title: '登录',
      onClose() {
        console.log('onClose')
      },
    }
  )
}
</script>

<style scoped></style>
