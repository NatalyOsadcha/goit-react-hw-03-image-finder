import React, { Component } from 'react';
// import { getSearchImage } from 'components/Api/getSearchImage';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34787804-1aefa27f7d66275b11fe28ff3';

export default class ImageInfo extends Component {
  state = {
    images: [],
    page: 1
  };

componentDidUpdate(prevProps, prevState) {
    const prevImage = prevProps.searchImage
    const nextImage = this.props.searchImage
      if (prevImage !== nextImage && nextImage)
      {
        console.log(prevImage)
        console.log(nextImage)
fetch(
    `${BASE_URL}?key=${API_KEY}&q=${nextImage}&image_type=photo&orientation=horizontal&page=${this.state.page}&per_page=12`
  );

        // const images = await getSearchImage();
        // images.then((images) => this.setState(images));
        // console.log(this.setState);
        // .then(res => res.json())
    }
  };

  render() {
      return
//         const { hits } = this.state;
//         return <ul className="gallery">
//           {hits.map(el => <li key={hits.id} className="gallery-item">
//             <img src={hits.webformatURL} alt={hits.tags} />
// </li>)}
// </ul>;
  }
}



