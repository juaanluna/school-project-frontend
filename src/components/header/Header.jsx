import React, { useContext } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import logo from '../../assets/logoHomeDark.png'
import { useDispatch } from "react-redux";
import { logout } from '../../store/usuarios/usuarios.action';
import Switch from 'react-switch';
import { ThemeContext } from 'styled-components';
import './header.css'

const Header = ({ toggleTheme }) => {
  const dispatch = useDispatch();
  const { title } = useContext(ThemeContext)

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/home">
        <img src={logo} alt='viaMaker' id="img" style={{ width: '100px' }} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/usuarios">Usuários</Nav.Link>
          <Nav.Link href="/escolas">Escolas</Nav.Link>
          <Nav.Link href="/turmas">Turmas</Nav.Link>
          <Nav.Link href="/alunos">Alunos</Nav.Link>

        </Nav>
        <Nav>
          <Nav.Link href="/auth" onClick={() => dispatch(logout())}>Sair</Nav.Link>
        </Nav>
        <Nav style={{ display: 'flex', alignItems: 'center' }}>
          <Switch
            onChange={() => toggleTheme()}
            checked={title === 'dark'}
            checkedIcon={false}
            uncheckedIcon={false}
            height={10}
            width={40}
            handleDiameter={20}
          />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header