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
      v-for="column in dragColumns"
      :key="column.key"
      :prop="column.dataIndex"
      :label="column.title"
      :width="column.width"
      header-align="center"
      align="center"
      show-overflow-tooltip
      :fixed="column.fixed"
    >
      <template v-if="draggable" #header="{ column: $column, $index }">
        <div
          @mousedown="handleMouseDown($column, $index)"
          @dragover="handleDragover($column, $index)"
        >
          <span :class="{ required: column.required }">
            {{ column.title }}
          </span>
        </div>
      </template>
      <template v-else #header>
        <div>
          <span :class="{ required: column.required }">
            {{ column.title }}
          </span>
        </div>
      </template>
      <template #default="{ row }">
        {{ valueFormat(row[column.dataIndex], column.options) }}
      </template>
    </el-table-column>
    <el-table-column header-align="center" align="center" fixed="right" min-width="200">
      <template #header>
        <div>
          <span>操作</span>
        </div>
      </template>
      <template #default="{ row, $index }">
        <el-button plain type="primary" size="small" @click="editRow(row, columns, $index)">
          编辑
        </el-button>
        <el-button plain size="small">取消</el-button>
        <el-button plain link type="primary" size="small">下载</el-button>
      </template>
    </el-table-column>
    <template #empty>
      <div class="empty">
        <el-empty description="暂无数据" />
      </div>
    </template>
  </el-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { DragTableProps, Options } from './type'

defineOptions({
  name: 'DragTable',
})

const { data, columns, draggable = true } = defineProps<DragTableProps>()
const emit = defineEmits(['onDragEnd', 'editRow'])
const dragColumns = ref(columns)
const dragState = ref({
  start: 0,
  end: 0,
  dragging: false,
  direction: '',
})

const isObject = (val: any): boolean => {
  return Object.prototype.toString.call(val) === '[object Object]'
}
const valueFormat = (value: any, options: Options | undefined) => {
  if (Array.isArray(options)) {
    return options.find((item) => item.value === value)?.label || value
  } else if (isObject(options)) {
    return options![value] || value
  } else {
    return value
  }
}

const editRow = (row: any, columns: any, index: number) => {
  emit('editRow', row, columns, index)
}
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
 * 1.更新表头
 * 2.重置拖拽状态
 * 3.移除拖拽结束事件
 * 4.持久化拖拽后的columns
 * 5.触发自定义拖拽结束事件
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
  dragColumns.value.splice(start, 1)
  dragColumns.value.splice(end, 0, startColumn)
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
