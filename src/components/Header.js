import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const exchange = 'BRL';
    return (
      <header>
        <section>
          <h5 data-testid="email-field">{ `Email: ${email}` }</h5>
          <h5 data-testid="total-field">{ `Despesa Total: ${expenses.toFixed(2)}` }</h5>
          <h5 data-testid="header-currency-field">{ `${exchange}` }</h5>
        </section>
      </header>
    );
  }
}

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
  wallet: globalState.wallet,
  expenses: globalState.wallet.expenses.reduce((acc, curr) => acc
  + (+curr.value * curr.exchangeRates[curr.currency].ask), 0),
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
