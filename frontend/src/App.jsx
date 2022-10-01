import React from 'react'
import { Footer } from './common/Footer'
import { Navbar } from './common/Navbar'
import AppRoutesComponent from './routes/routes'


const App = () => {
  return (
    <div>
      <Navbar/>
        <AppRoutesComponent/>
      <Footer/>
    </div>
  )
}

export default App