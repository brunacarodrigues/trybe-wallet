import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { walletAction, expenseAction, saveAction } from '../redux/actions';

class WalletForm extends Component {
  state = {
    currencies: [],
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    this.requestAPI();
  }

  clearExpenses = () => {
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  requestAPI = async () => {
    const { dispatch } = this.props;
    const coinsObj = await this.fetchAPI();
    const currenciesObj = Object.keys(coinsObj);

    dispatch(walletAction(currenciesObj));

    this.setState({
      currencies: currenciesObj,
    });
  };

  fetchAPI = async () => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const responseJson = await response.json();
    delete responseJson.USDT;
    return responseJson;
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleChangeButton = async () => {
    const { dispatch, expenses } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const exchangeRates = await this.fetchAPI();

    const expensesObj = {
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };

    dispatch(expenseAction(expensesObj));
    this.clearExpenses();
  };

  handleChangeEdit = (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    const objNew = this.state;
    delete objNew.currencies;
    dispatch(saveAction(objNew));
    this.clearExpenses();
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, edit, expenses } = this.props;
    console.log(expenses);
    return (
      <div>
        <form>
          <label htmlFor="value">
            <span>Valor da Despesa</span>
            <input
              type="number"
              id="value"
              name="value"
              value={ value }
              data-testid="value-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            <span>Descrição</span>
            <input
              type="text"
              id="description"
              name="description"
              value={ description }
              data-testid="description-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency">
            <span>Moeda</span>
            <select
              id="currency"
              name="currency"
              data-testid="currency-input"
              value={ currency }
              onChange={ this.handleChange }
            >
              { currencies.map((coin) => (
                <option key={ coin } value={ coin }>{ coin }</option>
              )) }
            </select>
          </label>
          <label htmlFor="method">
            <span>Método de Pagamento</span>
            <select
              id="method"
              name="method"
              value={ method }
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              <option defaultValue="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            <span>Tipo de Despesa</span>
            <select
              id="tag"
              name="tag"
              value={ tag }
              data-testid="tag-input"
              onChange={ this.handleChange }
            >
              <option defaultValue="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ edit ? this.handleChangeEdit : this.handleChangeButton }
          >
            { edit ? 'Editar despesa' : 'Adicionar despesa' }
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  currencies: globalState.wallet.currencies,
  expenses: globalState.wallet.expenses,
  edit: globalState.wallet.edit,
});

WalletForm.propTypes = ({
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.instanceOf(Array).isRequired,
  currencies: PropTypes.instanceOf(Array).isRequired,
  edit: PropTypes.bool.isRequired,
});

export default connect(mapStateToProps)(WalletForm);
