'use client'

import { useRouter } from 'next/navigation'

import styles from './styles/not_found.module.css'

const NotFound = () => {
  const { button_return_home, text_center, text_center_error, text_not_found } =
    styles

  const router = useRouter()

  const handleReturnHome = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault()
    router.push(`/`)
  }

  return (
    <div className="flex-container">
      <div className={text_center}>
        <h1 className={text_center_error}>404</h1>
        <h3 className={text_not_found}>PAGE NOT FOUND</h3>
        <button
          aria-label="return-home"
          onClick={handleReturnHome}
          className={button_return_home}
          type="button"
          name="button"
        >
          Return To Home
        </button>
      </div>
    </div>
  )
}

export default NotFound
