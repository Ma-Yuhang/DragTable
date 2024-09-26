<template>
  <div style="width: 1000px; height: 500px">
    <DragTable name="list" :data :columns @onDragEnd="onDragEnd" @editRow="editRow" />
    <button @click="handle">toggle</button>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'ListPage',
})
import DragTable from '@/components/DragTable/index.vue'
import { ref } from 'vue'
import type { ColumnsType } from '@/components/DragTable/type'
import useColumns from '@/hooks/useColumns'
import { listColumns } from './colums'

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
    createTime: '',
    createBy: '李芳',
    finish: false,
    success: false,
  },
  {
    id: 1,
    type: 'REFRESH_COST_PRICE',
    createTime: '2023-01-01 12:00:00',
    createBy: '',
    finish: false,
    success: '',
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
const dictionary = {
  taskType: {
    REFRESH_SALES_PRICE: '刷新销售单价',
    REFRESH_COST_PRICE: '刷新采购单价',
  },
  executeState: [
    {
      label: '已完成',
      value: true,
    },
    {
      label: '处理中',
      value: false,
    },
  ],
  executeResult: [
    {
      label: '成功',
      value: true,
    },
    {
      label: '失败',
      value: false,
    },
  ],
}

const columns = useColumns(listColumns, dictionary)
console.log(columns, 'columns')
const handle = () => {}
const editRow = (row: any, columns: any, index: number) => {
  console.log(row, columns, index, 'editRow')
}
const onDragEnd = (columns: ColumnsType[]) => {
  console.log(columns, 'columns')
}
</script>

<style scoped></style>
