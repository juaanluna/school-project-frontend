import { UserTypes } from "./usuarios.action";

const INITIAL_STATE = {
  usuario: {},
  usuarios: [],
  isFetching: false,
  isAuth: localStorage.getItem("user") ? true : false,
  signup: JSON.parse(localStorage.getItem("user")) || null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserTypes.ISFETCHING:
      return { ...state, isFetching: true }

    case UserTypes.LOGIN:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, isAuth: true, signup: action.payload };

    case UserTypes.LOGOUT:
      localStorage.removeItem("user");
      return { ...state, isAuth: false, signup: null };

    case UserTypes.GET_USERS:
      return { ...state, usuarios: action.payload };

    case UserTypes.FIND_USERS:
      return { ...state, usuario: action.payload };

    case UserTypes.CREATE_USERS:
      return { ...state, isFetching: false }

    case UserTypes.UPDATE_USERS:
      return { ...state, isFetching: false }

    case UserTypes.DELETE_USERS:
      return { ...state, isFetching: false }

    default:
      return state;
  }
};
