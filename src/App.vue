<template>
  <!-- 使用element-plus中文语言包 -->
  <ElConfigProvider :locale="zhCn">
    <div>
      <h1>App</h1>
      <ListPage />
    </div>
  </ElConfigProvider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import ListPage from '@/views/list/index.vue'
</script>

<style scoped></style>
