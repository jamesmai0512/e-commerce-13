import { ChangeEvent, memo } from 'react'

import styles from './Input.module.css'

export interface InputProps {
  placeholder: string
  background: string
  value?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

const Input = ({
  placeholder,
  background = '',
  value,
  onChange,
}: InputProps) => {
  return (
    <input
      data-testid="input-email"
      type="email"
      value={value}
      onChange={onChange}
      className={`${styles.input_email} ${styles[background]}`}
      placeholder={placeholder}
    />
  )
}

export default memo(Input)
