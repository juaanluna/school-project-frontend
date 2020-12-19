import { EscolasTypes } from "../escolas/escolas.action";

const INITIAL_STATE = {
  escola: {},
  escolas: [],
  isFetching: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EscolasTypes.ISFETCHING:
      return { ...state, isFetching: true }

    case EscolasTypes.GET_ESCOLAS:
      return { ...state, escolas: action.payload };

    case EscolasTypes.FIND_ESCOLA:
      return { ...state, escola: action.payload };

    case EscolasTypes.CREATE_ESCOLA:
      return { ...state, isFetching: false }

    case EscolasTypes.UPDATE_ESCOLA:
      return { ...state, isFetching: false }

    case EscolasTypes.DELETE_ESCOLA:
      return { ...state, isFetching: false }

    default:
      return state;
  }
};
