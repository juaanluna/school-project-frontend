import React, { useContext } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom'
import './form.css'
import { ThemeContext } from 'styled-components';

const DefaultForm = ({
  title,
  children,
  buttonSubmit,
  buttonCancel,
  icon,
  onClickCancel,
  onClickSend
}) => {
  const history = useHistory()
  const { colors } = useContext(ThemeContext)

  return (
    <>
      <Container>
        <div className="card" id='formContainer'>
          <a
            className="arrowBack"
            style={{ backgroundColor: colors.background, color: colors.text }}
            onClick={() => history.goBack()}
            id='goBack'
          >
            <FaArrowLeft /> Voltar
          </a>{" "}

          <div
            className="card-header"
            id='card'
            style={{ color: colors.alternativeTextColor }}
          >
            <a className="formIcon" id='icon'>
              {icon}
            </a>{" "}
            <h4 style={{ margin: "0px" }}>{title}</h4>
          </div>
          <div className="card-body"
            style={{ backgroundColor: colors.background }}

          >
            <Form sm={8}>
              {children}
              <Button variant="success" className="btnDefault" onClick={onClickSend}>
                {" "}
                {buttonSubmit}{" "}
              </Button>{" "}
              <Button variant="outline-danger" onClick={onClickCancel}>{buttonCancel}</Button>
            </Form>
          </div>
        </div>
      </Container>
    </>
  );
};


DefaultForm.propTypes = {
  title: PropTypes.string,
  buttonSubmit: PropTypes.string,
  buttonCancel: PropTypes.string,
  children: PropTypes.element.isRequired,
  icon: PropTypes.element.isRequired,
  onClickSend: PropTypes.func,
  onClickCancel: PropTypes.func,
}

export default DefaultForm;
