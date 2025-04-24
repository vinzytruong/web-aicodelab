import { combineReducers } from "redux";

import fieldsReducer from './field/reducer';
import authorsReducer from './author/reducer';
import documentsReducer from './document/reducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  field: fieldsReducer,
  author: authorsReducer,
  document: documentsReducer
});
export default reducer;
