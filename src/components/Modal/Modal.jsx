import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = e => {
    if (e.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  handleOverlay = e => {
    if (e.currentTarget === e.target) {
      this.props.toggleModal();
    }
  };
  render() {
    const { largeImageURL, tags } = this.props;
    return createPortal(
      <div className={css.overlay} onClick={this.handleOverlay}>
        <div className={css.modal}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>,
      modalRoot
    );
  }
};

Modal.propTypes = {
  largeImageURL: PropTypes.string,
  tags: PropTypes.string
}

