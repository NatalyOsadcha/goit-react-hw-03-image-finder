import React, {Component} from 'react'
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery'
// import Api from './Api/Api';

export default class App extends Component {
  state = {
    searchImage: '',
    page: 1,
  }

  handleSearch = (image) => {
    this.setState({ searchImage: image })
  }

  render() {
 return (
    <div>
     <Searchbar handleSearch={this.handleSearch} />
     <ImageGallery searchImage={this.state.searchImage}/>
      {/* <ImageGalleryItem/>
      <Loader />
      <Button/>
      <Modal/> */} 
    </div>
  )
  }
}
