import React, { useCallback, useState } from 'react'
import './auth.css'
import { signin } from "../../store/usuarios/usuarios.action";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom'
import { Button, FormControl } from 'react-bootstrap'
import { createUsers } from '../../store/usuarios/usuarios.action'

const Auth = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const dispatch = useDispatch();

  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  };

  const authenticate = useCallback(() => {
    const values = { email, password };
    dispatch(signin(values));
  }, [dispatch, email, password]);

  const onRegisterUser = useCallback(() => {
    const values = { name, email, password };
    dispatch(createUsers(values));
  }, [dispatch, name, email, password]);

  const onChange = (setState) => (event) => setState(event.target.value);
  const isAuth = useSelector((state) => state.usuarios.isAuth);

  if (isAuth) {
    return <Redirect to="/home" />;
  }
  return (
    <section className="form-section" style={{backgroundColor:'#343a40'}}>
      <h1>Seja bem-vindo(a)</h1>

      <div className="form-wrapper" style={{ zIndex: 10 }}>
        <form id="formAuth">
          {isRegister &&
            <div className="input-block">
              <label >Nome</label>
              <FormControl
                type="email"
                onChange={onChange(setName)}
              />
            </div>
          }

          <div className="input-block">
            <label >E-mail</label>
            <FormControl
              type="email"
              onChange={onChange(setEmail)}
            />
          </div>
          <div className="input-block">
            <label htmlFor="login-password">Senha</label>
            <FormControl
              type="password"
              id="login-password"
              onChange={onChange(setPassword)}
            />
          </div>
          <Button
            className="btn-login"
            disabled={!validateForm()}
            onClick={isRegister ? () => onRegisterUser() : () => authenticate()}
          >
            {isRegister ? 'Criar usuário' : 'Login'}
          </Button>
          <div>
            <label className="input-block"
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 15,
                marginBottom: 0,
                color: '#000'
              }}
            >
              {isRegister ? 'Já possui uma conta?' : 'Não possui conta?'}
            </label>
            <a
              className="input-block"
              onClick={isRegister ? () => setIsRegister(false) : () => setIsRegister(true)}
              style={{
                display: 'flex',
                justifyContent: 'center',
                cursor:'pointer'
              }}
            >
              {isRegister ? 'Voltar para o login' : 'Cadastre-se'}
            </a>
          </div>
        </form>
        <div>
          <a id='recoveryPassword'>  Esqueceu sua senha?</a>
          <a id='recoveryPassword' style={{fontWeight:'bold'}} href='/recovery'> Recuperar</a>
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
    </section>
  )
}

export default Auth;
