import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import css from './App.module.css';

export default class App extends Component {
  state = {
    searchImage: '',
  };

  handleSearch = ({ searchImage}) => {
    this.setState({ searchImage });
  };

  render() {
    const { searchImage } = this.state;
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery searchImage={searchImage} />
        <Button />
      </div>
    );
  }
}
