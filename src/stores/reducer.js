import {combineReducers} from 'redux';
import {contactsReducer} from './slices/contactsSlice';

const rootReducer = combineReducers({
  contacts: contactsReducer,
});

export default rootReducer;
