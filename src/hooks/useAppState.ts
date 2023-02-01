import { useContext } from 'react'
import { appContext } from '../providers/AppProvider'

const useAppState = () => {
  const context = useContext(appContext)
  return context
}

export { useAppState }
