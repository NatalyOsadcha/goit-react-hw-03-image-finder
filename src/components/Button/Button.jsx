import React, { Component } from 'react';
import css from './Button.module.css';
import PropTypes from 'prop-types';

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
        style={{ display: this.props.hideButton() }}
      >
        Load more
      </button>
    );
  }
}

Button.propTypes = {
  page: PropTypes.number.isRequired,
};
