import {createBtnShowMoreTemplate} from './components/btnShowMore.js';
import {createFilmCardTemplate} from './components/filmCard.js';
import {createFilmPopupInfoTemplate} from './components/filmPopupInfo.js';
import {createFilmsSectionTemplate} from './components/filmsSection.js';
import {createMostCommentedTemplate} from './components/mostCommented.js';
import {createNavigationTemplate} from './components/navigation.js';
import {createSortTemplate} from './components/sort.js';
import {createTopRatedTemplate} from './components/topRated.js';
import {createUserRankTemplate} from './components/userRank.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, createUserRankTemplate(), `beforeend`);
render(siteMainElement, createNavigationTemplate(), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createFilmsSectionTemplate(), `beforeend`);

const siteFilmsBlockElement = document.querySelector(`.films`);
const siteFilmsListBlockElement = siteFilmsBlockElement.querySelector(`.films-list`);
const siteCardsBlockElement = siteFilmsBlockElement.querySelector(`.films-list__container`);

for (let i = 0; i < 5; i++) {
  render(siteCardsBlockElement, createFilmCardTemplate(), `beforeend`);
}

render(siteFilmsListBlockElement, createBtnShowMoreTemplate(), `beforeend`);
render(siteFilmsBlockElement, createTopRatedTemplate(), `beforeend`);
render(siteFilmsBlockElement, createMostCommentedTemplate(), `beforeend`);
render(siteMainElement, createFilmPopupInfoTemplate(), `beforeend`);


const cardsInFilmsList = document.querySelectorAll(`.films-list .film-card`);
const cardsInFilmsListArr = [...cardsInFilmsList];
const topRatedBlock = document.querySelector(`.films-list--extra:nth-of-type(2) .films-list__container`);
const mostCommentedBlock = document.querySelector(`.films-list--extra:nth-of-type(3) .films-list__container`);

const compareByComments = (a, b) => {
  let commentsInA = a.querySelector(`.film-card__comments`).innerText.slice(0, -9);
  let commentsInB = b.querySelector(`.film-card__comments`).innerText.slice(0, -9);

  if (+commentsInA > +commentsInB) {
    return -1;
  }
  if (+commentsInA < +commentsInB) {
    return 1;
  }
  return 0;
};

const compareByRating = (a, b) => {
  let ratingOfA = a.querySelector(`.film-card__rating`).innerText;
  let ratingOfB = b.querySelector(`.film-card__rating`).innerText;

  if (+ratingOfA > +ratingOfB) {
    return -1;
  }
  if (+ratingOfA < +ratingOfB) {
    return 1;
  }

  return 0;
};

cardsInFilmsListArr.sort(compareByRating);
for (let i = 0; i < 2; i++) {
  topRatedBlock.insertAdjacentElement(`beforeend`, cardsInFilmsListArr[i].cloneNode(true));
}

cardsInFilmsListArr.sort(compareByComments);
for (let i = 0; i < 2; i++) {
  mostCommentedBlock.insertAdjacentElement(`beforeend`, cardsInFilmsListArr[i].cloneNode(true));
}
