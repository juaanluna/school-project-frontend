import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as toastr } from 'react-redux-toastr';
import usuarios from './usuarios/usuarios.reducer';
import alunos from './alunos/alunos.reducer';
import turmas from './turmas/turmas.reducer';
import escolas from './escolas/escolas.reducer';


const reducers = combineReducers({
  toastr,
  usuarios,
  alunos,
  turmas,
  escolas,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
