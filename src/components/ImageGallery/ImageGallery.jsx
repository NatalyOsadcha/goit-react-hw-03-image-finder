import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export default class ImageGallery extends Component {

  render() {
    const {hits} = this.props;
    return (
      <>
          <ul className={css.imageGallery}>
            {hits.map(hit => (
              <ImageGalleryItem hit={hit} />
            ))}
          </ul>
      </>
    );
  }
}

ImageGallery.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.object),
};
