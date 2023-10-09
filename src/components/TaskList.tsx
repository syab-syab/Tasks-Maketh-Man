import React, {useState} from 'react'
import longSentenceCut from '../functions/longSentenceCut'
import showDueDate from '../functions/showDueDate'
import { Task } from '../types/All.types'
import checkDueDate from '../functions/checkDueDate'
import { Button } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Card from 'react-bootstrap/Card';
// react-modalは使わない
// 自力でモーダルを作れそう
// [ToDo]confirmで代用する

// ExampleとHomeから切り出したTaskのリスト

type Props = {
  tasks: Array<Task>
  // int と boolean を渡す
  // onChange: (id: number, check: boolean) => void
  onClick: (id: number) => void
}

const TaskList = (props: Props) => {
  // const [isOpen, setIsOpen] = useState(false)

  // const customStyles = {
  //   content: {
  //     top: '50%',
  //     left: '50%',
  //     right: 'auto',
  //     bottom: 'auto',
  //     marginRight: '-50%',
  //     transform: 'translate(-50%, -50%)',
  //     padding: 0,
  //   },
  // }

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
      alert("おめでとう！")
      props.onClick(val.id)
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
            <Card.Title className="me-auto">{task.content}</Card.Title>
            {/* [ToDo]メモをポップオーバーにする */}
            <Card.Text className="text-muted">メモ: {longSentenceCut(task.memo)}</Card.Text>
            <Button onClick={() => toggleModal(task)} variant="primary">詳細</Button>
          </Card.Body>
          {/* tsだと () => method の形にしないとエラーが出る */}
          <Card.Footer>期日: {showDueDate(task.dueDate)}</Card.Footer>
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