const generateRandoms = ({ length, min, max }) => {
   let array = []
   let item

   while (array.length < length) {
      item = Math.floor(Math.random() * (max - min + 1)) + min
      if (!array.includes(item)) {
         array.push(item)
      }
   }

   return array
}

export default generateRandoms