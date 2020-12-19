import React from 'react'
import logo from '../../assets/logoHome.png'

const Home = () => {
  return (
    <div style={{ display: 'flex', justifyContent:'center', height:'75vh'}}>
      <img src={logo} style={{objectFit:'contain'}}/>

    </div >
  )
}
export default Home
