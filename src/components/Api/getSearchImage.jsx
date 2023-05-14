import PropTypes from 'prop-types';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34787804-1aefa27f7d66275b11fe28ff3';

export const getSearchImage = (search, page) => {
  return fetch(
    `${BASE_URL}?key=${API_KEY}&q=${search}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`
  ).then(res => res.json());
};

getSearchImage.propTypes = {
  search: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired
}
