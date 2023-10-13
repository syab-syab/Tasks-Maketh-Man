// UNIX時間で渡された期日をわかるように表示
const showDueDate = (unix: string): string => {
  if (!unix) {
    return "None"
  }
  const tmp = Number(unix)
  const date = new Date(tmp)
  return `${date.getFullYear()}年 ${date.getMonth()}月 ${date.getDate()}日 ${date.getHours()}時 ${date.getMinutes()}分`
}

export default showDueDate