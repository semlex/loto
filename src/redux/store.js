import { configureStore } from '@reduxjs/toolkit'
import ticketReducer from './ticketSlice'

const store = configureStore({
   reducer: {
      ticket: ticketReducer
   },
   devTools: false
})

export default store