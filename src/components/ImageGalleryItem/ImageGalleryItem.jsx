import React, { Component } from 'react';
import Modal from '../Modal/Modal';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

export default class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };
  imgId = nanoid();

  toggleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  };

  render() {
    const { webformatURL, tags } = this.props.hit;
    return (
      <>
        <li key={this.imgId} className={css.imageGalleryItemImage}>
          <img src={webformatURL} alt={tags} onClick={this.toggleModal} />
        </li>
        {this.state.showModal && (
          <Modal
            toggleModal={this.toggleModal}
            largeImageURL={this.props.hit.largeImageURL}
            tags={this.props.hit.tags}
          />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
  index: PropTypes.number,
};
