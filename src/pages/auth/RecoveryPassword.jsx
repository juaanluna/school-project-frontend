import React, { useCallback, useState } from 'react'
import './auth.css'
import { useDispatch, useSelector } from "react-redux";
import { Button, FormControl } from 'react-bootstrap'
import { sendEmail, changePassword } from "../../store/usuarios/usuarios.action";

const Recovery = () => {

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [isSendEmail, setSendEmail] = useState(false);

  const dispatch = useDispatch();

  const validateForm = () => {
    return email.length > 0
  };

  const onSendEmail = useCallback(() => {
    setSendEmail(true)
    dispatch(sendEmail({ email }))
  }, [dispatch, email])

  const onChangePassword = useCallback(() => {
    const values = { email, newPassword, recoveryCode: code }
    dispatch(changePassword(values))
  }, [dispatch, email, newPassword, code])

  const onChange = (setState) => (event) => setState(event.target.value);
  const isAuth = useSelector((state) => state.usuarios.isAuth);

  return (
    <section className="form-section" style={{ backgroundColor: '#343a40' }}>
      <h1>Recuperação de senha</h1>

      <div className="form-wrapper" style={{ zIndex: 10 }}>
        <form id="formAuth">

          <div className="input-block" >
            <label>
              {isSendEmail ? 'Insira o código enviado em seu e-mail' : 'Enviaremos um código por e-mail'}
            </label>
          </div>

          {!isSendEmail &&
            <div className="input-block">
              <label
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {isSendEmail ? 'Código de recuperação' : 'Informe seu e-mail'}
              </label>
              <FormControl
                type="email"
                onChange={onChange(setEmail)}
              />
            </div>}

          {isSendEmail &&
            <div className="input-block">
              <label
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                Código de recuperação
              </label>
              <FormControl
                type="email"
                onChange={onChange(setCode)}
              />
            </div>
          }

          {isSendEmail &&
            <div className="input-block">
              <label
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                Nova senha
              </label>
              <FormControl
                type="email"
                onChange={onChange(setNewPassword)}
              />
            </div>
          }

          <Button
            className="btn-login"
            disabled={!validateForm()}
            onClick={isSendEmail ? () => onChangePassword() : () => onSendEmail()}
          >
            {isSendEmail ? 'Alterar senha' : 'Enviar'}
          </Button>

        </form>
        <div>
          <a
            id='recoveryPassword'
            style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }}
            onClick={() => window.location.replace('/auth')}
          >
            Voltar para o login
          </a>
        </div>


        <div className="animation-area">
          <ul className="box-area">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </section >
  )
}

export default Recovery;
