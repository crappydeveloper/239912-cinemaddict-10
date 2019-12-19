import {createBtnShowMoreTemplate} from './components/btnShowMore.js';
import {createFilmCardTemplate} from './components/filmCard.js';
import {createFilmPopupInfoTemplate} from './components/filmPopupInfo.js';
import {createFilmsSectionTemplate} from './components/filmsSection.js';
import {createMostCommentedTemplate} from './components/mostCommented.js';
import {createNavigationTemplate} from './components/navigation.js';
import {createSortTemplate} from './components/sort.js';
import {createTopRatedTemplate} from './components/topRated.js';
import {createUserRankTemplate} from './components/userRank.js';
import {generateCards} from './mock/filmCard.js';
import {generatePopup} from './mock/filmPopupInfo.js';

const TASK_COUNT = 13;
const countToRender = 5;
const cards = generateCards(TASK_COUNT);
const cardsCopy = [...cards];
const popupInfo = generatePopup();

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

const renderCards = (count = 1) => {
  let cardsToRender = [];
  let i = 0;

  while (cards.length > 0 && i < count) {
    i++;
    cardsToRender.push(cards.pop());
  }

  render(siteCardsBlockElement, createFilmCardTemplate(cardsToRender), `beforeend`);
};
renderCards(countToRender);

render(siteFilmsListBlockElement, createBtnShowMoreTemplate(), `beforeend`);
render(siteFilmsBlockElement, createTopRatedTemplate(), `beforeend`);
render(siteFilmsBlockElement, createMostCommentedTemplate(), `beforeend`);
render(siteMainElement, createFilmPopupInfoTemplate(popupInfo), `beforeend`);

const btnShowMoreHandler = document.querySelector(`.films-list__show-more`);
const topRatedBlock = document.querySelector(`.films-list--extra:nth-of-type(2) .films-list__container`);
const mostCommentedBlock = document.querySelector(`.films-list--extra:nth-of-type(3) .films-list__container`);

const clickBtnShowMoreHandler = () => {
  for (let i = 0; i < countToRender; i++) {
    renderCards();
  }

  if (cards.length === 0) {
    btnShowMoreHandler.remove();
  }
};

btnShowMoreHandler.addEventListener(`mousedown`, clickBtnShowMoreHandler);

const compareByComments = (a, b) => {
  let commentsInA = a.numberOfComments;
  let commentsInB = b.numberOfComments;

  if (commentsInA > commentsInB) {
    return -1;
  }
  if (commentsInA < commentsInB) {
    return 1;
  }
  return 0;
};

const compareByRating = (a, b) => {
  let ratingOfA = a.rating;
  let ratingOfB = b.rating;

  if (ratingOfA > ratingOfB) {
    return -1;
  }
  if (ratingOfA < ratingOfB) {
    return 1;
  }
  return 0;
};

cardsCopy.sort(compareByRating);
const topRatedToRender = cardsCopy.slice(0, 2);
render(topRatedBlock, createFilmCardTemplate(topRatedToRender), `beforeend`);

cardsCopy.sort(compareByComments);
const mostCommentedToRender = cardsCopy.slice(0, 2);
render(mostCommentedBlock, createFilmCardTemplate(mostCommentedToRender), `beforeend`);
