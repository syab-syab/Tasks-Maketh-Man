import React from 'react'
import { changeProps } from '../../types/All.types'

interface DateProps extends changeProps {
  year: string
  month: string
}

// 後で改修
// 月やうるう年で変更
const SelectDate = (props: DateProps) => {

  const maxDay = (y: string, m: string): number => {
    const intY = Number(y)
    const intM = Number(m)
    // 31日間=32, 30日間=31, 28日間=29, 29日間=30
    switch (intM) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        return 32
      case 4:
      case 6:
      case 9:
      case 11:
        return 31
      // うるう年の求め方は厳密には違う
      case 2:
        if(intY % 4 === 0) {
          return 30
        }
        return 29 
    }
    return 1
  }
  
  const days = (): number[] => {
    let days = []
    const max: number = maxDay(props.year, props.month)
    for (let i: number = 1; i < max; i++) {
      days.push(i)
    }
    return days
  }

  return (
    <div>
      <select
        onChange={(e) => props.onChange(e)}
        disabled={props.month ? false : true}
        className='form-select'
      >
        <option value="">日を選択</option>
        {
          days().map((d) => {
            return <option key={d} value={d}>{d}日</option>
          })
        }
      </select>
    </div>
  )
}

export default SelectDate