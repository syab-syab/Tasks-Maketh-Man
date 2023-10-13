import React from 'react'
import { changeProps } from '../../types/All.types'

interface MonthProps extends changeProps {
  year: string
}

// 後で改修
const SelectMonth = (props: MonthProps) => {
  return (
    <div>
      <select
        onChange={(e) => props.onChange(e)}
        disabled={props.year ? false : true}
        className='form-select'
      >
        <option value="">月を選択</option>
        {/* <option value="1">1月</option>
        <option value="2">2月</option>
        <option value="3">3月</option>
        <option value="4">4月</option>
        <option value="5">5月</option>
        <option value="6">6月</option>
        <option value="7">7月</option>
        <option value="8">8月</option>
        <option value="9">9月</option>
        <option value="10">10月</option>
        <option value="11">11月</option>
        <option value="12">12月</option> */}
        <option value="0">1月</option>
        <option value="1">2月</option>
        <option value="2">3月</option>
        <option value="3">4月</option>
        <option value="4">5月</option>
        <option value="5">6月</option>
        <option value="6">7月</option>
        <option value="7">8月</option>
        <option value="8">9月</option>
        <option value="9">10月</option>
        <option value="10">11月</option>
        <option value="11">12月</option>
      </select>
    </div>
  )
}

export default SelectMonth