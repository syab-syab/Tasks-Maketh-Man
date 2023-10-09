import React from 'react'
import { changeProps } from '../../types/All.types'

interface YearProps extends changeProps {
  year: string
}

// 後で改修
const SelectYear = (props: YearProps) => {
  const years = (): number[] => {
    const date = new Date()
    const year = date.getFullYear()
    let years = []
    for (let i:number = 0; i < 21; i++) {
      years.push(year + i)
    }
    return years
  }


  return (
    <div>
      {/* <select onChange={(e) => props.onChange(e)} disabled={props.appear ? false : true}> */}
      <select
        onChange={(e) => props.onChange(e)}
        value={props.year}
        className='form-select'
      >
        <option value="">年を選択</option>
        {
          years().map((y) => {
            return <option key={y} value={y}>{y}</option>
          })
        }
      </select>
    </div>
  )
}

export default SelectYear