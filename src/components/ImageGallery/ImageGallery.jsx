import React, { Component } from 'react';
import { getSearchImage } from 'components/Api/getSearchImage';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css'

export default class ImageGallery extends Component {
  state = {
    hits: [],
    totalHits: null,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const prevImage = prevProps.searchImage.searchImage;
    const nextImage = this.props.searchImage.searchImage.trim();
    if (prevImage !== nextImage && nextImage) {
      getSearchImage(nextImage, page).then(({ hits, totalHits }) => {
        this.setState({ hits, totalHits });
      });
    }
  }

  render() {
    const { hits } = this.state;
    return (
      <ul className={css.imageGallery}>{hits.map(hit => ImageGalleryItem(hit))}</ul>
    );
  }
}
