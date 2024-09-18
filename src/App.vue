<template>
  <div>
    <DragTable :data :columns />
  </div>
</template>

<script setup lang="ts">
import DragTable from '@/components/DragTable/index.vue'
import { ref } from 'vue'
import type { ColumnsType } from './components/DragTable/type'

const data = ref([
  {
    id: 1,
    type: 'REFRESH_SALES_PRICE',
    createTime: '2021-01-01 12:00:00',
    createBy: 'admin',
    finish: true,
    success: true,
  },
  {
    id: 1,
    type: 'REFRESH_COST_PRICE',
    createTime: '2023-01-01 12:00:00',
    createBy: '李芳',
    finish: false,
    success: false,
  },
  {
    id: 1,
    type: 'REFRESH_COST_PRICE',
    createTime: '2023-01-01 12:00:00',
    createBy: '李芳',
    finish: false,
    success: false,
  },
  {
    id: 1,
    type: 'REFRESH_COST_PRICE',
    createTime: '2023-01-01 12:00:00',
    createBy: '李芳',
    finish: false,
    success: false,
  },
  {
    id: 1,
    type: 'REFRESH_COST_PRICE',
    createTime: '2023-01-01 12:00:00',
    createBy: '李芳',
    finish: false,
    success: false,
  },
  {
    id: 1,
    type: 'REFRESH_COST_PRICE',
    createTime: '2023-01-01 12:00:00',
    createBy: '李芳',
    finish: false,
    success: false,
  },
  {
    id: 1,
    type: 'REFRESH_COST_PRICE',
    createTime: '2023-01-01 12:00:00',
    createBy: '李芳',
    finish: false,
    success: false,
  },
  {
    id: 1,
    type: 'REFRESH_COST_PRICE',
    createTime: '2023-01-01 12:00:00',
    createBy: '李芳',
    finish: false,
    success: false,
  },
  {
    id: 1,
    type: 'REFRESH_COST_PRICE',
    createTime: '2023-01-01 12:00:00',
    createBy: '李芳',
    finish: false,
    success: false,
  },
  {
    id: 1,
    type: 'REFRESH_COST_PRICE',
    createTime: '2023-01-01 12:00:00',
    createBy: '李芳',
    finish: false,
    success: false,
  },
  {
    id: 1,
    type: 'REFRESH_COST_PRICE',
    createTime: '2023-01-01 12:00:00',
    createBy: '李芳',
    finish: false,
    success: false,
  },
  {
    id: 1,
    type: 'REFRESH_COST_PRICE',
    createTime: '2023-01-01 12:00:00',
    createBy: '李芳',
    finish: false,
    success: false,
  },
  {
    id: 1,
    type: 'REFRESH_COST_PRICE',
    createTime: '2023-01-01 12:00:00',
    createBy: '李芳',
    finish: false,
    success: false,
  },
  {
    id: 1,
    type: 'REFRESH_COST_PRICE',
    createTime: '2023-01-01 12:00:00',
    createBy: '李芳',
    finish: false,
    success: false,
  },
  {
    id: 1,
    type: 'REFRESH_COST_PRICE',
    createTime: '2023-01-01 12:00:00',
    createBy: '李芳',
    finish: false,
    success: false,
  },
  {
    id: 1,
    type: 'REFRESH_COST_PRICE',
    createTime: '2023-01-01 12:00:00',
    createBy: '李芳',
    finish: false,
    success: false,
  },
  {
    id: 1,
    type: 'REFRESH_COST_PRICE',
    createTime: '2023-01-01 12:00:00',
    createBy: '李芳',
    finish: false,
    success: false,
  },
  {
    id: 1,
    type: 'REFRESH_COST_PRICE',
    createTime: '2023-01-01 12:00:00',
    createBy: '李芳',
    finish: false,
    success: false,
  },
  {
    id: 1,
    type: 'REFRESH_COST_PRICE',
    createTime: '2023-01-01 12:00:00',
    createBy: '李芳',
    finish: false,
    success: false,
  },
])
const columns = ref<ColumnsType[]>([
  {
    title: '执行编号',
    dataIndex: 'id',
    width: 100,
  },
  {
    title: '任务类型',
    dataIndex: 'type',
    required: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '创建人',
    dataIndex: 'createBy',
  },
  {
    title: '执行状态',
    dataIndex: 'finish',
  },
  {
    title: '执行结果',
    dataIndex: 'success',
  },
])
</script>

<style scoped></style>
