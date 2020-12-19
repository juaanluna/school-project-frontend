import { toastr } from "react-redux-toastr";
import Api from "../../config";
import axios from "axios";

export const EscolasTypes = {
  ISFETCHING: "@escolas/fetch",
  ERROR: "@escolas/error",

  GET_ESCOLAS: "@escolas/get",
  FIND_ESCOLA: "@escolas/find",
  CREATE_ESCOLA: "@escolas/create",
  UPDATE_ESCOLA: "@escolas/update",
  DELETE_ESCOLA: "@escolas/delete",
};

export const getEscolas = () => (dispatch) => {
  dispatch({ type: EscolasTypes.ISFETCHING });
  axios
    .get(`${Api}/escolas`)
    .then((resp) => {
      dispatch({ type: EscolasTypes.GET_ESCOLAS, payload: resp.data });
    })
    .catch((erro) => {
      console.log(erro);
    });
};

export const findEscolas = (id) => (dispatch) => {
  dispatch({ type: EscolasTypes.ISFETCHING });
  axios
    .get(`${Api}/escolas/${id}`)
    .then((resp) => {
      dispatch({ type: EscolasTypes.FIND_ESCOLA, payload: resp.data });
    })
    .catch((erro) => {
      console.log(erro);
    });
};

export const createEscolas = (values) => (dispatch) => {
  dispatch({ type: EscolasTypes.ISFETCHING });
  axios
    .post(`${Api}/escolas`, values)
    .then((resp) => {
      dispatch({ type: EscolasTypes.CREATE_ESCOLA, payload: resp.data });
      toastr.success('Escola cadastrada')
    })
    .catch((erro) => {
      console.log(erro);
    });
};

export const updateEscolas = (values, id) => (dispatch) => {
  dispatch({ type: EscolasTypes.ISFETCHING });
  axios
    .put(`${Api}/escolas/${id}`, values)
    .then((resp) => {
      dispatch({ type: EscolasTypes.UPDATE_ESCOLA, payload: resp.data });
      toastr.success('Escola atualizada')
    })
    .catch((erro) => {
      console.log(erro);
    });
};

export const deleteEscolas = (id) => (dispatch) => {
  dispatch({ type: EscolasTypes.ISFETCHING });
  axios
    .delete(`${Api}/escolas/${id}`)
    .then((resp) => {
      dispatch({ type: EscolasTypes.DELETE_ESCOLA, payload: resp.data });
      toastr.success('Escola deletada')
    })
    .catch((erro) => {
      console.log(erro);
    });
};
