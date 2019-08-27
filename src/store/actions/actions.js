/**
 * @enum
 * Pseudo Enumerated constants of actions and action creators
 */
export const SET_INITIAL_STATE = 'SET_INITIAL_STATE';

export const ADD_PRODUCT = 'ADD_PRODUCT';

export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

export const EDIT_PRODUCT = 'EDIT_PRODUCT';


export const setInitialState = (payload) => {
  return {
    type : SET_INITIAL_STATE,
    payload
  }
};
