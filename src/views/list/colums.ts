import type { ColumnsType } from '@/components/DragTable/type'

export const listColumns: ColumnsType[] = [
  {
    title: '执行编号',
    dataIndex: 'id',
    width: 200,
  },
  {
    title: '任务类型',
    dataIndex: 'type',
    required: true,
    width: 200,
    valueEnumName: 'taskType',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 200,
  },
  {
    title: '创建人',
    dataIndex: 'createBy',
    width: 200,
  },
  {
    title: '执行状态',
    dataIndex: 'finish',
    width: 200,
    valueEnumName: 'executeState',
  },
  {
    title: '执行结果',
    dataIndex: 'success',
    width: 200,
    valueEnumName: 'executeResult',
  },
]
