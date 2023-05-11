const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34787804-1aefa27f7d66275b11fe28ff3';

export const getSearchImage = async (search, page) => {
  return await fetch(
    `${BASE_URL}?key=${API_KEY}&q=${search}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`
  ).then(res => res.json());
};

