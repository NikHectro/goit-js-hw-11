import Notiflix from 'notiflix';
// import '.css/common.css'
import ImgsApiService from './img-api';
import imgTemplate from './makeMarkup';
import LoadMoreBtn from './load-more-btn';

const refs = {
  searchForm: document.querySelector('#search-form'),
  imgContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const imgsApiService = new ImgsApiService('.load-more');
// const loadMoreBtn = new LoadMoreBtn();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(evt) {
  evt.preventDefault();
  clearHitsMarkup();
  // console.log(evt.target.value);
  imgsApiService.query = evt.currentTarget.elements.searchQuery.value;
  if (imgsApiService.query === '') {
    return alert('Нічого не введено в поле пошуку');
  }
  imgsApiService.resetPage();
  imgsApiService.fetchImg().then(appendHitsMarkup);
}

function onLoadMore() {
  imgsApiService.fetchImg().then(appendHitsMarkup);
}

function appendHitsMarkup(hits) {
  refs.imgContainer.insertAdjacentHTML('beforeend', imgTemplate(hits));
}

function clearHitsMarkup() {
  refs.imgContainer.innerHTML = '';
}
// const url = 'https://pixabay.com/api/';
// const apiKey = '?key=29344544-28f8077a689a3611398a04467';

//

// function fetchImg(request) {
//     console.log(`${url}${apiKey}&q=${request}`);
// }
// // fetchImg('cat');
