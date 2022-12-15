import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import mockData from './helpers/mockData';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Renderiza a página e testa...', () => {
  const expMock1 = {
    id: 0,
    description: 'expense01',
    value: '119',
    currency: 'CAD',
    method: 'Cartão de débito',
    tag: 'Alimentação',
    exchangeRates: mockData,
  };
  const expMock2 = {
    id: 1,
    description: 'expense02',
    value: '645',
    currency: 'BTC',
    method: 'Dinheiro',
    tag: 'Lazer',
    exchangeRates: mockData,
  };
  it('as despesas são editadas corretamente', async () => {
    const addExpense = 'Adicionar despesa';
    const initialEntries = ['/carteira'];
    const initialState = {
      wallet: {
        expenses: [expMock1, expMock2],
        editing: false,
        idToEdit: '0',
        currencies: Object.keys(mockData),
      } };
    renderWithRouterAndRedux(<App />, { initialEntries, initialState });
    const editButtonForm = screen.getByRole('button', { name: addExpense });
    const editButton = screen.getAllByTestId('edit-btn');
    userEvent.click(editButton[0]);
    expect(editButtonForm.textContent).toBe('Editar despesa');
    const valueInput = screen.getByTestId('value-input');
    const currencyInput = await screen.getByTestId('currency-input');
    const currOption = await screen.findByRole('option', { name: 'EUR' });
    const descInput = screen.getByTestId('description-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const cashOption = screen.getByRole('option', { name: 'Cartão de débito' });
    const eatOption = screen.getByRole('option', { name: 'Trabalho' });
    userEvent.clear(valueInput);
    userEvent.type(valueInput, '30');
    userEvent.selectOptions(currencyInput, currOption);
    userEvent.type(descInput, 'trinta dólares');
    userEvent.selectOptions(methodInput, cashOption);
    userEvent.selectOptions(tagInput, eatOption);
    userEvent.click(editButtonForm);
    const buttonEditable = await screen.findByRole('button', { name: addExpense });
    expect(buttonEditable.textContent).toBe(addExpense);
  });
});
