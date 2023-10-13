import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { Task } from '../types/All.types'
import createUnixTime from '../functions/createUnixTime';
import createDueTime from '../functions/createDueTime';
import SubmitForm from './SubmitForm';
import TaskList from './TaskList';
import { Button } from 'react-bootstrap';
import {AiOutlinePlus} from "react-icons/ai";
import {MdOutlineLockReset} from "react-icons/md"
import {LuTimerReset} from "react-icons/lu"
import {BsPencilFill} from "react-icons/bs"
import checkDueDate from "../functions/checkDueDate"

type Props = {
  setAccomplished: () => void
  resetAccomplished: () => void
  reset: () => void
}

const Home = (props: Props) =>  {

  // taskのデータを格納するキー
  const tasksKey = "local-task"

  // tasksに格納する用の変数
  let localTasks: Array<Task> | Array<any> = []

  // localStorageに何も入っていなければ空の配列を格納しておく
  if(!(localStorage.getItem(tasksKey))) {
    localStorage.setItem(tasksKey, "")
    localTasks = []
  } else {
    const tmp: string | any = localStorage.getItem(tasksKey)
    localTasks = JSON.parse(tmp)
  }

  // タスクのstate
  const [tasks, setTasks] = useState<Array<Task> | Array<any>>(localTasks)


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
    // setTasksの後に必ずsetItemを行う
    localStorage.setItem(tasksKey, JSON.stringify(newTasks))
  }

  
  // タスクのリセット
  const resetTasks = (): void => {
    const result = window.confirm(
      "タスクをリセットしますか？"
    )
    const tmp = tasks.find(t => checkDueDate(t.dueDate) === false)
    if (result) {
      localStorage.setItem(tasksKey, "")
      setTasks([])  
      alert("リセットしました。")
      if (tmp) {
        alert("期日を超過したタスクを検知しました。")
        penaltyReset()
      }
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

    // スプレッド構文
    const tmpTasks: Task[] = [newTask, ...tasks]
    setTasks(tmpTasks)
    // このsetItemだけ特殊(スプレッド構文のせい)
    localStorage.setItem(tasksKey, JSON.stringify(tmpTasks))
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

  // --------------------- 達成率リセット関係(ペナルティ) -------------------

  const penaltyReset = (): void => {
    alert("ペナルティとして達成率をリセットします。")
    props.reset()
  }

  // --------------------- 達成率リセット関係(ペナルティ) end ---------------


  return (
    <div>
      <div>
        <Button onClick={handleShow} variant="dark" className='my-3'><AiOutlinePlus/>New Task</Button>
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
      </div>
      <div>
        <Button onClick={resetTasks} variant="dark" className='mb-3'><MdOutlineLockReset/>Reset Task</Button>
      </div>
      <TaskList
        tasks={tasks}
        onClick={handleDelete}
        setAccomplished={props.setAccomplished}
        penalty={penaltyReset}
      />
      <div className='my-3'>
        <Button onClick={props.resetAccomplished} variant="dark"><LuTimerReset/>Reset Achievement</Button>
      </div>
      <div className='mb-2'>
        <Link to="/example" className='bottom-link'>
          <Button variant="dark"><BsPencilFill/>Sample</Button>
        </Link>
      </div>
    </div>
  )
}

export default Home