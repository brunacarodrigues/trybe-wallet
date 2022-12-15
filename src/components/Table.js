import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((el) => (
              <tr key={ el.id }>
                <td>{ el.description }</td>
                <td>{ el.tag }</td>
                <td>{ el.method }</td>
                <td>{((+el.value)).toFixed(2)}</td>
                <td>{el.exchangeRates[el.currency].name}</td>
                <td>{((+el.exchangeRates[el.currency].ask)).toFixed(2)}</td>
                <td>{((+el.value) * (+el.exchangeRates[el.currency].ask)).toFixed(2)}</td>
                <td>Real</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  expenses: globalState.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(Table);
