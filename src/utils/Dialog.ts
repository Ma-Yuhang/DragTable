import {
  createApp,
  h,
  ref,
  type VNode,
  type Component,
  type ComponentPublicInstance,
  type Ref,
} from 'vue'
import { ElDialog, ElButton } from 'element-plus'
import type { DialogProps } from 'element-plus'
import 'element-plus/dist/index.css'

interface FooterProps {
  onCancel: () => void
  onConfirm: () => void
  loading?: boolean
}

// 扩展组件实例，包含可能的submit方法
interface ComponentInstance extends ComponentPublicInstance {
  submit?: () => Promise<void> | void
}

// 返回值类型
interface DialogReturn {
  unmount: () => void
  instance: Ref<ComponentInstance | undefined>
}
const footer = (props: FooterProps): VNode =>
  h('div', { class: 'dialog-footer' }, [
    h(ElButton, { onClick: props.onCancel }, () => '取消'),
    h(
      ElButton,
      { type: 'primary', onClick: props.onConfirm, loading: props.loading },
      () => '确认'
    ),
  ])

/**
 * 创建一个弹窗组件
 * @param component 要在弹窗中显示的组件
 * @param componentProps 传递给组件的属性
 * @param dialogProps 传递给ElDialog的属性
 * @returns 包含unmount方法和组件实例的对象
 */
export default function createDialog<P extends Record<string, any>>(
  component: Component,
  componentProps: P,
  dialogProps: Partial<DialogProps>
): DialogReturn {
  const open = ref(true)
  const instance = ref<ComponentInstance>()
  const loading = ref(false)

  const renderComponent = () => h(component, { ...componentProps, ref: instance })
  const renderFooter = () => footer({ onCancel, onConfirm, loading: loading.value })

  const dialog = () =>
    h(
      ElDialog,
      {
        ...dialogProps,
        modelValue: open.value,
        'onUpdate:modelValue': (val) => {
          open.value = val
        },
      },
      {
        default: renderComponent,
        footer: renderFooter,
      }
    )

  const onCancel = () => {
    unmount()
  }

  const onConfirm = async () => {
    loading.value = true
    try {
      await instance.value?.submit?.()
      unmount()
    } finally {
      loading.value = false
    }
  }

  const unmount = () => {
    open.value = false
    setTimeout(() => {
      app.unmount()
      div.remove()
    }, 500)
  }
  const app = createApp(dialog)
  const div = document.createElement('div')
  document.body.appendChild(div)
  app.mount(div)

  return {
    unmount,
    instance,
  }
}
