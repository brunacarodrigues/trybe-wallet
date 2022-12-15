// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { WALLET_ACTION,
  EXPENSE_ACTION,
  DELETE_ACTION,
  SAVE_ACTION,
  EDIT_ACTION }
  from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  edit: false,
  idEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case WALLET_ACTION:
    return {
      ...state,
      currencies: action.payload,
    };
  case EXPENSE_ACTION:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_ACTION:
    return {
      ...state,
      expenses: action.payload,
    };
  case EDIT_ACTION:
    return {
      ...state,
      edit: true,
      idEdit: action.payload,
    };
  case SAVE_ACTION:
    return {
      ...state,
      expenses: state.expenses.map((el) => (el.id === Number(state.idEdit)
        ? ({ id: el.id, ...action.payload, exchangeRates: el.exchangeRates })
        : el)),
      edit: false,
    };
  default:
    return state;
  }
};

export default wallet;
