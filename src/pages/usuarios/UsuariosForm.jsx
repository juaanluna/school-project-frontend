import React, { useState, useEffect, useCallback } from 'react'
import { Form, Col, Button } from "react-bootstrap";
import { FaPlus, FaPen } from "react-icons/fa";
import DefaultForm from "../../components/form";
import { createUsers, updateUsers, deleteUsers, findUsers } from '../../store/usuarios/usuarios.action'
import { Modal } from "../../components/modal";
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

const UsuariosForm = (props) => {

  const { id } = props.match.params;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    dispatch(findUsers(id));
  }, [dispatch, id]);

  const user = useSelector((state) => state.usuarios.usuario);
  const isFetching = useSelector((state) => state.usuarios.isFetching);

  useEffect(() => {
    if (!id) return;
    if (!user) return;
    if (user.id !== Number(id)) return;

    setName(user.name);
    setEmail(user.email);
    setPassword(user.password);
  }, [user, id]);

  const onChange = (setState) => (event) => setState(event.target.value);

  const onRegister = useCallback(() => {
    const values = { name, email, password };
    dispatch(createUsers(values));
  }, [dispatch, name, email, password]);

  const onUpdate = useCallback(() => {
    const values = { name, email };
    dispatch(updateUsers(values, id));
  }, [dispatch, name, email, id]);

  const onDelete = useCallback(() => {
    dispatch(deleteUsers(id));
  }, [dispatch, id]);

  useEffect(() => {
    if(isFirst) setIsFirst(false)
    else if (!isFetching) setCanRedirect(true)
  }, [isFetching])

  if (canRedirect) return <Redirect to='/usuarios' />
  return (

    <DefaultForm
      icon={id ? <FaPen /> : <FaPlus />}
      title={id ? "Atualizar usuário" : "Cadastrar usuário"}
      buttonSubmit={id ? 'Atualizar' : "Salvar"}
      buttonCancel={id ? 'Deletar' : "Cancelar"}
      onClickSend={id ? onUpdate : onRegister}
      onClickCancel={id ? () => setModalOpen(true) : () => window.location.replace("/usuarios")}
    >
      <>
        <Modal
          show={modalOpen}
          onHide={() => setModalOpen(false)}
          title="Deletar usuário"
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
            Tem certeza que deseja deletar <b>{user.name}</b>?
        </a>
        </Modal>

        <Form.Row>
          <Form.Group as={Col} >
            <Form.Label>Nome</Form.Label>
            <Form.Control
              placeholder="Ex: Juan"
              onChange={onChange(setName)}
              value={name}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} >
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              placeholder="Ex: juan@mail.com"
              onChange={onChange(setEmail)}
              value={email}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          {!id &&
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                placeholder="Senha"
                onChange={onChange(setPassword)}
                value={password}
              />
            </Form.Group>
          }
        </Form.Row>
      </>
    </DefaultForm >
  )
}
export default UsuariosForm
