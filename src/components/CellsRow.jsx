import styled from 'styled-components'
import Cell from './Cell'

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
`

const CellsRow = ({ fieldNum, cells, selected, answer, isRaffled }) => {
   return (
      <Container>
         {cells.map((item, i) => (
            <Cell
               key={i}
               number={item}
               fieldNum={fieldNum}
               isActive={selected.includes(item)}
               isCorrect={answer.includes(item)}
               isRaffled={isRaffled}
            />
         ))}
      </Container>
   )
}

export default CellsRow