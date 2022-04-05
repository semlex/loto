import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { cellClick } from '../redux/ticketSlice'

const Container = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  width: 40px;
  height: 40px;
`

const CellItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #dddddd;
  transition: 0.35s height, width 0.15s;

  ${({isActive}) => isActive && `
    width: 34px;
    height: 34px;
    border: none;
  `};

  background: ${(props) => (
     (props.isActive && !props.isRaffled && '#ffd205') ||
     (props.isActive && props.isRaffled && props.isCorrect && '#28a745') ||
     (props.isActive && props.isRaffled && !props.isCorrect && '#dc3545')
  )};
`

const Cell = ({ number, fieldNum, isActive, isCorrect, isRaffled }) => {
 const dispatch = useDispatch()

 const handleClick = () => {
    dispatch(cellClick({
       fieldNum,
       number
    }))
 }

 return (
    <Container>
       <CellItem
          isActive={isActive}
          isCorrect={isCorrect}
          isRaffled={isRaffled}
          onClick={handleClick}
       >
          {number}
       </CellItem>
    </Container>
 )
}

export default Cell