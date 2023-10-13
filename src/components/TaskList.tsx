// import React, {useState} from 'react'
import { useLocation } from "react-router-dom"
import longSentenceCut from '../functions/longSentenceCut'
import showDueDate from '../functions/showDueDate'
import { Task } from '../types/All.types'
// import checkDueDate from '../functions/checkDueDate'
import { Button } from 'react-bootstrap';
// import Toast from 'react-bootstrap/Toast';
// import ToastContainer from 'react-bootstrap/ToastContainer';
import Card from 'react-bootstrap/Card';
import { BiAlarm } from "react-icons/bi";
import { CiMemoPad } from "react-icons/ci";
// ExampleとHomeから切り出したTaskのリスト

type Props = {
  tasks: Array<Task>
  // int と boolean を渡す
  // onChange: (id: number, check: boolean) => void
  onClick: (id: number) => void
  // accomplished: number
  setAccomplished:  () => void
}

const TaskList = (props: Props) => {
  const location = useLocation();
  console.log(location.pathname, location.pathname === "/")
  console.log(location.pathname, location.pathname === "/example")


  // --------------------- 達成率 ------------------------------------------

  // const accomplishedKey: string = 'accomplished-task'

  // let accomplishedTasks: number = 0

  // if(!(localStorage.getItem(accomplishedKey))) {
  //   localStorage.setItem(accomplishedKey, "")
  // } else {
  //   const tmp: any = localStorage.getItem(accomplishedKey)
  //   accomplishedTasks = Number(tmp)
  // }

  // const addAccomplished = (): void => {
  //   const tmp: number = accomplishedTasks + 1
  //   localStorage.setItem(accomplishedKey, String(tmp))
  // }

  // console.log("達成率", accomplishedTasks)

  // --------------------- 達成率 end --------------------------------------

  const toggleModal = (val: Task) => {
    // setIsOpen(!isOpen);
    const result = window.confirm(`
        内容: ${val.content}\n
        メモ: ${val.memo.length > 0 ? val.memo : "無し"}\n
        期限: ${showDueDate(val.dueDate)}\n
        ----------------------------------\n
        タスクを達成しましたか？
      `)
    if (result) {
      alert("達成できてえらい！")
      props.onClick(val.id)
      props.setAccomplished()

    } else {
      alert("引き続き頑張って！")
    }
  }
  // [ToDo] 個別のTaskをクリックしたらモーダルウィンドウが出るようにする
  return (
    // <div style={{textAlign: "center", margin: "auto"}} className='d-flex justify-content-center'>
    <div className='
      task-card-container
      
    '>
    {
        props.tasks.map(task => {
        // return 付けないとエラー発生するから注意
        return (
        // 期日設定の有無でスタイル変更
        // <p
        //   key={task.id}
        //   style={{borderBottom: task.dueDate ? "1rem solid green" : "", width: "auto", background: checkDueDate(task.dueDate) ? "rgba(255, 255, 128, .5)" : "gray"}}
        //   onClick={() => toggleModal(task)}
        // >
        <Card key={task.id} className="
          task-card
          d-inline-block

        ">

          <Card.Body>
            <Card.Title className="me-auto">{longSentenceCut(10, task.content)}</Card.Title>
            {/* [ToDo]メモをポップオーバーにする */}
            <Card.Text className="text-muted"><CiMemoPad/>: {longSentenceCut(5, task.memo)}</Card.Text>
            <Button onClick={() => toggleModal(task)} variant="dark">Check</Button>
          </Card.Body>
          {/* tsだと () => method の形にしないとエラーが出る */}
          <Card.Footer><BiAlarm />: {showDueDate(task.dueDate)}</Card.Footer>
        </Card>
        // </p>
        )
      })
    }
    {/* </div> */}
    </div>
  )
}

export default TaskList