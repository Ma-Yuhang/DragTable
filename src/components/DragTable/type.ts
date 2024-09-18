export interface ColumnsType {
  title: string
  dataIndex: string
  width?: number
  required?: boolean
  key?: string | number
  fixed?: boolean | 'left' | 'right'
}

export interface DragTableProps {
  /**
   * 表格数据
   */
  data: any[]
  /**
   * 表头数据
   */
  columns: ColumnsType[]
  /**
   * 是否开启拖拽
   */
  draggable?: boolean
}
