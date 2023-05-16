import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';
import { getSearchImage } from 'components/Api/getSearchImage';
import Button from './Button/Button';
import css from './App.module.css';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import { BallTriangle } from 'react-loader-spinner';
import Alert from '@mui/material/Alert';

export default class App extends Component {
  state = {
    searchImage: '',
    hits: null,
    totalHits: null,
    loading: false,
    error: '',
    initialPage: 1,
    page: 1,
  };

  handleSearch = ({ searchImage }) => {
    this.setState({ searchImage });
  };

  handleLoadMore = ({ page }) => {
    this.setState({ page });
  };

  hideButton = () => {
    const page = this.state.page;
    const totalHits = this.state.totalHits;
    const finalPage = Math.ceil(Number(totalHits / 12));
    if (page === finalPage || Number(totalHits) < 13) {
      return 'none';
    }
    return 'block';
  };

  componentDidUpdate(prevProps, prevState) {
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    const prevImage = prevState.searchImage;
    const nextImage = this.state.searchImage.trim();
    const initialPage = this.state.initialPage;

    if (prevImage !== nextImage && nextImage) {
      this.setState({ loading: true, hits: [], error: null });
      getSearchImage(nextImage, initialPage)
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
        .finally(() => this.setState({ loading: false, page: 1 }));
    }

    if (nextPage !== initialPage && nextPage !== prevPage) {
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

  render() {
    const { page, hits, loading, error } = this.state;
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleSearch} />
        {loading && <BallTriangle color="#4b5cdd" />}
        {error && <Alert severity="error">Oops, something goes wrong</Alert>}
        {hits && hits.length === 0 && (
          <Alert severity="warning">Nothing found for your request</Alert>
        )}
        {hits && hits.length > 0 && <ImageGallery hits={hits} />}
        <Button
          onClick={this.handleLoadMore}
          page={page}
          hideButton={this.hideButton}
        />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

App.propTypes = {
  searchImage: PropTypes.string,
  totalHits: PropTypes.number,
  loading: PropTypes.bool,
  error: PropTypes.string,
  hits: PropTypes.arrayOf(PropTypes.object),
  page: PropTypes.number,
};
