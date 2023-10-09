import React from 'react'
import SelectYear from './select/SelectYear';
import SelectMonth from './select/SelectMonth';
import SelectDate from './select/SelectDate';
import SelectHour from './select/SelectHour';
import SelectMinutes from './select/SelectMinutes';

// [ToDo] 現在よりも過去の時間を設定した場合エラーを出す
// [訂正] ↑そもそも選択できないようにする

type Props = {
  states: string[]
  setStates: React.Dispatch<React.SetStateAction<string>>[]
  onChange: (
    e: React.ChangeEvent<HTMLSelectElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => void
}

const SelectDateTime = (props: Props) => {
  console.log(
    props.states[0],
    props.states[1],
    props.states[2],
    props.states[3],
    props.states[4]
  )

  return (
    <div className='mb-3 '>
      <label className='form-label'>期日(任意)</label>
      {/* 年が未選択なら月を選ばせない */}
      <SelectYear onChange={(e) => props.onChange(e, props.setStates[0])} year={props.states[0]}/>
      {/* 月が未選択なら日を選ばせない */}
      <SelectMonth onChange={(e) => props.onChange(e, props.setStates[1])} year={props.states[0]} />
      {/* 日が未選択なら時を選ばせない */}
      <SelectDate onChange={(e) => props.onChange(e, props.setStates[2])} year={props.states[0]} month={props.states[1]} />
      {/* 時が未選択なら分を選ばせない */}
      <SelectHour onChange={(e) => props.onChange(e, props.setStates[3])} date={props.states[2]} />
      {/* 最低年月日まで必要 */}
      <SelectMinutes onChange={(e) => props.onChange(e, props.setStates[4])} hour={props.states[3]}/>
    </div>
  )
}

export default SelectDateTime