export default class ImgsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImg() {
    // console.log(this);
    const url = `https://pixabay.com/api/?key=29344544-28f8077a689a3611398a04467&q=${this.searchQuery}&image_type=photo&per_page=5&page=${this.page}`;

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
