<template>
  <div>
    <el-table
      :data="data"
      style="width: 100%"
      row-key="id"
      border
      :cell-class-name="cellClassName"
      :header-cell-class-name="cellClassName"
    >
      <el-table-column
        v-for="{ title, dataIndex, key, width, required } in dragColumns"
        :key="key"
        :prop="dataIndex"
        :label="title"
        :width="width"
        header-align="center"
        align="center"
      >
        <template #header="{ column, $index }">
          <div @mousedown="handleMouseDown(column, $index)" @dragover="handleDragover($index)">
            <span :class="{ required }">
              {{ title }}
            </span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { DragTableProps } from './type'

defineOptions({
  name: 'DragTable',
})

const { data, columns } = defineProps<DragTableProps>()
const dragColumns = ref(columns)
const dragState = ref({
  start: 0,
  end: 0,
  dragging: false,
  direction: '',
})
// 鼠标按下，添加可拖拽属性
const handleMouseDown = (column: any, index: number) => {
  dragState.value.start = index
  // 获取当前拖拽的元素
  const dragclass = '.el-table__header-wrapper .' + column.id
  const dragDom = document.querySelector(dragclass)
  // 变成可拖拽
  dragDom?.setAttribute('draggable', 'true')
  // 添加拖拽结束事件
  document.addEventListener('dragend', handleMouseUp)
}
// 拖拽中
const handleDragover = (index: number) => {
  dragState.value.dragging = true
  console.log(index, dragState.value.direction)

  if (dragState.value.dragging) {
    dragState.value.end = index
    const { start, end } = dragState.value
    // 判断拖拽方向
    if (start < end) {
      dragState.value.direction = 'right'
    } else if (start > end) {
      dragState.value.direction = 'left'
    } else {
      dragState.value.direction = ''
    }
  }
}
// 鼠标抬起或拖拽结束，消除可拖拽属性
const handleMouseUp = () => {
  console.log('拖拽结束')

  // 更新表格
  headDraged()
  dragState.value = {
    start: 0,
    end: 0,
    dragging: false,
    direction: '',
  }
  // 消除拖拽结束事件
  document.removeEventListener('dragend', handleMouseUp)
}
// 更新表头
const headDraged = () => {
  const { start, end } = dragState.value
  const startColumn = dragColumns.value[start]
  const endColumn = dragColumns.value[end]
  dragColumns.value.splice(start, 1, endColumn)
  dragColumns.value.splice(end, 1, startColumn)
}
// 拖动虚线样式设置
const cellClassName = ({ columnIndex }: any) => {
  if (!dragState.value.dragging) return
  const { start, end, direction } = dragState.value
  const target = columnIndex
  if (target === start) {
    // 被移动的元素
    return 'drag_start'
  } else if (target === end) {
    // 要移动的位置
    return `drag_end_${direction}`
  }
  return ''
}
</script>

<style>
.drag_start {
  opacity: 0.4;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
}
.drag_end_left {
  border-left: 2px dotted #90c31f;
}
.drag_end_right {
  border-right: 2px dotted #90c31f !important;
}
.el-table__header .cell {
  user-select: none;
}
</style>
<style scoped>
.required::before {
  content: '*';
  color: red;
  margin-right: 4px;
}
</style>
