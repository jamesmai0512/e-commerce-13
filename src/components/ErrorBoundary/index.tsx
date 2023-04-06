'use client'

import { Component, ReactNode } from 'react'
import Button from '../Common/Button'

import styles from './ErrorBoundary.module.css'

interface IState {
  hasError: boolean
  error: Error | null
}

interface IProps {
  children: ReactNode
}

class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): IState {
    return {
      hasError: true,
      error: error,
    }
  }

  componentDidCatch(error: Error) {
    this.setState({
      error,
    })
  }

  render() {
    const { error_boundary_box } = styles

    const handleErrorFalse = () => {
      this.setState({ hasError: false })
    }

    if (this.state.hasError) {
      return (
        <div className={error_boundary_box}>
          <text>An error has been occurred!! </text>
          <text>{this.state.error?.message}</text>

          <Button
            text={'Try again?'}
            background={'dark'}
            onClick={handleErrorFalse}
          />
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
