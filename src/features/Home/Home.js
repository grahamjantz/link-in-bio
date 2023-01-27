import React from 'react'
import './Home.css'

import Header from '../Header/Header'
import Links from '../Links/Links'
import Footer from '../Footer/Footer'

const Home = () => {
  return (
    <div className='home'>
        <Header />
        <Links />
        <Footer />
    </div>
  )
}

export default Home