export interface ColumnsType {
  title: string
  dataIndex: string
  width?: number
  required?: boolean
  key?: string | number
  fixed?: boolean | 'left' | 'right'
  valueEnumName?: string
  options?: Options
}

export type Options = ArrayOptions | ObjectOptions

export interface BasicOptions {
  label: string | number
  value: string | number | boolean
}
export type ArrayOptions = BasicOptions[]
export interface ObjectOptions {
  [label: string | number]: string | number | boolean
}

export interface DragTableProps {
  /**
   * 表格数据
   */
  data: any[]
  /**
   * 表格名称
   */
  name?: string
  /**
   * 表头数据
   */
  columns: ColumnsType[]
  /**
   * 是否开启拖拽
   */
  draggable?: boolean
}

export interface Dictionary {
  [name: string | number]: Options
}
