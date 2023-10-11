// 長文の省略
// 表示する文字数の限界値は 変数:limit で変更できる
const longSentenceCut = (limit: number, val: string): string => {
  // const limit: number = limit
  if (val.length <= limit) {
    return val
  } else {
    return val.substring(0, limit) + "..."
  }
}

export default longSentenceCut