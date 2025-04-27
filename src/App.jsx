import React from 'react'
import ImageContainer from './components/ImageContainer/ImageContainer'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'

const App = () => {
  return (
    <main className='container mx-auto max-w-7xl'>
      <Header />
      <ImageContainer />
      <Footer />
    </main>
  )
}

export default App