import React, { useEffect } from 'react'
import { Container } from "react-bootstrap";
import { Table } from '../../components/table'
import { useHistory } from 'react-router-dom';
import { getTurmas } from '../../store/turmas/turmas.action';
import { useDispatch, useSelector } from 'react-redux';

const Turmas = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTurmas())
  }, [])

  const data = useSelector((state) => state.turmas.turmas)
  const turmas = data.map((item) => {
    return {
      ...item,
      escola: item.escolas.name
    }
  })
 
  return (
    <Container>

      <Table
        title='Turmas'
        buttonTitle='Adicionar nova turma'
        firstTableTitle='Turma'
        secondTableTitle='Escola'
        buttonAdd={() => history.push('/turmas/form')}
        datas={turmas}
        attributes={['id', 'name', 'escola']}
        url='/turmas/form'
      />

    </Container>
  )
}
export default Turmas;
