<template>
  <el-table
    :data="data"
    style="width: 100%; height: 100%"
    row-key="id"
    border
    :cell-class-name="cellClassName"
    :header-cell-class-name="cellClassName"
  >
    <el-table-column
      v-for="{ title, dataIndex, key, width, required, fixed } in dragColumns"
      :key="key"
      :prop="dataIndex"
      :label="title"
      :width="width"
      header-align="center"
      align="center"
      :fixed="fixed"
    >
      <template v-if="draggable" #header="{ column, $index }">
        <div
          @mousedown="handleMouseDown(column, $index)"
          @dragover="handleDragover(column, $index)"
        >
          <span :class="{ required }">
            {{ title }}
          </span>
        </div>
      </template>
      <template v-else #header>
        <div>
          <span :class="{ required }">
            {{ title }}
          </span>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { DragTableProps } from './type'

defineOptions({
  name: 'DragTable',
})

const { data, columns, draggable = true } = defineProps<DragTableProps>()
const emit = defineEmits(['onDragEnd'])
const dragColumns = ref(columns)
const dragState = ref({
  start: 0,
  end: 0,
  dragging: false,
  direction: '',
})

/**
 * 鼠标按下，添加可拖拽属性
 * @param column 按下的列（element plus提供的）
 * @param index 按下的列索引
 */
const handleMouseDown = (column: any, index: number) => {
  //如果是固定列，则不进行拖拽
  if (column.fixed) {
    return
  }
  dragState.value.start = index
  // 获取当前拖拽的元素
  const dragclass = '.el-table__header-wrapper .' + column.id
  const dragDom = document.querySelector(dragclass)
  // 变成可拖拽
  dragDom?.setAttribute('draggable', 'true')
  // 添加拖拽结束事件
  document.addEventListener('dragend', handleDragEnd)
}
/**
 * 拖拽中
 * @param index 当前移动到的列索引
 */
const handleDragover = (column: any, index: number) => {
  dragState.value.dragging = true
  if (column.fixed) {
    return
  }
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
/**
 * 拖拽结束
 *
 * 1.更新表格
 * 2.重置拖拽状态
 * 3.移除拖拽结束事件
 */
const handleDragEnd = () => {
  // 更新表头，即更新表格columns的顺序
  headDraged()
  // 重置拖拽状态
  resetDragState()
  // 消除拖拽结束事件
  document.removeEventListener('dragend', handleDragEnd)
  // 将拖拽后的dragColumns持久化到localStorage
  saveDragColumns()
  // 触发自定义拖拽结束事件
  emit('onDragEnd', dragColumns.value)
}
/**
 * 重置拖拽状态
 */
const resetDragState = () => {
  dragState.value = {
    start: 0,
    end: 0,
    dragging: false,
    direction: '',
  }
}
/**
 * 更新表头，即更新表格columns的顺序
 */
const headDraged = () => {
  const { start, end } = dragState.value
  const startColumn = dragColumns.value[start]
  const endColumn = dragColumns.value[end]
  dragColumns.value.splice(start, 1, endColumn)
  dragColumns.value.splice(end, 1, startColumn)
}
/**
 * 将拖拽后的dragColumns持久化到localStorage
 */
const saveDragColumns = () => {
  localStorage.setItem('dragColumns', JSON.stringify(dragColumns.value))
}
/**
 * 拖动虚线样式设置
 * @param param0
 */
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
