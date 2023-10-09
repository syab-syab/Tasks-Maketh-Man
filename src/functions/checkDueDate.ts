// 期日を過ぎているかどうか
const checkDueDate = (val: string): boolean => {
  const tmp = Number(val)
  const currentDateTime = new Date()
  // 期日を過ぎていない or 設定されていないなら true を返す
  if (tmp > currentDateTime.getTime() || val === "") {
    return true
  // 過ぎているなら false を返す
  } else if (currentDateTime.getTime() >= tmp ) {
    return false
  } else {
    return true
  }
}

export default checkDueDate