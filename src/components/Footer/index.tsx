'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import PinterestIcon from '@mui/icons-material/Pinterest'
import TwitterIcon from '@mui/icons-material/Twitter'

import Loading from '@/app/loading'
import Button from '../Common/Button'
import Input from '../Common/Input'
const FooterDescription = dynamic(() => import('./FooterDescription'))

import styles from './Footer.module.css'

const Footer = () => {
  const {
    footer,
    content,
    footer_content,
    mail_content,
    title_main,
    bottom,
    copyright,
    sponsor,
  } = styles
  return (
    <Suspense fallback={<Loading />}>
      <div className={footer}>
        <div className={content}>
          <div className={footer_content}>
            <FooterDescription />
            <div className={mail_content}>
              <h2 className={title_main}>Join our mailing list</h2>
              <Input background="" placeholder="your@email.com" />
              <Button background="light" text="Sign Up" />
            </div>
          </div>
          <div className={bottom}>
            <p className={copyright}>Copyright 2022 Avion LTD</p>
            <div className={sponsor}>
              <LinkedInIcon style={{ color: 'white' }} />
              <FacebookIcon style={{ color: 'white' }} />
              <InstagramIcon style={{ color: 'white' }} />
              <TwitterIcon style={{ color: 'white' }} />
              <PinterestIcon style={{ color: 'white' }} />
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  )
}

export default Footer
