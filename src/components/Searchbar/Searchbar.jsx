import React, { Component } from 'react';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  takeQuery = e => {
    e.preventDefault();
    const form = e.currentTarget.elements;
    const request = form.request.value;
    this.props.onSubmit(request);
    e.currentTarget.reset();
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.takeQuery}>
          <button type="submit" className={css.button}>
            <span className={css.buttonText}>Search</span>
          </button>

          <input
            className={css.input}
            name="request"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
