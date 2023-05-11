import React, { Component } from 'react';

export default class Searchbar extends Component {
  state = {};

    handleSubmit = evt => {
        evt.preventDefault();
        const form = evt.currentTarget;
        const search = form.elements.search.value;
        console.log(search);
        this.props.handleSearch({ search });
        // form.reset();
    };

  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
                    placeholder="Search images and photos"
                    name="search"
          />
        </form>
      </header>
    );
  }
}
