import axios from 'axios'
import {
   requestStart,
   requestSuccess,
   requestError
} from './ticketSlice'

export const sendToServer = async (dispatch, selectedNumber,  iteration = 0) => {
   if (iteration > 2) {
      dispatch(requestError())
   } else {
      if (iteration === 0) {
         dispatch(requestStart())
      }

      await axios.post('/rock-block', selectedNumber)
         .then(res => {
            if (res.status === 200) {
               dispatch(requestSuccess())
            } else {
               throw new Error('Res status is not equal 200')
            }
         }).catch(err => {
            setTimeout(() => {
               sendToServer(dispatch, selectedNumber, iteration + 1)
            }, 2000)
         })
   }
}