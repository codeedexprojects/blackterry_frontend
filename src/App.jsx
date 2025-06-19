
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import About from './pages/About'
import Wishlist from './pages/Wishlist'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import LoginCode from './pages/LoginCode'
import Contact from './pages/Contact'
import Header from '/src/Components/Header' 
import Footer from '/src/Components/Footer'
import Profile from './pages/Profile'
import Setting from './pages/Setting'
import Details from './pages/Details'
import CheckoutPage from './pages/CheckoutPage'
import Orders from './pages/Orders'
import SizeChart from './pages/SizeChart'
import Dashboard from './Admin/Pages/Dashboard'
import AdminLogin from './Admin/Pages/AdminLogin'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/loginc' element={<LoginCode/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/wishlist' element={<Wishlist/>}/>
      <Route path='/shop' element={<Shop/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/setting' element={<Setting/>}/>
      <Route path='/details/:id' element={<Details/>}/>
      {/* <Route path='/details/:id' element={<Details/>}/> */}
      <Route path='/size-chart' element={<SizeChart/>}/>
      <Route path='/order' element={<Orders/>}/>
      <Route path='/checkout' element={<CheckoutPage/>}/>

              <Route path="/admin/*" element={<Dashboard />} />
        <Route path="/admin/login" element={< AdminLogin/>} />


    </Routes>
    {/* <Footer/> */}
    </>
  )
}

export default App
