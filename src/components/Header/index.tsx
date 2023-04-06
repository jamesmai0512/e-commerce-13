'use client'

import { usePathname } from 'next/navigation'
import NavbarProduct from '../Common/Navbar/NavbarProduct'
import HeaderContent from './HeaderContent'
import Navbar from '../Common/Navbar'

const Header = () => {
  const path = usePathname()
  const productId = '/products/[productId]'

  return (
    <>
      {path === productId ? <NavbarProduct /> : ''}
      {path === productId ? '' : <HeaderContent />}
      {path === productId ? '' : <Navbar />}
    </>
  )
}

export default Header
