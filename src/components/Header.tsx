import React from 'react'


// タスクの達成状況によってタイトルの色を変える
// 緑 → 銀 → 金 の順で変わる
// ローカルストレージのキーは 'accomplished-task'

const Header = () => {
  return (
    <div className='py-3 header  gold-text-color'>
      {/* サイト名 */}
      <h1 className='main-title'>Tasks Maketh Man</h1>
      {/* サブタイトル */}
      <h3 className='sub-title'>SIMPLE TODO LIST</h3>
    </div>
  )
}

export default Header