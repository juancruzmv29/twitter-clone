import { DRAG_IMAGE_STATES } from 'helpers/constants'
import { useState } from 'react'
import useGlobalContext from './useGlobalContext'

/**
 * Hook para manejar los estados del drag and drop en el textarea
 * @returns {object}
 */
const useHandlers = () => {
   const [message, setMessage] = useState('')
   const { drag, setDrag } = useGlobalContext()

   const handleDragEnter = event => {
      event.preventDefault()
      setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
   }
   const handleDragLeave = event => {
      event.preventDefault()
      setDrag(DRAG_IMAGE_STATES.NONE)
   }

   return {
      message,
      setMessage,
      handleDragEnter,
      handleDragLeave,
      drag
   }
}

export default useHandlers