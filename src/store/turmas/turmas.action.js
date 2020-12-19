import { toastr } from "react-redux-toastr";
import Api from "../../config";
import axios from "axios";

export const TurmaTypes = {
  ISFETCHING: "@turma/fetch",
  ERROR: "@turma/error",

  GET_TURMAS: "@turma/get",
  FIND_TURMA: "@turma/find",
  CREATE_TURMA: "@turma/create",
  UPDATE_TURMA: "@turma/update",
  DELETE_TURMA: "@turma/delete",
};

export const getTurmas = () => (dispatch) => {
  dispatch({ type: TurmaTypes.ISFETCHING });
  axios
    .get(`${Api}/turmas`)
    .then((resp) => {
      dispatch({ type: TurmaTypes.GET_TURMAS, payload: resp.data });
    })
    .catch((erro) => {
      console.log(erro);
    });
};

export const findTurmas = (id) => (dispatch) => {
  dispatch({ type: TurmaTypes.ISFETCHING });
  axios
    .get(`${Api}/turmas/${id}`)
    .then((resp) => {
      dispatch({ type: TurmaTypes.FIND_TURMA, payload: resp.data });
    })
    .catch((erro) => {
      console.log(erro);
    });
};

export const createTurmas = (values) => (dispatch) => {
  dispatch({ type: TurmaTypes.ISFETCHING });
  axios
    .post(`${Api}/turmas`, values)
    .then((resp) => {
      dispatch({ type: TurmaTypes.CREATE_TURMA, payload: resp.data });
      toastr.success('Turma cadastrada')
    })
    .catch((erro) => {
      console.log(erro);
    });
};

export const updateTurmas = (values, id) => (dispatch) => {
  dispatch({ type: TurmaTypes.ISFETCHING });
  axios
    .put(`${Api}/turmas/${id}`, values)
    .then((resp) => {
      dispatch({ type: TurmaTypes.UPDATE_TURMA, payload: resp.data });
      toastr.success('Turma atualizada')
    })
    .catch((erro) => {
      console.log(erro);
    });
};

export const deleteTurmas = (id) => (dispatch) => {
  dispatch({ type: TurmaTypes.ISFETCHING });
  axios
    .delete(`${Api}/turmas/${id}`)
    .then((resp) => {
      dispatch({ type: TurmaTypes.DELETE_TURMA, payload: resp.data });
      toastr.success('Turma deletada')
    })
    .catch((erro) => {
      console.log(erro);
    });
};
