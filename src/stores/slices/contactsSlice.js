import {createSelector, createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  contacts: [],
  contactsCopy: [],
};

const {reducer, actions} = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact(state, {payload}) {
      let newContactsArr = [...state.contacts];
      const details = {
        email: payload.email,
        fname: payload.fname,
        lname: payload.lname,
        mname: payload.mname,
        phoneNo: payload.phoneNo,
      };
      newContactsArr.push(details);
      state.contacts = [...newContactsArr];
    },
    updateContact(state, {payload}) {
      let newContactsArr = [...state.contacts];
      const details = {
        email: payload.email,
        fname: payload.fname,
        lname: payload.lname,
        mname: payload.mname,
        phoneNo: payload.phoneNo,
      };
      newContactsArr[payload.index] = {
        ...details,
      };
      state.contacts = [...newContactsArr];
    },
    deleteContact(state, {payload}) {
      let newContactsArr = [...state.contacts];
      newContactsArr.splice(payload.index);
      state.contacts = [...newContactsArr];
    },
  },
});

const selectRoot = state => state.contacts;

export const contactsSelector = {
  contacts: createSelector(selectRoot, state => state.contacts),
};

export const contactsAction = {...actions};

export const contactsReducer = reducer;
