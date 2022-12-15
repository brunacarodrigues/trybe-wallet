import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';
import App from '../../App';

// const EMAIL_TEST = 'teste@trybe.com.br';
// const PASS_TEST = '0123456789';

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
  // it('ao clicar no botão de login, redireciona para outra página', () => {
  //   const { history } = renderWithRouterAndRedux(<App />);
  //   const loginBtn = screen.getByRole('button');

  //   expect(loginBtn).toBeEnabled();
  //   userEvent.click(loginBtn);

  //   const { pathname } = history.location;
  //   expect(pathname).toBe('/carteira');
  // });
});
