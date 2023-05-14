import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';
import css from './App.module.css';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';


export default class App extends Component {
  state = {
    searchImage: '',
  };

  handleSearch = ({ searchImage }) => {
    this.setState({ searchImage });
  };

  render() {
    const { searchImage, page } = this.state;
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery searchImage={searchImage} page={page} />
        <ToastContainer autoClose={3000}/>
      </div>
    );
  }
};

App.propTypes = {
  searchImage: PropTypes.string
}
