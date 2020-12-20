import React, { useEffect } from 'react'
import { Container } from "react-bootstrap";
import { Table } from '../../components/table'
import { useHistory } from 'react-router-dom';
import { getEscolas } from '../../store/escolas/escolas.action';
import { useDispatch, useSelector } from 'react-redux';

const Escolas = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getEscolas())
  }, [])

  const escolas = useSelector((state) => state.escolas.escolas)

  return (
    <Container>
      <Table
        title='Escolas'
        buttonTitle='Adicionar nova escola'
        firstTableTitle='Nome'
        secondTableTitle='CNPJ'
        buttonAdd={() => history.push('/escolas/form')}
        datas={escolas}
        attributes={['id', 'name', 'cnpj']}
        url='/escolas/form'
      />
    </Container>
  )
}
export default Escolas;
