import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const exchange = 'BRL';
    const { email, expenses } = this.props;
    const sumTotal = expenses
      .reduce((acc, curr) => (
        acc + (curr.value * curr.exchangeRates[curr.currency].ask)
      ), 0);

    return (
      <header>
        <section>
          <h5 data-testid="email-field">{ `Email: ${email}` }</h5>
          <h5 data-testid="total-field">{ `Despesa Total: ${sumTotal.toFixed(2)}` }</h5>
          <h5 data-testid="header-currency-field">{ `${exchange}` }</h5>
        </section>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.user,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps)(Header);
