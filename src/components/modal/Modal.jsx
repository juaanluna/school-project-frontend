import React, { useCallback, useContext } from "react";
import { Button, Modal as ModalComponent } from "react-bootstrap";
import PropTypes from "prop-types";
import { ThemeContext } from 'styled-components';

const Modal = ({
  title,
  children,
  buttonModal,
  btnFooter, // Caso precise criar um botão com algum padrão específico
  onHide,
  show,
  onSubmit,
  onlySubmit,
  onClickCancel,
  textCancel,
}) => {
  const onClickSubmit = useCallback(() => {
    if (onSubmit) {
      onSubmit();
      if (onlySubmit) return;
    }
    if (onHide) onHide();
  }, [onHide, onSubmit, onlySubmit]);

  const { colors } = useContext(ThemeContext)
  return (
    <ModalComponent
      style={{ opacity: 1 }}
      show={show}
      onHide={onHide}
      backdrop="static"
      keyboard={false}
    >
      <ModalComponent.Header closeButton style={{backgroundColor:colors.background}}>
        <ModalComponent.Title style={{ color: colors.text }}>{title}</ModalComponent.Title>
      </ModalComponent.Header>
      <ModalComponent.Body style={{backgroundColor:colors.background}}>{children}</ModalComponent.Body>
      <ModalComponent.Footer style={{backgroundColor:colors.background}}>
        {btnFooter ? (
          <div>{btnFooter}</div>
        ) : (
            <>
              {onClickCancel && (
                <Button variant="danger" onClick={onClickCancel}>
                  {textCancel}
                </Button>
              )}
              <Button variant="primary" onClick={onClickSubmit}>
                {buttonModal}
              </Button>
            </>
          )}
      </ModalComponent.Footer>
    </ModalComponent>
  );
};

Modal.defaultProps = {
  show: false
}

Modal.propTypes = {
  title: PropTypes.string,
  buttonModal: PropTypes.string,
  btnFooter: PropTypes.object,
  onHide: PropTypes.func,
  show: PropTypes.bool,
  onSubmit: PropTypes.func,
  onlySubmit: PropTypes.array,
  onClickCancel: PropTypes.array,
  textCancel: PropTypes.string,
  children: PropTypes.element.isRequired,
};

export default Modal;
