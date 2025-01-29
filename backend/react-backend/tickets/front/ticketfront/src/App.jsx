
import { Route } from 'react-router'
import './App.css'
import TicketForm from './components/TicketForm'
import { Routes} from 'react-router'
function App() {
  

  return (
    <>
    <Routes>
    <Route 
    path="/" 
    element={<TicketForm />} 
    />

    </Routes>
   
    </>
      
  )
}

export default App
