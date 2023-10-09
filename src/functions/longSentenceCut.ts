// 長文の省略
// 表示する文字数の限界値は 定数:limit で変更できる
const longSentenceCut = (val: string): string => {
  const limit: number = 5
  if (val.length <= limit) {
    return val
  } else {
    return val.substring(0, limit) + "..."
    // return val.substring(0, limit)
  }
}

export default longSentenceCut