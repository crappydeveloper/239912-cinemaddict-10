import BtnShowMoreComponent from './components/btnShowMore.js';
import FilmCardComponent from './components/filmCard.js';
import FilmPopupInfoComponent from './components/filmPopupInfo.js';
import FilmsSectionComponent from './components/filmsSection.js';
import MostCommentedComponent from './components/mostCommented.js';
import NavigationComponent from './components/navigation.js';
import SortComponent from './components/sort.js';
import TopRatedComponent from './components/topRated.js';
import UserRankComponent from './components/userRank.js';
import {generatePopups} from './mock/filmPopupInfo.js';
import {render, RenderPosition} from './utils.js';

const TASK_COUNT = 13;
const countToRender = 5;
const cards = generatePopups(TASK_COUNT);
const cardsCopy = [...cards];

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, new UserRankComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new NavigationComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilmsSectionComponent().getElement(), RenderPosition.BEFOREEND);

const siteFilmsBlockElement = document.querySelector(`.films`);
const siteCardsBlockElement = siteFilmsBlockElement.querySelector(`.films-list__container`);
const siteFilmsListBlockElement = siteFilmsBlockElement.querySelector(`.films-list`);

const renderCard = (count = 1) => {
  let i = 0;

  while (cards.length > 0 && i < count) {
    const filmInfo = cards.pop();

    const filmCardComponent = new FilmCardComponent(filmInfo);
    const filmPopupInfoComponent = new FilmPopupInfoComponent(filmInfo);

    const poster = filmCardComponent.getElement().querySelector(`.film-card__poster`);
    const title = filmCardComponent.getElement().querySelector(`.film-card__title`);
    const comments = filmCardComponent.getElement().querySelector(`.film-card__comments`);
    [poster, title, comments].forEach((it) => {
      it.addEventListener(`click`, () => {
        render(siteMainElement, filmPopupInfoComponent.getElement(), RenderPosition.BEFOREEND);
      });
    });

    const popupButtonClose = filmPopupInfoComponent.getElement().querySelector(`.film-details__close-btn`);
    popupButtonClose.addEventListener(`click`, () => {
      filmPopupInfoComponent.getElement().remove();
    });

    render(siteCardsBlockElement, filmCardComponent.getElement(), RenderPosition.BEFOREEND);
    i++;
  }
};

renderCard(countToRender);

render(siteFilmsListBlockElement, new BtnShowMoreComponent().getElement(), RenderPosition.BEFOREEND);
render(siteFilmsBlockElement, new TopRatedComponent().getElement(), RenderPosition.BEFOREEND);
render(siteFilmsBlockElement, new MostCommentedComponent().getElement(), RenderPosition.BEFOREEND);

const btnShowMoreHandler = document.querySelector(`.films-list__show-more`);
const topRatedBlock = document.querySelector(`.films-list--extra:nth-of-type(2) .films-list__container`);
const mostCommentedBlock = document.querySelector(`.films-list--extra:nth-of-type(3) .films-list__container`);

const clickBtnShowMoreHandler = () => {
  for (let i = 0; i < countToRender; i++) {
    renderCard();
  }

  if (cards.length === 0) {
    btnShowMoreHandler.remove();
  }
};

btnShowMoreHandler.addEventListener(`mousedown`, clickBtnShowMoreHandler);

const compareByComments = (a, b) => {
  let commentsInA = a.comments.length;
  let commentsInB = b.comments.length;

  return commentsInB - commentsInA;
};

const compareByRating = (a, b) => {
  let ratingOfA = a.rating;
  let ratingOfB = b.rating;

  return ratingOfB - ratingOfA;
};

cardsCopy.sort(compareByRating);
const topRatedToRender = cardsCopy.slice(0, 2);
for (let i = 0; i < 2; i++) {
  render(topRatedBlock, new FilmCardComponent(topRatedToRender.pop()).getElement(), RenderPosition.BEFOREEND);
}

cardsCopy.sort(compareByComments);
const mostCommentedToRender = cardsCopy.slice(0, 2);
for (let i = 0; i < 2; i++) {
  render(mostCommentedBlock, new FilmCardComponent(mostCommentedToRender.pop()).getElement(), RenderPosition.BEFOREEND);
}
