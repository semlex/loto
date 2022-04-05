import styled from 'styled-components'

const Container = styled.div`
  max-width: 550px;
  padding: 12px 20px;
  border-radius: 10px;
  color: ${(props) => (
     (props.type === 'error' && '#721c24') ||
     (props.type === 'success' && '#155724') ||
     (props.type === 'info' && '#0c5460')
  )};
  background: ${(props) => (
     (props.type === 'error' && '#f8d7da') ||
     (props.type === 'success' && '#d4edda') ||
     (props.type === 'info' && '#d1ecf1')
  )};
`

const Alert = ({ type, children }) => {
   return (
      <Container type={type}>
         { children }
      </Container>
   )
}

export default Alert