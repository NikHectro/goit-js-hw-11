import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// import '.css/common.css'
import { ImgsApiService } from './img-api';
import imgTemplate from './makeMarkup';
import LoadMoreBtn from './load-more-btn';

const refs = {
  searchForm: document.querySelector('#search-form'),
  imgContainer: document.querySelector('.gallery'),
  //   loadMoreBtn: document.querySelector('.load-more'),
};
const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  showCounter: false,
  captionsData: 'alt',
});

const imgsApiService = new ImgsApiService('.load-more');
const loadMoreBtn = new LoadMoreBtn({ selector: '.load-more', hidden: true });

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);
// refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(evt) {
  evt.preventDefault();
  clearHitsMarkup();
  //   console.log(evt.target.value);
  imgsApiService.query = evt.currentTarget.elements.searchQuery.value;
  if (imgsApiService.query === '') {
    return Notiflix.Notify.failure('Нічого не введено в поле пошуку');
  }
  loadMoreBtn.show();
  imgsApiService.resetPage();
  //   imgsApiService.fetchImg().then(appendHitsMarkup);
  fetchHits();
}

function onLoadMore() {
  fetchHits(); // можна вставити фетч на мысце ф-ції onLoadMore
  //   console.log(this);
  //   imgsApiService.fetchImg().then(appendHitsMarkup);
}

function fetchHits() {
  loadMoreBtn.disable();
  imgsApiService.fetchImg().then(hits => {
    appendHitsMarkup(hits);
    loadMoreBtn.enable();
    lightbox.refresh();
  });
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
