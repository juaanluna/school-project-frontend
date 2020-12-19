import React, { useEffect } from 'react'
import { Container } from "react-bootstrap";
import { Table } from '../../components/table'
import { useHistory } from 'react-router-dom';
import { getUsers } from '../../store/usuarios/usuarios.action';
import { useDispatch, useSelector } from 'react-redux';

const Usuarios = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  const users = useSelector((state) => state.usuarios.usuarios)

  return (
    <Container>

      <Table
        title='Usuários'
        buttonTitle='Adicionar novo usuário'
        firstTableTitle='Nome'
        secondTableTitle='E-mail'
        buttonAdd={() => history.push('/usuarios/form')}
        datas={users}
        attributes={['id', 'name', 'email']}
        url='/usuarios/form'
      />

    </Container>
  )
}
export default Usuarios;
