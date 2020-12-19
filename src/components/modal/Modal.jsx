import React, { useCallback } from "react";
import { Button, Modal as ModalComponent } from "react-bootstrap";
import PropTypes from "prop-types";

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

  return (
    <ModalComponent
      style={{ opacity: 1 }}
      show={show}
      onHide={onHide}
      backdrop="static"
      keyboard={false}
    >
      <ModalComponent.Header closeButton>
        <ModalComponent.Title>{title}</ModalComponent.Title>
      </ModalComponent.Header>
      <ModalComponent.Body>{children}</ModalComponent.Body>
      <ModalComponent.Footer>
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
