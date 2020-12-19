import { toastr } from "react-redux-toastr";
import Api from "../../config";
import axios from "axios";

export const AlunosTypes = {
  ISFETCHING: "@alunos/fetch",
  ERROR: "@alunos/error",

  GET_ALUNOS: "@alunos/get",
  FIND_ALUNO: "@alunos/find",
  CREATE_ALUNO: "@alunos/create",
  UPDATE_ALUNO: "@alunos/update",
  DELETE_ALUNO: "@alunos/delete",
};

export const getAlunos = () => (dispatch) => {
  dispatch({ type: AlunosTypes.ISFETCHING });
  axios
    .get(`${Api}/alunos`)
    .then((resp) => {
      dispatch({ type: AlunosTypes.GET_ALUNOS, payload: resp.data });
    })
    .catch((erro) => {
      console.log(erro);
    });
};

export const findAlunos = (id) => (dispatch) => {
  dispatch({ type: AlunosTypes.ISFETCHING });
  axios
    .get(`${Api}/alunos/${id}`)
    .then((resp) => {
      dispatch({ type: AlunosTypes.FIND_ALUNO, payload: resp.data });
    })
    .catch((erro) => {
      console.log(erro);
    });
};

export const createAlunos = (values) => (dispatch) => {
  dispatch({ type: AlunosTypes.ISFETCHING });
  axios
    .post(`${Api}/alunos`, values)
    .then((resp) => {
      dispatch({ type: AlunosTypes.CREATE_ALUNO, payload: resp.data });
      toastr.success('Aluno cadastrado')
    })
    .catch((erro) => {
      console.log(erro);
    });
};

export const updateAlunos = (values, id) => (dispatch) => {
  dispatch({ type: AlunosTypes.ISFETCHING });
  axios
    .put(`${Api}/alunos/${id}`, values)
    .then((resp) => {
      dispatch({ type: AlunosTypes.UPDATE_ALUNO, payload: resp.data });
      toastr.success('Aluno editado')
    })
    .catch((erro) => {
      console.log(erro);
    });
};

export const deleteAlunos = (id) => (dispatch) => {
  dispatch({ type: AlunosTypes.ISFETCHING });
  axios
    .delete(`${Api}/alunos/${id}`)
    .then((resp) => {
      dispatch({ type: AlunosTypes.DELETE_ALUNO, payload: resp.data });
      toastr.success('Aluno deletado')
    })
    .catch((erro) => {
      console.log(erro);
    });
};
