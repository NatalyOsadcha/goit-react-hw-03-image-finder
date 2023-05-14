import React, { Component } from 'react';
import css from './Button.module.css';

export default class Button extends Component {
  handlePage = () => {
    let page = this.props.page;
    page += 1;
    this.props.onClick({ page });
  };
  render() {
    return (
      <button
        type="button"
        className={css.buttonLoadMore}
        onClick={this.handlePage}
      >
        Load more
      </button>
    );
  }
}
