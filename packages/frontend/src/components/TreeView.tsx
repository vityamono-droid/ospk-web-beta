import { SimpleTreeView as MuiTreeView } from '@mui/x-tree-view/SimpleTreeView'
import { TreeItem } from '@mui/x-tree-view/TreeItem'

import type { JSX, ReactNode } from 'react'

import unFlatten from '@utils/unFlatten'

type TreeViewLabel<TItem extends TreeViewLikeItem> = (item: TItem) => ReactNode

interface TreeViewProps<TItem extends TreeViewLikeItem> {
  label?: TreeViewLabel<TItem>
  data?: TItem[]
  onRowClick?: ValueCallback<string>
}

type ElementType = <TItem extends TreeViewLikeItem>(props: TreeViewProps<TItem>) => JSX.Element
type ItemType = <TItem extends TreeViewLikeItem>(
  data: TreeViewItem<TItem>[],
  label?: TreeViewLabel<TItem>,
  onRowClick?: ValueCallback<string>,
) => JSX.Element[]

const buildTreeView: ItemType = (data, label, onRowClick) => {
  return data.map((item) => (
    <TreeItem
      key={item.id}
      itemId={item.id}
      label={!!label ? label(item) : item.label}
      children={item.children && item.children.length > 0 ? buildTreeView(item.children, label, onRowClick) : undefined}
      slotProps={{
        label: {
          onClick: () => !!onRowClick && onRowClick(item.id),
        },
      }}
    />
  ))
}

const TreeView: ElementType = ({ label, data, onRowClick }) => {
  return <MuiTreeView expansionTrigger={'iconContainer'}>{buildTreeView(unFlatten(data), label, onRowClick)}</MuiTreeView>
}

export default TreeView
