'use client'

import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// Component
import InputSearch from '../../Common/Input/InputSearch'

import styles from '../Header.module.css'

// Icons
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

const HeaderContent = () => {
  const router = useRouter()
  const [query, setQuery] = useState('')

  const { cart_icon, header, header_input_search, brand_name, cart_button } =
    styles

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const handleFormSubmitSearch = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      router.push(`/products?search=${query}`)
    },
    [query, router],
  )

  return (
    <header>
      <div className={header}>
        <div className={header_input_search}>
          <InputSearch
            onChange={handleSearch}
            handleFormSubmit={handleFormSubmitSearch}
          />
        </div>

        <Link className={brand_name} href="/" aria-label="logo">
          Avion
        </Link>

        <div className={cart_button}>
          <Link href="/user/carts" aria-label="shopping cart">
            <ShoppingCartIcon className={cart_icon} />
          </Link>

          <Link href="/user/carts" aria-label="account">
            <AccountCircleIcon className={cart_icon} />
          </Link>
        </div>
      </div>
    </header>
  )
}

export default HeaderContent
