import { ChangeEvent, memo } from 'react'

import styles from '../Input.module.css'

export interface InputNumberProps {
  value: number
  onDecrease: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onIncrease: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const InputNumber = ({ value, onDecrease, onIncrease }: InputNumberProps) => {
  const {
    input_number_amount,
    button_control_left,
    input_number,
    button_control_right,
  } = styles
  return (
    <div className={input_number_amount}>
      <button
        role="button-control-left"
        onClick={onDecrease}
        className={button_control_left}
      >
        -
      </button>
      <label htmlFor="cart-input-number">
        <input
          id="cart-input-number"
          role="cart-input-number"
          min={0}
          max={10}
          readOnly
          className={input_number}
          type="number"
          value={value}
          step="1"
        />
      </label>

      <button
        role="button-control-right"
        onClick={onIncrease}
        className={button_control_right}
      >
        +
      </button>
    </div>
  )
}

export default memo(InputNumber)
