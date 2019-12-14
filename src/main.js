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
