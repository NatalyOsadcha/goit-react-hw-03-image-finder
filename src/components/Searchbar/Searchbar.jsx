import React, { Component } from 'react';
import css from './Searchbar.module.css';
import {ReactComponent as GlassIcon} from '../../icons/glass.svg'

export default class Searchbar extends Component {
  handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const searchImage = form.elements.searchImage.value.toLowerCase();
    this.props.onSubmit({ searchImage });
    form.reset();
  };
  
  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchbarForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.searchFormButton}>
           <GlassIcon width={18} height={18}/>
          </button>

          <input
            className={css.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="searchImage"
          />
        </form>
      </header>
    );
  }
}