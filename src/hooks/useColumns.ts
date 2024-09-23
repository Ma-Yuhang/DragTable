import type { ColumnsType, Dictionary } from '@/components/DragTable/type'

export default function useColumns(columns: ColumnsType[], dict: Dictionary = {}) {
  return columns.map((column: ColumnsType) => {
    // 如果有 valueEnumName 字段，则将字典赋值给options
    if (column.valueEnumName && dict[column.valueEnumName]) {
      column.options = dict[column.valueEnumName]
      delete column.valueEnumName
      return column
    }
    return column
  })
}
