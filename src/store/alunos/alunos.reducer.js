import { AlunosTypes } from "../alunos/alunos.action";

const INITIAL_STATE = {
  aluno: {},
  alunos: [],
  isFetching: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case AlunosTypes.ISFETCHING:
      return { ...state, isFetching: true }

    case AlunosTypes.GET_ALUNOS:
      return { ...state, alunos: action.payload };

    case AlunosTypes.FIND_ALUNO:
      return { ...state, aluno: action.payload };

    case AlunosTypes.CREATE_ALUNO:
      return { ...state, isFetching: false }

    case AlunosTypes.UPDATE_ALUNO:
      return { ...state, isFetching: false }

    case AlunosTypes.DELETE_ALUNO:
      return { ...state, isFetching: false }

    default:
      return state;
  }
};
