const unFlatten = (data?: TreeViewLikeItem[]) => {
  if (!data || !data.length) {
    return []
  }

  const map: any = {}
  const tree: TreeViewItem[] = []

  data.forEach((item) => {
    map[item['id']] = { ...item, children: [] }
  })

  data.forEach((item) => {
    if (item['parentId'] && map[item['parentId']]) {
      map[item['parentId']].children.push(map[item['id']])
    } else {
      tree.push(map[item['id']])
    }
  })

  return tree
}

export default unFlatten
