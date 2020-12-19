import React, { useState, useEffect, useCallback } from 'react'
import { Form, Col, Button } from "react-bootstrap";
import { FaPlus, FaPen } from "react-icons/fa";
import DefaultForm from "../../components/form";
import { createAlunos, updateAlunos, deleteAlunos, findAlunos } from '../../store/alunos/alunos.action'
import { Modal } from "../../components/modal";
import { useDispatch, useSelector } from 'react-redux'
import { getTurmas } from '../../store/turmas/turmas.action'
import { Redirect } from 'react-router-dom'

const AlunosForm = (props) => {

  const { id } = props.match.params;

  const [name, setName] = useState("");
  const [turma, setTurma] = useState("");
  const [isEdit, setIsEdit] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [canRedirect, setCanRedirect] = useState(false);
  const [isFirst, setIsFirst] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!id) setIsEdit(false);
  }, []);

  useEffect(() => {
    if (!id) return;
    dispatch(findAlunos(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getTurmas())
  }, [dispatch])

  const aluno = useSelector((state) => state.alunos.aluno);
  const turmas = useSelector((state) => state.turmas.turmas);
  const isFetching = useSelector((state) => state.alunos.isFetching);

  useEffect(() => {
    if (!id) return;
    if (!aluno) return;
    if (aluno.id !== Number(id)) return;

    setName(aluno.name);
    setTurma(aluno.turma);
  }, [aluno, id]);

  const onChange = (setState) => (event) => setState(event.target.value);

  const onRegister = useCallback(() => {
    const values = { name, turma };
    dispatch(createAlunos(values));
  }, [dispatch, name, turma]);

  const onUpdate = useCallback(() => {
    const values = { name, turma };
    dispatch(updateAlunos(values, id));
  }, [dispatch, name, turma, id]);

  const onDelete = useCallback(() => {
    dispatch(deleteAlunos(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (isFirst) setIsFirst(false)
    else if (!isFetching) setCanRedirect(true)
  }, [isFetching])

  if (canRedirect) return <Redirect to='/alunos' />

  return (

    <DefaultForm
      icon={id ? <FaPen /> : <FaPlus />}
      title={id ? "Atualizar aluno" : "Cadastrar aluno"}
      buttonSubmit={id ? 'Atualizar' : "Salvar"}
      buttonCancel={id ? 'Deletar' : "Cancelar"}
      onClickSend={id ? onUpdate : onRegister}
      onClickCancel={id ? () => setModalOpen(true) : () => window.location.replace("/alunos")}
    >
      <>
        <Modal
          show={modalOpen}
          onHide={() => setModalOpen(false)}
          title="Deletar aluno"
          btnFooter={
            <>
              <Button
                style={{ background: "#218838" }}
                onClick={() => {
                  onDelete();
                }}
              >
                Sim
            </Button>{" "}
              <Button variant="danger" onClick={() => setModalOpen(false)}>
                Não
            </Button>
            </>
          }
        >
          <a>
            Tem certeza que deseja deletar <b>{aluno.name}</b>?
        </a>
        </Modal>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              placeholder="Ex: Juan"
              onChange={onChange(setName)}
              value={name}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Turma:</Form.Label>
            <Form.Control
              as="select"
              value={turma}
              onChange={onChange(setTurma)}
            >
              <option>Selecione...</option>
              {turmas.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form.Row>

      </>
    </DefaultForm >
  )
}
export default AlunosForm
