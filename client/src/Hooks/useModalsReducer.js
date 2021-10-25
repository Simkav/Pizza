import { useReducer } from 'react';
import ACTION from '../Actions/actionTypes';

export default function useModalsReducer () {
  const initState = {
    addModal: { state: false, closed: true },
    editModal: { state: false, closed: true },
    deleteModal: { state: false, closed: true },
  };

  const modalReducer = (state = initState, action) => {
    switch (action.type) {
      case ACTION.OPEN_ADD_MODAL:
        return { ...state, addModal: { state: true, closed: false } };
      case ACTION.OPEN_DELETE_MODAL:
        return {
          ...state,
          deleteModal: { ...action.payload, state: true, closed: false },
        };
      case ACTION.OPEN_EDIT_MODAL:
        return {
          ...state,
          editModal: { ...action.payload, state: true, closed: false },
        };
      case ACTION.ON_CLOSE_ADD_MODAL:
        return { ...state, addModal: { ...state.addModal, state: false } };
      case ACTION.ON_ADD_MODAL_CLOSED:
        return { ...state, addModal: { ...state.addModal, closed: true } };
      case ACTION.ON_CLOSE_DELETE_MODAL:
        return {
          ...state,
          deleteModal: { ...state.deleteModal, state: false },
        };
      case ACTION.ON_DELETE_MODAL_CLOSED:
        return {
          ...state,
          deleteModal: { ...state.deleteModal, closed: true },
        };
      case ACTION.ON_CLOSE_EDIT_MODAL:
        return { ...state, editModal: { ...state.editModal, state: false } };
      case ACTION.ON_EDIT_MODAL_CLOSED:
        return { ...state, editModal: { ...state.editModal, closed: true } };

      default:
        return state;
    }
  };

  const [modalsState, modalsDispatch] = useReducer(modalReducer, initState);

  return [modalsState, modalsDispatch];
}
