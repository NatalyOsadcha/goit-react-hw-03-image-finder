import React, { Component } from 'react';
import { getSearchImage } from 'components/Api/getSearchImage';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { BallTriangle } from 'react-loader-spinner';
import css from './ImageGallery.module.css';

export default class ImageGallery extends Component {
  state = {
    hits: [],
    totalHits: null,
    page: 1,
    loading: false,
    error: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const prevImage = prevProps.searchImage;
    const nextImage = this.props.searchImage.trim();
    if (prevImage !== nextImage && nextImage) {
      this.setState({ loading: true });
      getSearchImage(nextImage, page)
        .then(data => {
          if (data.hits && data.totalHits)
            return this.setState({
              hits: data.hits,
              totalHits: data.totalHits,
            });
          return Promise.reject(data.message);
        })
        .catch(error => {
          this.setState({ error });
        })
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    const { hits, loading, error } = this.state;
    return (
      <>
        {loading && <BallTriangle className={css.ballTriangle} />}
        {error && <p>Server cannot process the request, repeat this request with modification. </p>}
        {!this.props.searchImage && <p>Enter something for searching images</p>}
        {hits.length>0 && (
          <ul className={css.imageGallery}>
            {hits.map(hit => (
              <ImageGalleryItem hit={hit} />
            ))}
          </ul>
        )}
        {!hits.length && <p>Nothing found for your request</p>}
      </>
    );
  }
}
