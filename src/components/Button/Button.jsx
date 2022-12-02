import css from './Button.module.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Button extends Component {
  clickHandler = e => {
    e.preventDefault();
    this.props.onClick(1);
  };
  render() {
    return (
      <button type="button" className={css.button} onClick={this.clickHandler}>
        Load more
      </button>
    );
  }
}

Button.propTypes = {
  clickHandler: PropTypes.func,
};
