import axios from 'axios';
import Notiflix from 'notiflix';
import LoadMoreBtn from './load-more-btn';

const loadMoreBtn = new LoadMoreBtn({ selector: '.load-more', hidden: true });
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
    const url = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&${PARAM}&page=${this.page}`;

    return fetch(url)
      .then(response => response.json())
      .then(({ hits, totalHits }) => {
        if (totalHits < this.page * 40) {
          loadMoreBtn.hide();
          Notiflix.Notify.info(
            "We're sorry, but you've reached the end of search results."
          );
        }
        // console.log(totalHits);
        // console.log(this.page);
        this.incrementPage();
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
