import { toastr } from "react-redux-toastr";
import Api from "../../config";
import axios from "axios";

export const UserTypes = {
  ISFETCHING: "@users/fetch",
  ERROR: "@users/error",

  LOGIN: "@users/login",
  LOGOUT: "@users/logout",

  SEND_EMAIL: "@users/send_email",
  CHANGE_PASSWORD: "@users/change_password",

  GET_USERS: "@users/get",
  FIND_USERS: "@users/find",
  CREATE_USERS: "@users/create",
  UPDATE_USERS: "@users/update",
  DELETE_USERS: "@users/delete",
};

export const signin = (values) => (dispatch) => {
  dispatch({ type: UserTypes.ISFETCHING });
  axios
    .post(`${Api}/auth/signin`, values)
    .then((resp) => {
      console.log(resp)
      if (resp.data.error) {
        toastr.error('Credenciais invalidas!')
        return
      }
      dispatch({ type: UserTypes.LOGIN, payload: resp.data });
      window.location.replace("/home");
      toastr.success('Seja bem-vindo!')
    })
    .catch((erro) => {
      return toastr.success(erro)
    });
};

export const logout = () => {
  return {
    type: UserTypes.LOGOUT,
  };
};

export const sendEmail = (email) => (dispatch) => {
  dispatch({ type: UserTypes.ISFETCHING });
  axios
    .post(`${Api}/auth/forgot-password`, email)
    .then((resp) => {
      toastr.success('E-mail enviado')
      dispatch({ type: UserTypes.SEND_EMAIL, payload: resp.data });
    })
    .catch((err) => {
      return toastr.error('E-mail inválido')
    });
};

export const changePassword = (values) => (dispatch) => {
  dispatch({ type: UserTypes.ISFETCHING });
  axios
    .post(`${Api}/auth/reset-password`, values)
    .then((resp) => {
      toastr.success('Senha alterada')
      dispatch({ type: UserTypes.CHANGE_PASSWORD, payload: resp.data });
      window.location.replace('/auth')
    })
    .catch((erro) => {
      return toastr.success(erro)
    });
};

export const getUsers = () => (dispatch) => {
  dispatch({ type: UserTypes.ISFETCHING });
  axios
    .get(`${Api}/users`)
    .then((resp) => {
      dispatch({ type: UserTypes.GET_USERS, payload: resp.data });
    })
    .catch((erro) => {
      console.log(erro);
    });
};

export const findUsers = (id) => (dispatch) => {
  dispatch({ type: UserTypes.ISFETCHING });
  axios
    .get(`${Api}/users/${id}`)
    .then((resp) => {
      dispatch({ type: UserTypes.FIND_USERS, payload: resp.data });
    })
    .catch((erro) => {
      console.log(erro);
    });
};

export const createUsers = (values) => (dispatch) => {
  dispatch({ type: UserTypes.ISFETCHING });
  axios
    .post(`${Api}/users`, values)
    .then((resp) => {
      dispatch({ type: UserTypes.CREATE_USERS, payload: resp.data });
      toastr.success('Usuário cadastrado')
    })
    .catch((erro) => {
      console.log(erro);
    });
};

export const updateUsers = (values, id) => (dispatch) => {
  dispatch({ type: UserTypes.ISFETCHING });
  axios
    .put(`${Api}/users/${id}`, values)
    .then((resp) => {
      dispatch({ type: UserTypes.UPDATE_USERS, payload: resp.data });
      toastr.success('Usuário atualizado')
    })
    .catch((erro) => {
      console.log(erro);
    });
};

export const deleteUsers = (id) => (dispatch) => {
  dispatch({ type: UserTypes.ISFETCHING });
  axios
    .delete(`${Api}/users/${id}`)
    .then((resp) => {
      dispatch({ type: UserTypes.DELETE_USERS, payload: resp.data });
      toastr.success('Usuário deletado')
    })
    .catch((erro) => {
      console.log(erro);
    });
};
