import React from 'react';
import css from './ImageGalleryItem.module.css'

export default function ImageGalleryItem({ id, webformatURL, tags }) {
  return (
      <li key={id} className={css.imageGalleryItemImage}>
      <img src={webformatURL} alt={tags} />
    </li>
  );
}
