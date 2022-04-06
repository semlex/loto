import { createSlice } from '@reduxjs/toolkit'
import generateRandoms from '../utils/generateRandoms'

const fields = [
   {
      min: 1,
      max: 19,
      maxSelected: 8,
      cells: [...Array(19).keys()].map(i => i + 1),
      selected: [],
      answer: generateRandoms({length: 8, min: 1, max: 19}),
      isError: false,
      errorText: ''
   },
   {
      min: 1,
      max: 2,
      maxSelected: 1,
      cells: [1, 2],
      selected: [],
      answer: generateRandoms({ length: 1, min: 1, max: 2 }),
      isError: false,
      errorText: ''
   }
]

const ticketSlice = createSlice({
   name: 'ticket',
   initialState: {
      number: 1,
      fields,
      pointsToWin: 4,
      isRaffled: false,
      isWin: false,
      isFetching: false,
      isServerSuccess: false,
      isServerError: false,
   },
   reducers: {
      // Handle click on cell
      cellClick(state, action) {
         const { fieldNum, number } = action.payload
         const field = state.fields[fieldNum]

         // If ticket is raffled, the user can't change selected numbers
         if (!state.isRaffled) {
            // When the user clicks on a number he has already selected
            if (field.selected.includes(number)) {
               field.selected = field.selected.filter(item => item !== number)
               field.isError = false
               field.errorText = ''
            } else if (field.selected.length < field.maxSelected) {
               field.selected.push(number) // When the user clicks on a number that hasn't been selected
               field.isError = false
               field.errorText = ''
            } else {                  // When the user tries to select number but
               field.isError = true   // the limit of numbers in field has been reached
               const max = field.maxSelected
               let errorText = `Можно отметить лишь ${max}`
               if (max === 1) {
                  errorText += ' число.'
               } else if (max > 1 && max < 5) {
                  errorText += ' числа.'
               } else {
                  errorText += ' чисел.'
               }
               field.errorText = errorText
            }
         }
      },
      // Select random numbers in fields
      fillWithRandoms(state, action) {
         // If ticket is raffled, user can't change selected numbers
         if (!state.isRaffled) {
            state.fields = state.fields.map(field => {
               field.selected = generateRandoms({
                  length: field.maxSelected,
                  min: field.min,
                  max: field.max
               })

               field.isError = false
               field.errorText = ''

               return field
            })
         }
      },
      checkTicket(state, action) {
         // Check if all fields are filled
         const isFilled = state.fields.every(field => (
            field.selected.length === field.maxSelected
         ))

         // If all fields are filled, check ticket
         if (isFilled) {
            let fullPoints = 0
            state.fields = state.fields.map(field => {
               const points = field.answer.filter(item => field.selected.includes(item)).length
               field.isError = false
               field.errorText = ''
               fullPoints += points
               return field
            })

            state.isRaffled = true
            if (fullPoints >= state.pointsToWin) {
               state.isWin = true
            }
         } else {
            state.fields.map(field => {
               if (field.selected.length < field.maxSelected) {
                  field.isError = true
                  field.errorText = 'Необходимо заполнить поле.'
               }

               return field
            })
         }
      },
      // Take another ticket
      retry(state, action) {
         state.number += 1
         state.isRaffled = false
         state.isWin = false
         state.isFetching = false
         state.isServerSuccess = false
         state.isServerError = false

         state.fields = state.fields.map(field => {
            field.selected = []
            field.answer = generateRandoms({
               length: field.maxSelected,
               min: field.min,
               max: field.max
            })
            field.isError = false
            field.errorText = ''

            return field
         })
      },
      requestStart(state, action) {
         state.isFetching = true
         state.isServerSuccess = false
         state.isServerError = false
      },
      requestSuccess(state, action) {
         state.isFetching = false
         state.isServerSuccess = true
         state.isServerError = false
      },
      requestError(state, action) {
         state.isFetching = false
         state.isServerSuccess = false
         state.isServerError = true
      }
   }
})

export const {
   cellClick,
   checkTicket,
   fillWithRandoms,
   retry,
   requestStart,
   requestSuccess,
   requestError
} = ticketSlice.actions

export default ticketSlice.reducer