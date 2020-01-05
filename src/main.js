import BtnShowMoreComponent from './components/btnShowMore.js';
import FilmCardComponent from './components/filmCard.js';
import FilmPopupInfoComponent from './components/filmPopupInfo.js';
import FilmsSectionComponent from './components/filmsSection.js';
import MostCommentedComponent from './components/mostCommented.js';
import NavigationComponent from './components/navigation.js';
import SortComponent from './components/sort.js';
import TopRatedComponent from './components/topRated.js';
import UserRankComponent from './components/userRank.js';
import NoDataComponent from './components/noData.js';
import {generatePopups} from './mock/filmPopupInfo.js';
import {render, RenderPosition} from './utils.js';

const TASK_COUNT = 13;
const COUNT_TO_RENDER = 5;
const cards = generatePopups(TASK_COUNT);
const cardsCopy = [...cards];

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, new UserRankComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new NavigationComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);
const siteFilmsBlockElement = render(siteMainElement, new FilmsSectionComponent().getElement(), RenderPosition.BEFOREEND);

const siteFilmsListBlockElement = siteFilmsBlockElement.querySelector(`.films-list`);

const renderCard = (count = 1) => {
  let i = 0;
  const getRenderedCards = () => siteFilmsListBlockElement.querySelectorAll(`.film-card`);

  if (cards.length > 0) {
    const siteCardsBlockElement = siteFilmsListBlockElement.querySelector(`.films-list__container`);

    while (i < count) {
      const filmInfo = cards.pop();

      const removePopup = () => siteMainElement.removeChild(filmPopupInfoComponent.getElement());


      const escKeyDownHandler = (evt) => {
        const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
        if (isEscKey) {
          removePopup();
          document.removeEventListener(`keydown`, escKeyDownHandler);
        }
      };

      const filmCardComponent = new FilmCardComponent(filmInfo);
      const filmPopupInfoComponent = new FilmPopupInfoComponent(filmInfo);

      const poster = filmCardComponent.getElement().querySelector(`.film-card__poster`);
      const title = filmCardComponent.getElement().querySelector(`.film-card__title`);
      const comments = filmCardComponent.getElement().querySelector(`.film-card__comments`);

      [poster, title, comments].forEach((it) => {
        it.addEventListener(`click`, () => {
          render(siteMainElement, filmPopupInfoComponent.getElement(), RenderPosition.BEFOREEND);
          document.addEventListener(`keydown`, escKeyDownHandler);
        });
      });

      const popupButtonClose = filmPopupInfoComponent.getElement().querySelector(`.film-details__close-btn`);

      popupButtonClose.addEventListener(`click`, () => {
        removePopup();
      });

      render(siteCardsBlockElement, filmCardComponent.getElement(), RenderPosition.BEFOREEND);
      i++;
    }
  } else if (getRenderedCards().length === 0) {
    siteMainElement.replaceChild(new NoDataComponent().getElement(), siteFilmsBlockElement);
  }
};
renderCard(COUNT_TO_RENDER);

const btnShowMoreHandler = render(siteFilmsListBlockElement, new BtnShowMoreComponent().getElement(), RenderPosition.BEFOREEND);
const topRatedBlock = render(siteFilmsBlockElement, new TopRatedComponent().getElement(), RenderPosition.BEFOREEND);
const mostCommentedBlock = render(siteFilmsBlockElement, new MostCommentedComponent().getElement(), RenderPosition.BEFOREEND);

const topRatedContainer = topRatedBlock.querySelector(`.films-list__container`);
const mostCommentedContainer = mostCommentedBlock.querySelector(`.films-list__container`);

const clickBtnShowMoreHandler = () => {
  for (let i = 0; i < COUNT_TO_RENDER; i++) {
    renderCard();
  }

  if (cards.length === 0) {
    btnShowMoreHandler.remove();
  }
};

btnShowMoreHandler.addEventListener(`mousedown`, clickBtnShowMoreHandler);

const compareByComments = (a, b) => b.comments.length - a.comments.length;

const compareByRating = (a, b) => b.rating - a.rating;

cardsCopy.sort(compareByRating);
const topRatedToRender = cardsCopy.slice(0, 2);
for (let i = 0; i < 2; i++) {
  render(topRatedContainer, new FilmCardComponent(topRatedToRender.pop()).getElement(), RenderPosition.BEFOREEND);
}

cardsCopy.sort(compareByComments);
const mostCommentedToRender = cardsCopy.slice(0, 2);
for (let i = 0; i < 2; i++) {
  render(mostCommentedContainer, new FilmCardComponent(mostCommentedToRender.pop()).getElement(), RenderPosition.BEFOREEND);
}
