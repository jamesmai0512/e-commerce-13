import { ChangeEvent, memo } from 'react'

import styles from '../Input.module.css'

import SearchIcon from '@mui/icons-material/Search'

export interface InputSearchProps {
  handleFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  position?: string
  value?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

const InputSearch = ({
  position = '',
  onChange,
  handleFormSubmit,
}: InputSearchProps) => {
  const { search_input, search_btn, search_btn_icon } = styles
  return (
    <form
      data-test="search-form"
      className={`${styles.search_box} ${styles[position]}`}
      onSubmit={handleFormSubmit}
    >
      <input
        role="textbox"
        data-test="input-search-box"
        onChange={onChange}
        className={search_input}
        placeholder="Search"
      />
      <button
        role="submit-button"
        type="submit"
        aria-label="Search for products"
        className={search_btn}
      >
        <SearchIcon className={search_btn_icon} />
      </button>
    </form>
  )
}

export default memo(InputSearch)
