import React, { useState, useEffect, useCallback } from 'react'
import { Form, Col, Button } from "react-bootstrap";
import { FaPlus, FaPen } from "react-icons/fa";
import DefaultForm from "../../components/form";
import { createTurmas, updateTurmas, deleteTurmas, findTurmas } from '../../store/turmas/turmas.action'
import { getEscolas } from '../../store/escolas/escolas.action'
import { Modal } from "../../components/modal";
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

const TurmasForm = (props) => {

  const { id } = props.match.params;

  const [name, setName] = useState("");
  const [escola, setEscola] = useState("");
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
    dispatch(findTurmas(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getEscolas())
  }, [dispatch])

  const turma = useSelector((state) => state.turmas.turma);
  const escolas = useSelector((state) => state.escolas.escolas);
  const isFetching = useSelector((state) => state.turmas.isFetching);

  useEffect(() => {
    if (!id) return;
    if (!turma) return;
    if (turma.id !== Number(id)) return;

    setName(turma.name);
    setEscola(turma.escola);
  }, [turma, id]);

  const onChange = (setState) => (event) => setState(event.target.value);

  const onRegister = useCallback(() => {
    const values = { name, escola };
    dispatch(createTurmas(values));
  }, [dispatch, name, escola]);

  const onUpdate = useCallback(() => {
    const values = { name, escola };
    dispatch(updateTurmas(values, id));
  }, [dispatch, name, escola, id]);

  const onDelete = useCallback(() => {
    dispatch(deleteTurmas(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (isFirst) setIsFirst(false)
    else if (!isFetching) setCanRedirect(true)
  }, [isFetching])

  if (canRedirect) return <Redirect to='/turmas' />

  return (

    <DefaultForm
      icon={id ? <FaPen /> : <FaPlus />}
      title={id ? "Atualizar turma" : "Cadastrar turma"}
      buttonSubmit={id ? 'Atualizar' : "Salvar"}
      buttonCancel={id ? 'Deletar' : "Cancelar"}
      onClickSend={id ? onUpdate : onRegister}
      onClickCancel={id ? () => setModalOpen(true) : () => window.location.replace("/turmas")}
    >
      <>
        <Modal
          show={modalOpen}
          onHide={() => setModalOpen(false)}
          title="Deletar turma"
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
            Tem certeza que deseja deletar <b>{turma.name}</b>?
        </a>
        </Modal>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Nome da turma</Form.Label>
            <Form.Control
              placeholder="Ex: Turma #1"
              onChange={onChange(setName)}
              value={name}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Escola:</Form.Label>
            <Form.Control
              as="select"
              value={escola}
              onChange={onChange(setEscola)}
            >
              <option>Selecione...</option>
              {escolas.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form.Row>
      </>
    </DefaultForm >
  )
}
export default TurmasForm
