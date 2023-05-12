import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import css from './App.module.css'

export default class App extends Component {
  state = {
    searchImage: ''
  };

  handleSearch = searchImage => {
    this.setState({ searchImage });
  };
  render() {
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery searchImage={this.state.searchImage} />
        {/* <ImageGalleryItem/>
      <Loader />
      <Button/>
      <Modal/> */}
      </div>
    );
  }
}
