import React from 'react'


type Props = {
  accomplished: number
}

// タスクの達成状況によってタイトルの色を変える
// 緑 → 銀 → 金 の順で変わる
// ローカルストレージのキーは 'accomplished-task'

const classToggle = (val: number): string => {
  if (val >=  20) {
    return "py-3 header gold-background"
  } else if (val >= 10) {
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
    <header id='header' className={classToggle(props.accomplished)}>
      <a href='/' className='top-link'>
        {/* サイト名 */}
        <h1 className='main-title'>Tasks Maketh Man</h1>
        {/* サブタイトル */}
        <h3 className='sub-title'>SIMPLE TODO LIST</h3>        
      </a>

    </header>
    </>
  )
}

export default Header