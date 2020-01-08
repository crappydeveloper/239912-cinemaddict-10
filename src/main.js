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
import PageController from './controllers/page.js';
import {generatePopups} from './mock/filmPopupInfo.js';
import {render, RenderPosition, remove} from './utils/render.js';

const TASK_COUNT = 13;
const cards = generatePopups(TASK_COUNT);
const cardsCopy = [...cards];

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, new UserRankComponent(), RenderPosition.BEFOREEND);
render(siteMainElement, new NavigationComponent(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortComponent(), RenderPosition.BEFOREEND);
const siteFilmsBlockElement = render(siteMainElement, new FilmsSectionComponent(), RenderPosition.BEFOREEND);

const siteFilmsListBlockElement = siteFilmsBlockElement.querySelector(`.films-list`);

/*
const renderCard = (count = 1) => {
  let i = 0;
  const getRenderedCards = () => siteFilmsListBlockElement.querySelectorAll(`.film-card`);

  if (cards.length > 0) {
    const siteCardsBlockElement = siteFilmsListBlockElement.querySelector(`.films-list__container`);

    while (i < count) {
      const filmInfo = cards.pop();

      const removePopup = () => remove(filmPopupInfoComponent);

      const escKeyDownHandler = (evt) => {
        const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

        if (isEscKey) {
          removePopup();
          document.removeEventListener(`keydown`, escKeyDownHandler);
        }
      };

      const filmCardComponent = new FilmCardComponent(filmInfo);
      const filmPopupInfoComponent = new FilmPopupInfoComponent(filmInfo);

      filmCardComponent.setClickHandler(() => {
        render(siteMainElement, filmPopupInfoComponent, RenderPosition.BEFOREEND);
        document.addEventListener(`keydown`, escKeyDownHandler);
      });

      filmPopupInfoComponent.setButtonCloseClickHandler(removePopup);

      render(siteCardsBlockElement, filmCardComponent, RenderPosition.BEFOREEND);
      i++;
    }
  } else if (getRenderedCards().length === 0) {
    siteMainElement.replaceChild(new NoDataComponent(), siteFilmsBlockElement);
  }
};
renderCard(COUNT_TO_RENDER);
*/

const btnShowMoreHandler = render(siteFilmsListBlockElement, new BtnShowMoreComponent(), RenderPosition.BEFOREEND);
const topRatedBlock = render(siteFilmsBlockElement, new TopRatedComponent(), RenderPosition.BEFOREEND);
const mostCommentedBlock = render(siteFilmsBlockElement, new MostCommentedComponent(), RenderPosition.BEFOREEND);

const topRatedContainer = topRatedBlock.querySelector(`.films-list__container`);
const mostCommentedContainer = mostCommentedBlock.querySelector(`.films-list__container`);

/*
const clickBtnShowMoreHandler = () => {
  for (let i = 0; i < COUNT_TO_RENDER; i++) {
    renderCard();
  }

  if (cards.length === 0) {
    btnShowMoreHandler.remove();
  }
};

btnShowMoreHandler.addEventListener(`mousedown`, clickBtnShowMoreHandler);
*/

const compareByRating = (a, b) => b.rating - a.rating;
const compareByComments = (a, b) => b.comments.length - a.comments.length;

cardsCopy.sort(compareByRating);
const topRatedToRender = cardsCopy.slice(0, 2);
for (let i = 0; i < 2; i++) {
  render(topRatedContainer, new FilmCardComponent(topRatedToRender.pop()), RenderPosition.BEFOREEND);
}

cardsCopy.sort(compareByComments);
const mostCommentedToRender = cardsCopy.slice(0, 2);
for (let i = 0; i < 2; i++) {
  render(mostCommentedContainer, new FilmCardComponent(mostCommentedToRender.pop()), RenderPosition.BEFOREEND);
}
