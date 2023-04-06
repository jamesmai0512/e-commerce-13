import { memo } from 'react'

import styles from './Button.module.css'

export interface ButtonProps {
  text: string
  background: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  type?: 'button' | 'submit' | 'reset' | undefined
}

const Button = ({ onClick, type, background, text }: ButtonProps) => {
  const { button } = styles

  return (
    <button
      type={type}
      data-testid="button-component"
      className={`${button} ${styles[background]}`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default memo(Button)
