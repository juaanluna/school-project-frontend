import React, { useState, useEffect, useCallback } from 'react'
import { Form, Col, Button } from "react-bootstrap";
import { FaPlus, FaPen } from "react-icons/fa";
import DefaultForm from "../../components/form";
import { createEscolas, updateEscolas, deleteEscolas, findEscolas } from '../../store/escolas/escolas.action'
import { Modal } from "../../components/modal";
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import InputMask from 'react-input-mask';

const EscolasForm = (props) => {

  const { id } = props.match.params;

  const [name, setName] = useState("");
  const [cnpj, setCnpj] = useState("");
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
    dispatch(findEscolas(id));
  }, [dispatch, id]);

  const escola = useSelector((state) => state.escolas.escola);
  const isFetching = useSelector((state) => state.escolas.isFetching);

  useEffect(() => {
    if (!id) return;
    if (!escola) return;
    if (escola.id !== Number(id)) return;

    setName(escola.name);
    setCnpj(escola.cnpj);
  }, [escola, id]);

  const onChange = (setState) => (event) => setState(event.target.value);

  const onRegister = useCallback(() => {
    const values = { name, cnpj };
    dispatch(createEscolas(values));
  }, [dispatch, name, cnpj]);

  const onUpdate = useCallback(() => {
    const values = { name, cnpj };
    dispatch(updateEscolas(values, id));
  }, [dispatch, name, cnpj, id]);

  const onDelete = useCallback(() => {
    dispatch(deleteEscolas(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (isFirst) setIsFirst(false)
    else if (!isFetching) setCanRedirect(true)
  }, [isFetching])

  if (canRedirect) return <Redirect to='/escolas' />

  return (

    <DefaultForm
      icon={id ? <FaPen /> : <FaPlus />}
      title={id ? "Atualizar escola" : "Cadastrar escola"}
      buttonSubmit={id ? 'Atualizar' : "Salvar"}
      buttonCancel={id ? 'Deletar' : "Cancelar"}
      onClickSend={id ? onUpdate : onRegister}
      onClickCancel={id ? () => setModalOpen(true) : () => window.location.replace("/escolas")}
    >
      <>
        <Modal
          show={modalOpen}
          onHide={() => setModalOpen(false)}
          title="Deletar escola"
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
            Tem certeza que deseja deletar <b>{escola.name}</b>?
        </a>
        </Modal>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              placeholder="Ex: Escola #1"
              onChange={onChange(setName)}
              value={name}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>CNPJ</Form.Label>
            <InputMask
             style={{display:'flex', flexDirection:'column', width:'100%', height:'40px'}}
              mask='99.999.999/9999-99'
              placeholder="Ex: 00.000.000/0000-00"
              onChange={onChange(setCnpj)}
              value={cnpj} />
          </Form.Group>
        </Form.Row>
      </>
    </DefaultForm >
  )
}
export default EscolasForm
