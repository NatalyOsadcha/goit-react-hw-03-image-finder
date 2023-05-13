import React from 'react';
import css from './Button.module.css';

export default function Button() {
  return (
    <button type="button" className={css.buttonLoadMore}>
      Load more
    </button>
  );
}
