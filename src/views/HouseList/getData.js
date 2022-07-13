export const setKeys = (oldData, newData) => {
  if (oldData instanceof Array) {
    oldData.forEach((item, index) => {
      newData[index] = {}
      setKeys(item, newData[index])
    })
  } else if (oldData instanceof Object) {
    for (const key in oldData) {
      if (key === 'label') {
        newData.text = oldData[key]
      } else if (key === 'children') {
        newData[key] = []
        setKeys(oldData[key], newData[key])
      } else {
        newData[key] = oldData[key]
      }
    }
  } else {
    newData = oldData
  }
}
