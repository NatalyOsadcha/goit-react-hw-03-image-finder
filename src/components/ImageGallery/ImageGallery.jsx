import React, { Component } from 'react';
import { getSearchImage } from 'components/Api/getSearchImage';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { BallTriangle } from 'react-loader-spinner';
import Button from '../Button/Button';
import css from './ImageGallery.module.css';
import Alert from '@mui/material/Alert';
import PropTypes from 'prop-types';

export default class ImageGallery extends Component {
  state = {
    hits: null,
    totalHits: null,
    loading: false,
    error: '',
    page: 1,
  };

  handleLoadMore = ({ page }) => {
    this.setState({ page });
  };

  componentDidUpdate(prevProps, prevState) {
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    const prevImage = prevProps.searchImage;
    const nextImage = this.props.searchImage.trim();

    if (prevImage !== nextImage && nextImage) {
      this.setState({ loading: true, hits: [], error: null });
      getSearchImage(nextImage, nextPage)
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

    if (nextPage !== prevPage) {
      this.setState({ loading: true });
      getSearchImage(nextImage, nextPage)
        .then(data => {
          this.setState(prevState => ({
            hits: [...prevState.hits, ...data.hits],
          }));
        })
        .finally(() => this.setState({ loading: false }));
    }
  }

  hideButton = () => {
    const page = this.state.page;
    const totalHits = this.state.totalHits;
    const finalPage = Math.ceil(Number(this.state.totalHits / 12));
    if (page === finalPage || totalHits < 13) {
      return 'none';
    }
    return 'block';
  };

  render() {
    // const nextImage = this.props.searchImage.trim();
    const { hits, loading, error, page } = this.state;
    return (
      <>
        {loading && <BallTriangle color="#4b5cdd" />}
        {error && (<Alert severity="error">Oops, something goes wrong</Alert>)}
        {/* {nextImage === '' && (<Alert severity="warning">Enter something for searching images</Alert>)} */}
        {hits && hits.length > 0 && (
          <ul className={css.imageGallery}>
            {hits.map(hit => (
              <ImageGalleryItem hit={hit} />
            ))}
          </ul>
        )}
        {hits && hits.length === 0 && (<Alert severity="warning">Nothing found for your request</Alert>)}
        {
          <Button
            onClick={this.handleLoadMore}
            page={page}
            hideButton={this.hideButton}
          />
        }
      </>
    );
  }
}

ImageGallery.propTypes = {
  totalHits: PropTypes.number,
  loading: PropTypes.bool,
  error: PropTypes.string,
  hits: PropTypes.arrayOf(PropTypes.object),
  page: PropTypes.number,
};
