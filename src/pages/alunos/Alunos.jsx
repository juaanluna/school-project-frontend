import React, { useEffect } from 'react';
import { Container } from "react-bootstrap";
import { Table } from '../../components/table'
import { useHistory } from 'react-router-dom';
import { getAlunos } from '../../store/alunos/alunos.action';
import { useDispatch, useSelector } from 'react-redux';

const Alunos = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAlunos())
  }, [])

  const data = useSelector((state) => state.alunos.alunos)
  const turmas = data.map((item) => {
    return {
      ...item,
      turma: item.turmas.name
    }
  })

  return (
    <Container>
      <Table
        title='Alunos'
        buttonTitle='Adicionar novo aluno'
        firstTableTitle='Nome'
        secondTableTitle='Turma'
        buttonAdd={() => history.push('/alunos/form')}
        datas={turmas}
        attributes={['id', 'name', 'turma']}
        url='/alunos/form'
      />
    </Container>
  )
}
export default Alunos;
