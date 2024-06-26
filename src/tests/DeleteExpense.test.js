import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';
import { renderWithRouterAndRedux } from './helpers/renderWith';

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

describe('Renderiza a página Wallet e testa...', () => {
  it('o botão com o texto Excluir é renderizado', async () => {
    renderWithRouterAndRedux(<Wallet />);
    const removeBtn = await screen.findByRole('button', { name: /adicionar despesa/i });
    userEvent.click(removeBtn);
    expect(await screen.findByRole('button', { name: /excluir/i })).toBeInTheDocument();
  });
  it('o botão está inicialmente habilitado', () => {
    renderWithRouterAndRedux(<Wallet />);
    const deleteBtn = screen.getByRole('button');
    expect(deleteBtn).toBeEnabled();
  });
  it('ao clicar no botão deletar, a despesa é apagada', async () => {
    const initialState = {
      wallet: {
        currencies: Object.keys(mockData),
        expenses: [expMock1, expMock2],
        editor: false,
        idToEdit: 0,
      },
    };
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });

    const deleteBtn = screen.getAllByTestId('delete-btn');

    expect(deleteBtn[0]).toBeInTheDocument();
    expect(deleteBtn[1]).toBeInTheDocument();

    userEvent.click(deleteBtn[1]);
    expect(deleteBtn[1]).not.toBeInTheDocument();
  });
});
