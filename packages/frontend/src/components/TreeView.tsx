import IconButton from '@mui/material/IconButton'
import { SimpleTreeView as MuiTreeView } from '@mui/x-tree-view/SimpleTreeView'
import { TreeItem } from '@mui/x-tree-view/TreeItem'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'

const unflatten = (array: any[]) => {
  const map: any = {}
  const tree: any[] = []

  array.forEach((item) => {
    map[item['id']] = { ...item, children: [] }
  })

  array.forEach((item) => {
    if (item['parentId'] && map[item['parentId']]) {
      map[item['parentId']].children.push(map[item['id']])
    } else {
      tree.push(map[item['id']])
    }
  })

  return tree
}

const getTreeItemsFromData = (treeItems: any[]) => {
  return treeItems.map((treeItemData) => {
    let children = undefined
    if (treeItemData.children && treeItemData.children.length > 0) {
      children = getTreeItemsFromData(treeItemData.children)
    };
    return (
      <TreeItem
        key={treeItemData.id}
        itemId={treeItemData.id}
        disabled={treeItemData.disabled}
        children={children}
        label={
          <Stack spacing={2} flexGrow={1} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography>{treeItemData.label}</Typography>
            <Stack spacing={1} direction={'row'} alignItems={'center'}>
              <Switch size={'small'} checked={!treeItemData.disabled} />
              <IconButton size={'small'}>
                <EditIcon />
              </IconButton>
              <IconButton size={'small'}>
                <AddIcon />
              </IconButton>
            </Stack>
          </Stack>
        }
      />
    )
  })
}

const TreeView = ({ data }: { data: { id: string; label: string }[] }) => {
  const tree = unflatten(data)

  return (
    <MuiTreeView>
      {getTreeItemsFromData(tree)}
    </MuiTreeView>
  )
}

export default TreeView
