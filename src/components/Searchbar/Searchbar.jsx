import React, { Component } from 'react';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  render() {
    return (
      <header class={css.searchbar}>
        <form class={css.form}>
          <button type="submit" class={css.button}>
            <span class={css.buttonLabel}>Search</span>
          </button>

          <input
            class={css.input}
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
