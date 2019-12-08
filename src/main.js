import {createBtnShowMoreTemplate} from '../src/components/btnShowMore.js';
import {createFilmCardTemplate} from '../src/components/filmCard.js';
import {createFilmPopupInfoTemplate} from '../src/components/filmPopupInfo.js';
import {createFilmsSectionTemplate} from '../src/components/filmsSection.js';
import {createMostCommentedTemplate} from '../src/components/mostCommented.js';
import {createNavigationTemplate} from '../src/components/navigation.js';
import {createSortTemplate} from '../src/components/sort.js';
import {createTopRatedTemplate} from '../src/components/topRated.js';
import {createUserRankTemplate} from '../src/components/userRank.js';

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
