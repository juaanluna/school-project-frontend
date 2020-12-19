import { TurmaTypes } from "../turmas/turmas.action";

const INITIAL_STATE = {
  turma: {},
  turmas: [],
  isFetching: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TurmaTypes.ISFETCHING:
      return { ...state, isFetching: true }

    case TurmaTypes.GET_TURMAS:
      return { ...state, turmas: action.payload };

    case TurmaTypes.FIND_TURMA:
      return { ...state, turma: action.payload };

    case TurmaTypes.CREATE_TURMA:
      return { ...state, isFetching: false }

    case TurmaTypes.UPDATE_TURMA:
      return { ...state, isFetching: false }

    case TurmaTypes.DELETE_TURMA:
      return { ...state, isFetching: false }

    default:
      return state;
  }
};
