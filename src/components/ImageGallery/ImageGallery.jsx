import React, { Component } from 'react';
import { getSearchImage } from 'components/Api/getSearchImage';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { BallTriangle } from 'react-loader-spinner';
import css from './ImageGallery.module.css';
import Alert from '@mui/material/Alert';

export default class ImageGallery extends Component {
  state = {
    hits: [],
    totalHits: null,
    loading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {''
    const prevPage = prevProps.page;
    const nextPage = this.props.page;
    const prevImage = prevProps.searchImage;
    const nextImage = this.props.searchImage.trim();
    if (prevImage !== nextImage && nextImage ) {
      this.setState({ loading: true, hits: [], error: null });
      getSearchImage(nextImage, nextPage)
        .then(data => {
          if (data.hits && data.totalHits)
            return this.setState({
              hits: data.hits,
              totalHits: data.totalHits,
            });
          return Promise.reject(new Error ("Nothing found for your request"));
        })
        .catch(error => {
          this.setState({ error });
        })
        .finally(() => this.setState({ loading: false }));
    }
    if (prevPage !== nextPage) {
      this.setState({ loading: true });
      getSearchImage(nextImage, nextPage)
        .then(data => {
            return this.setState({
              hits: data.hits,
            });
        }).finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    const { hits, loading, error, totalHits } = this.state;
    return (
      <>
        {loading && <BallTriangle color="#4b5cdd"/>}
        {error && <Alert severity="error">{error.message}</Alert>}
        {hits && (
          <ul className={css.imageGallery}>
            {hits.map(hit => (
              <ImageGalleryItem hit={hit} />
            ))}
          </ul>
        )}
        
      </>
    );
  }
}
