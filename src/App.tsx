import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import DashBoard from './Components/DashBoard'
import ForgotPassword from './Components/ForgotPassword'
import Login from './Components/Login'
import Signup from './Components/Signup'
import { AppProvider } from './Contexts/AppContext'

function App() {

  return (
    <div className="bg-[#20212C] min-h-screen font-jakarta">
      <AppProvider>
        <Router>
          <Routes>
            <Route path='/' element={<DashBoard />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/signup' element={<Signup />}/>
            <Route path='/forgotpassword' element={<ForgotPassword />}/>
          </Routes>
        </Router>
      </AppProvider>
    </div>
  )
}

export default App
