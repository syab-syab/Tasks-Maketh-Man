import React from 'react'


// タスクの達成状況によってタイトルの色を変える
// 緑 → 銀 → 金 の順で変わる
// ローカルストレージのキーは 'accomplished-task'



const localAccomplishedTask: any = localStorage.getItem('accomplished-task')

const accomplishedTask: number = localAccomplishedTask ? Number(localAccomplishedTask) : 0

// const [accomplished, setAccomplished] = useState(accomplishedTask)

console.log(accomplishedTask)

// 問題の箇所
// [ToDo] ローカルの達成率が変わっても緑から変わらない問題を解決する
//        ついでにリアルタイムで変化するよう修正する
const classToggle = (val: number): string => {
  if (val >= 1) {
    return "py-3 header green-background"
  } else if (val >= 2) {
    return "py-3 header silver-background"
  } else if (val >= 3) {
    return "py-3 header gold-background"
  } else {
    return "py-3 header default-background"
  }
}

const Header = () => {
  return (
    <>
    <header className={classToggle(accomplishedTask)}>
      {/* サイト名 */}
      <h1 className='main-title'>Tasks Maketh Man</h1>
      {/* サブタイトル */}
      <h3 className='sub-title'>SIMPLE TODO LIST</h3>
    </header>
    </>
  )
}

export default Header