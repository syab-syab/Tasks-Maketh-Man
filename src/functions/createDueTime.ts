// 期日設定用
const createNumArray = (props: string[]): number[] => {
  const array: number[] = []
  props.forEach((arr) => {
    if(arr === '') {
      array.push(0)
    } else {
      array.push(Number(arr))
    }
  })
  return array
}

const createDueTime = (props: string[]): string => {
  console.log(props)
  if (props[0] !== "" && props[1] !== "" && props[2] !== "") {
    const dateVal = createNumArray(props)
    const date = new Date(dateVal[0], dateVal[1], dateVal[2], dateVal[3], dateVal[4])
    const due = String(date.getTime())
    console.log(due)
    return due
  } else {
    return ""
  }
}

export default createDueTime