import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import { Auth, RecoveryPassword } from "../pages/auth";
import { Home } from "../pages/home";
import { Alunos, AlunosForm } from "../pages/alunos";
import { Escolas, EscolasForm } from "../pages/escolas";
import { Turmas, TurmasForm } from "../pages/turmas";
import { Usuarios, UsuariosForm } from "../pages/usuarios";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/auth" component={Auth} />
        <Route exact path="/recovery" component={RecoveryPassword} />
        <PrivateRoute exact path="/home" component={Home} />

        <PrivateRoute exact path="/alunos" component={Alunos} />
        <PrivateRoute exact path="/alunos/form" component={AlunosForm} />
        <PrivateRoute exact path="/alunos/form/:id" component={AlunosForm} />

        <PrivateRoute exact path="/escolas" component={Escolas} />
        <PrivateRoute exact path="/escolas/form" component={EscolasForm} />
        <PrivateRoute exact path="/escolas/form/:id" component={EscolasForm} />

        <PrivateRoute exact path="/turmas" component={Turmas} />
        <PrivateRoute exact path="/turmas/form" component={TurmasForm} />
        <PrivateRoute exact path="/turmas/form/:id" component={TurmasForm} />

        <PrivateRoute exact path="/usuarios" component={Usuarios} />
        <PrivateRoute exact path="/usuarios/form" component={UsuariosForm} />
        <PrivateRoute exact path="/usuarios/form/:id" component={UsuariosForm} />

        <Redirect from="*" to="/home" />
      </Switch>
    </BrowserRouter>
  );
};
export default Router;
