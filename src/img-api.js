import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '25712416-b7f8b21cfce49117d938a95c8';
const PARAM =
  'per_page=40&orientation=horizontal&image_type=photo&safesearch=true';

class ImgsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImg() {
    // console.log(this);
    const url = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&${PARAM}&page=${this.page}`;

    return fetch(url)
      .then(response => response.json())
      .then(({ hits }) => {
        this.incrementPage();
        // console.log(data);
        return hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

export { ImgsApiService };
