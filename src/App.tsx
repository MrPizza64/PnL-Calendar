import styled from 'styled-components'
import './App.css'
import ModalsCompiler from './components/modals/compiler'
import { Calendar } from './pages/calendar'
import { Landing } from './pages/landing'
import { useSelector } from 'react-redux'
import type { RootState } from './common/store'
import { NavBar } from './components/navbar'

const AppContainer = styled.div`
  margin-left: 20rem;
  margin-right: 20rem;
`

function App() {
  const accounts = useSelector(
    (state: RootState) => state.accounts
  )

  return (
    <>
      <NavBar/>
      <ModalsCompiler />
      {accounts.currentAccount && (
        <AppContainer>
          <Calendar/>
        </AppContainer>
      )}

      {!accounts.currentAccount && <Landing />}    
    </>
  )
}

export default App
