import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const EMAIL_TEST = 'teste@trybe.com.br';
const PASS_TEST = '0123456789';

describe('Renderize a página de Login e testa...', () => {
  it('O input email e senha são renderizados na tela', () => {
    renderWithRouterAndRedux(<App />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });
  it('é renderizado na tela um botão com o texto Entrar', () => {
    renderWithRouterAndRedux(<App />);
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });
  it('o botão está inicialmente desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const loginBtn = screen.getByRole('button');
    expect(loginBtn).toBeDisabled();
  });
  it('o botão tem data-testid com valor "button-login".', () => {
    renderWithRouterAndRedux(<App />);
    const idButton = screen.getByTestId('button-login');
    expect(idButton).toBeInTheDocument();
  });
  it('o input login tem data-testid com valor "email-input".', () => {
    renderWithRouterAndRedux(<App />);
    const idEmail = screen.getByTestId('email-input');
    expect(idEmail).toBeInTheDocument();
  });
  it('o input senha tem data-testid com valor "password-input".', () => {
    renderWithRouterAndRedux(<App />);
    const idSenha = screen.getByTestId('password-input');
    expect(idSenha).toBeInTheDocument();
  });
  it('ao preencher os inputs, o botão é habilitado', () => {
    renderWithRouterAndRedux(<App />);
    const emailCorrect = EMAIL_TEST;
    const passCorrect = PASS_TEST;
    const emailInput = screen.getByRole('textbox');
    const passInput = screen.getByPlaceholderText(/password/i);
    const enterButton = screen.getByRole('button');
    userEvent.type(emailInput, emailCorrect);
    userEvent.type(passInput, passCorrect);
    expect(enterButton).toBeEnabled();
  });
  it('se o email digitado é válido', () => {
    renderWithRouterAndRedux(<App />);
    userEvent.type(screen.getByRole('textbox'), EMAIL_TEST);
    expect(screen.getByRole('button', { name: /entrar/i }).disabled).toBe(true);
  });
});
