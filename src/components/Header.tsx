import React from 'react'

type Props = {
  accomplished: number
}

// タスクの達成状況によってタイトルの色を変える
// 緑 → 銀 → 金 の順で変わる
// ローカルストレージのキーは 'accomplished-task'

// 問題の箇所
// [ToDo] ローカルの達成率が変わっても緑から変わらない問題を解決する
//        ついでにリアルタイムで変化するよう修正する
const classToggle = (val: number): string => {
  if (val >= 3 ) {
    return "py-3 header gold-background"
  } else if (val >= 2) {
    return "py-3 header silver-background"
  } else if (val >= 1) {
    return "py-3 header green-background"
  } else {
    return "py-3 header default-background"
  }
}

const Header = (props: Props) => {
  return (
    <>

    <header className={classToggle(props.accomplished)}>
      {/* サイト名 */}
      <h1 className='main-title'>Tasks Maketh Man</h1>
      {/* サブタイトル */}
      <h3 className='sub-title'>SIMPLE TODO LIST</h3>
    </header>
    </>
  )
}

export default Header