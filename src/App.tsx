import './App.css';
import Header from './components/Header';
import { Footer } from './components/Footer';
// import Chart from './components/Chart';
import Home from './components/Home';
import Example from './components/Example';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react'

// [ToDo]
// ・ローカルストレージ
// ・ルーティング
// ・入力フォーム
// ・チェックボタン

function App() {
  // --------------------- 達成率 ------------------------------------------

  // 達成率のキー
  const accomplishedKey: string = 'accomplished-task'

  // tasksに格納する用の変数
  let accomplishedTasks: number = 0

  // localStorageに何も入っていなければからの配列を格納しておく
  if(!(localStorage.getItem(accomplishedKey))) {
    localStorage.setItem(accomplishedKey, "")
  } else {
    const tmp: any = localStorage.getItem(accomplishedKey)
    accomplishedTasks = Number(tmp)
  }

  const [accomplished, setAccomplished] = useState<number>(accomplishedTasks)

  const addAccomplished = (): void => {
    const tmp: number = accomplishedTasks + 1
    setAccomplished(tmp)
    localStorage.setItem(accomplishedKey, String(tmp))
  }

  console.log("達成率", accomplishedTasks)

  const reset = (): void => {
    localStorage.setItem(accomplishedKey, String(0))
    setAccomplished(0)
  }

  const resetAccomplished = (): void => {
    const result = window.confirm(
      "達成数をリセットしますか？"
    )
    if (result) {
      reset()
      alert("リセットしました。")
    } else {
      alert("引き続き頑張って！")
    }
  }

  // --------------------- 達成率 end --------------------------------------

  // [ToDo]こなしたタスクの数によって色を変化させる
  return (
    <div className="
    App
    ">
      <Header accomplished={accomplished} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
          <Home
            setAccomplished={addAccomplished}
            resetAccomplished={resetAccomplished}
            reset={reset}
            // accomplished={accomplished}
          />} />
          {/* <Route path="/example" element={<Example tasks={modiTask} />} /> */}
          <Route path="/example" element={<Example/>} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;