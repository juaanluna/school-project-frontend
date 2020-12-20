import React, { useContext } from 'react';
import logoLight from '../../assets/logoHomeLight.png';
import logoDark from '../../assets/logoHomeDark.png';
import './home.css';
import { ThemeContext } from 'styled-components';

const Home = () => {
  const { title } = useContext(ThemeContext)
  return (
    <div id='homeContainer'>
      {title === 'dark' ?
        <img src={logoDark} id='img'  />
        :
        <img src={logoLight} id='img'/>
      }
    </div>
  )
}
export default Home
