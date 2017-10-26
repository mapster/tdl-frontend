import * as type from '../constants/actionTypes';

export const request = (description, action) => ({
  type: type.CONFIRMATION_REQUEST,
  data: {description, action},
});

export const confirm = (action) => ({type: type.CONFIRMATION_CONFIRM, data: action});

export const decline = () => ({type: type.CONFIRMATION_DECLINE});