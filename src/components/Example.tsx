import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { Task } from '../types/All.types'
import createUnixTime from '../functions/createUnixTime';
import createDueTime from '../functions/createDueTime';
import testData from '../data/test-data.json'
import SubmitForm from './SubmitForm';
// import longSentenceCut from '../functions/longSentenceCut';
import TaskList from './TaskList';
import { Button } from 'react-bootstrap';
import {AiOutlinePlus} from "react-icons/ai";
import {MdOutlineLockReset} from "react-icons/md"
import {AiOutlineHome} from "react-icons/ai"

const Example = () => {

  // 必要ないかもしれんけど一応型定義
  // AllTaskにしたいけどエラーが出る
  const testTask: Array<Task> = testData['test-data']
  localStorage.setItem("test-task", JSON.stringify(testTask))

  // string型だとエラーになるからやむを得ずanyにした
  const getTask: any  = localStorage.getItem("test-task")

  // なぜこの型定義で成功したのかいまいちわかってないので後日チェック
  const modiTask: Array<Task> = JSON.parse(getTask)

  // タスクのstate
  const [tasks, setTasks] = useState<Array<Task>>(modiTask)


  // --------------------- ここから期日関係 start --------------------- 
  const [year, setYear] = useState<string>('')
  const [month, setMonth] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [hour, setHour] = useState<string>('')
  const [minutes, setMinutes] = useState<string>('')

  const handleChangeDateTimeState = (
    e: React.ChangeEvent<HTMLSelectElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ): void => {
    setState(e.target.value)
  }

  // --------------------- ここまで期日関係 end -----------------------

  // --------------------- ここから新タスク関係 start -----------------------
  // 追加されるタスクのstate
  const [inputValue, setInputValue] = useState<string>("")

  // 追加されるmemoのstate
  const [inputMemo, setInputMemo] = useState<string>("")

  // 削除ボタンでtasks削除
  const handleDelete = (id: number): void => {
    const newTasks = tasks.filter((t) => t.id !== id)
    setTasks(newTasks)
  }

    // タスクのリセット
    const resetTasks = (): void => {
      const result = window.confirm(
        "タスクをリセットしますか？"
      )
      if (result) {
        setTasks([])  
        alert("リセットしました。")
        alert("このようにして全タスクを消去できます。\n再読み込みすれば元に戻ります。")
      } else {
        alert("引き続き頑張って！")
      }
    }

  // 新しいTaskの登録
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // 新しいTaskを作成
    const newTask: Task = {
      // 現在のUNIX時間ならidは被らない
      id: createUnixTime(),
      content: inputValue,
      // [ToDo]期日を反映させる
      dueDate: createDueTime([year, month, date, hour, minutes]),
      memo: inputMemo,
    };

    // スプレッド構文(pushで代用可能かも)
    setTasks([newTask, ...tasks])
    setInputValue("")
    setInputMemo("")
    console.log(tasks)

    // 終わったら期日の各stateを初期化
    setYear("")
    setMonth("")
    setDate("")
    setHour("")
    setMinutes("")
  }

  // フォームの変更を検知
  const inputValueHandleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  }

  // inputMemo用
  const inputMemoHandleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputMemo(e.target.value)
  }

  // --------------------- ここまで新タスク関係 end -------------------------

  // --------------------- モーダル ----------------------------------------
  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  // --------------------- モーダル end ------------------------------------

  // --------------------- TaskListに渡すフェイク関数 ----------------------
  const fakeAccomplished = () => alert("このようにしてタスクを達成済みにします。")

  // --------------------- 達成率リセット関係(ペナルティ) -------------------
  
  const fakePenaltyReset = (): void => {
    alert("期限を過ぎると達成率がリセットされるのでご注意ください。")
  }

  // --------------------- 達成率リセット関係(ペナルティ) end ---------------

  return (
    <div>
      <h3 className='my-3'>Sample</h3>
      <div>
        <Button onClick={handleShow} variant="dark" className='mb-3'><AiOutlinePlus/>New Task</Button>
        <SubmitForm
          inputValue={inputValue}
          dateTimeStates={[year, month, date, hour, minutes]}
          setDateTimeStates={[setYear, setMonth, setDate, setHour, setMinutes]}
          inputMemo={inputMemo}
          modalShow={show}
          onSubmit={(e) => handleSubmit(e)}
          onChange={(e) => inputValueHandleChange(e)}
          onChangeDateTimeState={handleChangeDateTimeState}
          onChangeMemo={(e) => inputMemoHandleChange(e)}
          onHide={handleClose}
        />
        <div>
          <Button onClick={resetTasks} variant="dark" className='mb-3'><MdOutlineLockReset/>Reset Task</Button>
      </div>
      </div>
      {/* [ToDo] タスクをflex-boxで良い感じにして、レスポンシブ対応させる。画面を小さくしたら一列にすること */}
      {/* [ToDo] 余りに文が長ければ省略すること。省略した文は後述のポップアップ表示で全文表示させる */}
      {/* [ToDp] タスクをクリックしたらポップアップを表示する */}
      {/* <div style={{textAlign: "center", margin: "auto"}} className='d-flex justify-content-center'>
      {
          tasks.map(task => {
          return (
          <p key={task.id} style={{borderBottom: task.dueDate ? "1rem solid green" : "", width: "auto", background: checkDueDate(task.dueDate) ? "rgba(255, 255, 128, .5)" : "gray"}}>
            <input type="checkbox" onChange={() => handleCheck(task.id, task.check)} />
              <span style={{textDecoration: task.check ? 'line-through' : 'none'}}>{task.content}</span>
              <input type='button' value="del" onClick={() => handleDelete(task.id)} /><br />
              <span>メモ: {longSentenceCut(task.memo)}</span><br />
              <span>期日: {dateAp(task.dueDate)}</span>
          </p>
          )
        })
      }
      </div> */}
      {/* [ToDo] TaskListがちょっと不安なので色々試してみる */}
      {/* [ToDo] 不安なので↑の原形は消さない */}
      <TaskList
        tasks={tasks}
        onClick={handleDelete}
        setAccomplished={fakeAccomplished}
        penalty={fakePenaltyReset}
      />
      <div className='mb-2'>
        <Link to='/'>
          <Button variant="dark">
            <AiOutlineHome/>HOME
          </Button>
        </Link>        
      </div>
      {/* <a href="/">HOME</a> */}
    </div>
  )
}

export default Example