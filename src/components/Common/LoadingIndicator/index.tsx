import styles from './LoadingIndicator.module.css'

const LoadingIndicator = () => {
  const { loading_indicator, container } = styles
  return (
    <div className={container}>
      <h1 data-testid="custom-loading-indicator" className={loading_indicator}>
        Loading
      </h1>
    </div>
  )
}

export default LoadingIndicator
