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
      v-for="column in allColumns"
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
import { computed, onMounted, ref } from 'vue'
import type { DragTableProps, Options } from './type'
import { isArray } from '@/utils/type'

defineOptions({
  name: 'DragTable',
})

const { data, columns, draggable = true, name } = defineProps<DragTableProps>()
const DRAG_COLUMNS_KEY = 'hang_drag_columns'
const emit = defineEmits(['onDragEnd', 'editRow'])
const allColumns = ref()
const dragState = ref({
  start: 0,
  end: 0,
  dragging: false,
  direction: '',
})

const showColumns = computed(() => {
  return columns.filter((column) => !column.hidden)
})
// 读取持久化的拖拽后的表格列顺序
onMounted(() => {
  if (!name) {
    allColumns.value = showColumns.value
    return
  } else {
    const allDragStringify = localStorage.getItem(DRAG_COLUMNS_KEY)
    if (!allDragStringify) {
      allColumns.value = showColumns.value
      return
    }
    const allDragParse = JSON.parse(allDragStringify)
    if (!isObject(allDragParse)) {
      allColumns.value = showColumns.value
      return
    }
    const dragColumns = allDragParse[name]
    if (!isArray(dragColumns)) {
      allColumns.value = showColumns.value
      return
    }
    allColumns.value = dragColumns
  }
})
// const dragColumns = computed({
//   get() {
//     const allColumns = columns.filter((column) => !column.hidden)
//     if (!name) {
//       return allColumns
//     } else {
//       const allDragStringify = localStorage.getItem(DRAG_COLUMNS_KEY)
//       if (!allDragStringify) {
//         return allColumns
//       }
//       const allDragParse = JSON.parse(allDragStringify)
//       if (!isObject(allDragParse)) {
//         return allColumns
//       }
//       const dragColumns = allDragParse[name]
//       if (!isArray(dragColumns)) {
//         return allColumns
//       }
//       return dragColumns
//     }
//   },
//   set(val) {
//     console.log(val, 'val')
//   },
// })

const isObject = (val: any): boolean => {
  return Object.prototype.toString.call(val) === '[object Object]'
}
const valueFormat = (value: any, options: Options | undefined) => {
  if (Array.isArray(options)) {
    return options.find((item) => item.value === value)?.label || '-'
  } else if (isObject(options)) {
    return options![value] || '-'
  } else {
    return value || '-'
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
  emit('onDragEnd', allColumns.value)
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
  console.log(start, end, 'start, end')

  const startColumn = allColumns.value[start]
  allColumns.value.splice(start, 1)
  allColumns.value.splice(end, 0, startColumn)
}
/**
 * 将拖拽后的dragColumns持久化到localStorage
 */
const saveDragColumns = () => {
  if (!name) return
  const hangDragColumns = JSON.parse(localStorage.getItem(DRAG_COLUMNS_KEY) || '{}')
  hangDragColumns[name] = allColumns.value
  localStorage.setItem(DRAG_COLUMNS_KEY, JSON.stringify(hangDragColumns))
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
