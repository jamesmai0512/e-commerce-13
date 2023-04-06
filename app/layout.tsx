import Head from 'next/head'

export const metadata = {
  title: 'E commerce app 13',
  description: 'Generated E commerce app 13',
}

// Component
import Footer from '@/components/Footer'
import ErrorBoundary from '@/components/ErrorBoundary'

import './styles/reset.css'
import './styles/global.css'

import styles from './styles/layout.module.css'
import Header from '@/components/Header'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { layout, body } = styles

  return (
    <html lang="en">
      <Head>
        <title>E commerce app</title>
      </Head>
      <body>
        <div className={layout}>
          <ErrorBoundary>
            <Header />

            <div className={body}>{children}</div>
            <Footer />
          </ErrorBoundary>
        </div>
      </body>
    </html>
  )
}
