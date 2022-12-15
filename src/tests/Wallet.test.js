import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const EMAIL_TEST = 'teste@trybe.com.br';
const PASS_TEST = '0123456789';

describe('Renderiza a tela do cadastro de usuário e testa...', () => {
  it('é redirecionado para a página Wallet', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const enterButton = screen.getByRole('button');
    userEvent.type(emailInput, EMAIL_TEST);
    userEvent.type(passwordInput, PASS_TEST);
    userEvent.click(enterButton);
    const loginEmail = screen.getByText(/teste@trybe\.com\.br/i);
    const sumExpenses = screen.getByText(/0\.00/i);
    const actualCurrency = screen.getByText(/brl/i);
    const valueInput = screen.getByTestId('value-input');
    const descInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    expect(loginEmail).toBeInTheDocument();
    expect(sumExpenses).toBeInTheDocument();
    expect(actualCurrency).toBeInTheDocument();
    expect(valueInput).toBeInTheDocument();
    expect(descInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
  });
  it('é possível adicionar e remover despesas', async () => {
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<App />, { initialEntries });

    const valueInput = screen.getByTestId('value-input');
    const descInput = screen.getByTestId('description-input');
    const currencyInput = await screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const cashOption = screen.getByRole('option', { name: 'Dinheiro' });
    const eatOption = screen.getByRole('option', { name: 'Trabalho' });
    const USDOption = await screen.findByRole('option', { name: 'USD' });
    const addExpenses = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.type(valueInput, '15');
    userEvent.type(descInput, 'Quinze dólares');
    userEvent.selectOptions(currencyInput, USDOption);
    userEvent.selectOptions(methodInput, cashOption);
    userEvent.selectOptions(tagInput, eatOption);
    userEvent.click(addExpenses);
  });
});
