const compareObj = <TObj extends {[key: string]: any}>(obj1: TObj, obj2: TObj) => {
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (const key of keys1) {
    const val1 = obj1[key]
    const val2 = obj2[key]
    const areObjects = val1 && typeof val1 === 'object' && val2 && typeof val2 === 'object'
    if ((areObjects && !compareObj(val1, val2)) || (!areObjects && val1 !== val2)) {
      return false
    }
  }

  return true
}

export default compareObj
