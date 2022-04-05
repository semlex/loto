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
      cellClick(state, action) {
         const { fieldNum, number } = action.payload

         if (!state.isRaffled) {
            if (state.fields[fieldNum].selected.includes(number)) {
               state.fields[fieldNum].selected = state.fields[fieldNum].selected.filter(item => item !== number)
               state.fields[fieldNum].isError = false
               state.fields[fieldNum].errorText = ''
            } else if (state.fields[fieldNum].selected.length < state.fields[fieldNum].maxSelected) {
               state.fields[fieldNum].selected.push(number)
               state.fields[fieldNum].isError = false
               state.fields[fieldNum].errorText = ''
            } else {
               state.fields[fieldNum].isError = true
               const max = state.fields[fieldNum].maxSelected
               let errorText = `Можно отметить лишь ${max}`
               if (max === 1) {
                  errorText += ' число.'
               } else if (max > 1 && max < 5) {
                  errorText += ' числа.'
               } else {
                  errorText += ' чисел.'
               }
               state.fields[fieldNum].errorText = errorText
            }
         }
      },
      fillWithRandoms(state, action) {
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
         const isFilled = state.fields.every(field => (
            field.selected.length === field.maxSelected
         ))

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