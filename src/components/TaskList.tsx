// import React, {useState} from 'react'
// import { useLocation } from "react-router-dom"
import longSentenceCut from '../functions/longSentenceCut'
import showDueDate from '../functions/showDueDate'
import { Task } from '../types/All.types'
import checkDueDate from '../functions/checkDueDate'
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { BiAlarm } from "react-icons/bi";
import { CiMemoPad } from "react-icons/ci";
// ExampleとHomeから切り出したTaskのリスト

type Props = {
  tasks: Array<Task>
  // int と boolean を渡す
  onClick: (id: number) => void
  setAccomplished:  () => void
  penalty: () => void
}

const TaskList = (props: Props) => {
  // const location = useLocation();
  // console.log(location.pathname, location.pathname === "/")
  // console.log(location.pathname, location.pathname === "/example")


  const toggleModal = (val: Task) => {
    const result = window.confirm(`
        内容: ${val.content}\n
        メモ: ${val.memo.length > 0 ? val.memo : "無し"}\n
        期限: ${showDueDate(val.dueDate)}\n
        ----------------------------------\n
        タスクを達成しましたか？
      `)
    if (result) {
      if (!checkDueDate(val.dueDate)) {
        alert("残念、期日を過ぎています。")
        props.onClick(val.id)
        props.penalty()
      } else {
        alert("達成できてえらい！")
        props.onClick(val.id)
        props.setAccomplished()
      }


    } else {
      alert("引き続き頑張って！")
    }
  }
  // [ToDo] 個別のTaskをクリックしたらモーダルウィンドウが出るようにする
  return (
    <div className='
      task-card-container
      
    '>
    {
        props.tasks.map(task => {
        // return 付けないとエラー発生するから注意
        return (
        <Card key={task.id} className="
          task-card
          d-inline-block

        ">
          {/* 期日を過ぎていたらスタイル変更 */}
          <Card.Body  style={{backgroundColor: checkDueDate(task.dueDate) ? "white" : "#ff0000ad"}}>
            <Card.Title className="me-auto">{longSentenceCut(10, task.content)}</Card.Title>
            {/* [ToDo]メモをポップオーバーにする */}
            <Card.Text className="text-muted"><CiMemoPad/>: {longSentenceCut(5, task.memo)}</Card.Text>
            <Button onClick={() => toggleModal(task)} variant="dark">Check</Button>
          </Card.Body>
          {/* tsだと () => method の形にしないとエラーが出る */}
          {/* 期日の有無でスタイル変更 */}
          <Card.Footer style={{backgroundColor: task.dueDate ? "#bbbbbb" : "white"}}><BiAlarm />: {showDueDate(task.dueDate)}</Card.Footer>
        </Card>
        )
      })
    }
    </div>
  )
}

export default TaskList