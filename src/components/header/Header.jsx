import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import logo from '../../assets/logo.png'
import { useDispatch } from "react-redux";
import { logout } from '../../store/usuarios/usuarios.action';

const Header = () => {
  const dispatch = useDispatch();

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
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header