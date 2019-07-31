import * as actionTypes from '../actions/modal.actions';

const initialState = {
  showAddModal: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_ADD_MODAL:
      return { ...state, showAddModal: !state.showAddModal };
    default:
      return state;
  }
}