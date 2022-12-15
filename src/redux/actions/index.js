export const EMAIL_ACTION = 'EMAIL_ACTION';
export const WALLET_ACTION = 'WALLET_ACTION';
export const EXPENSE_ACTION = 'EXPENSE_ACTION';
export const DELETE_ACTION = 'DELETE_ACTION';
export const SAVE_ACTION = 'SAVE_ACTION';
export const EDIT_ACTION = 'EDIT_ACTION';

export const emailAction = (email) => ({
  type: EMAIL_ACTION,
  payload: email,
});

export const walletAction = (currencies) => ({
  type: WALLET_ACTION,
  payload: currencies,
});

export const expenseAction = (expense) => ({
  type: EXPENSE_ACTION,
  payload: expense,
});

export const deleteAction = (deleteExpense) => ({
  type: DELETE_ACTION,
  payload: deleteExpense,
});

export const saveAction = (saveExpense) => ({
  type: SAVE_ACTION,
  payload: saveExpense,
});

export const editAction = (editExpense) => ({
  type: EDIT_ACTION,
  payload: editExpense,
});
