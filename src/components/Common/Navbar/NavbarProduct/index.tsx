'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import InputSearch from '../../Input/InputSearch'

import { NAVBAR } from '../../../../constants/common'

import styles from '../Navbar.module.css'

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

const NavbarProduct = () => {
  const { navbar_product, brand_name, navbar, nav_link, cart_button } = styles
  const router = useRouter()
  const [query, setQuery] = useState('')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const handleFormSubmitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    router.push(`/products?search=${query}`)
  }

  return (
    <div className={navbar_product}>
      <Link className={brand_name} href="/">
        Avion
      </Link>

      <nav>
        <ul className={navbar}>
          {NAVBAR.map((i) => (
            <li key={i.label}>
              <Link
                href={{
                  pathname: '/products',
                  query: { category: i.query },
                }}
                passHref
                className={nav_link}
                aria-label="navbar"
              >
                {i.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className={cart_button}>
        <InputSearch
          onChange={handleSearch}
          handleFormSubmit={handleFormSubmitSearch}
          position="right"
        />
        <Link href="/user/carts" aria-label="shopping cart">
          <ShoppingCartIcon style={{ color: 'black', fontSize: 17 }} />
        </Link>

        <Link href="/user/carts" aria-label="account">
          <AccountCircleIcon style={{ color: 'black', fontSize: 17 }} />
        </Link>
      </div>
    </div>
  )
}

export default NavbarProduct
