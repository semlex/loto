import styled from 'styled-components'
import Ticket from './components/Ticket'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 20px 10px;
  overflow-y: auto;
  background: rgb(69,104,220);
  background: linear-gradient(180deg, rgba(69,104,220,1) 0%, rgba(176,106,179,1) 100%);
`

const App = () => {

  return (
     <Container>
        <Ticket/>
     </Container>
  );
}

export default App
