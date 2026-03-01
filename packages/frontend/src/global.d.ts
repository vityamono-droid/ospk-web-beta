declare global {
  type Callback = () => void

  type ValueCallback<TValue = any> = (value: TValue) => void

  type UpdateData<TData = any> = { id: string; data: TData }

  type LabelValue<TValue = string> = {
    label: string
    value: TValue
  }

  type TreeViewLikeItem = {
    id: string
    label: string
    parentId: string | null
  }

  type TreeViewItem<TItem = any> = TItem &
    TreeViewLikeItem & {
      children?: TreeViewItem[]
    }
}

export {}
