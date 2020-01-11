import AllFilmsComponent from '../components/allFilms.js';
import FilmsListContainerComponent from '../components/filmsListContainer';
import NoDataComponent from '../components/noData.js';
import FilmCardComponent from '../components/filmCard.js';
import FilmPopupInfoComponent from '../components/filmPopupInfo.js';
import BtnShowMoreComponent from '../components/btnShowMore.js';
import TopRatedComponent from '../components/topRated';
import MostCommentedComponent from '../components/mostCommented';
import {render, RenderPosition, remove} from '../utils/render.js';

const SHOWING_CARDS_COUNT_ON_START = 5;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;

const renderCard = (cardListElement, card) => {
  const escKeyDownHandler = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      removePopup();
      document.removeEventListener(`keydown`, escKeyDownHandler);
    }
  };

  const removePopup = () => {
    remove(filmPopupInfoComponent);
  };

  const filmCardComponent = new FilmCardComponent(card);
  const filmPopupInfoComponent = new FilmPopupInfoComponent(card);

  filmCardComponent.setClickHandler(() => {
    render(cardListElement, filmPopupInfoComponent, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, escKeyDownHandler);
  });

  filmPopupInfoComponent.setButtonCloseClickHandler(removePopup);

  render(cardListElement, filmCardComponent, RenderPosition.BEFOREEND);
};

const renderCards = (cardListElement, cards) => {
  cards.forEach((card) => {
    renderCard(cardListElement, card);
  });
};

export default class PageController {
  constructor(container) {
    this._container = container;

    this._allFilmsComponent = new AllFilmsComponent();
    this._filmsListContainerComponent = new FilmsListContainerComponent();
    this._noDataComponent = new NoDataComponent();
    this._btnShowMoreComponent = new BtnShowMoreComponent();
    this._topRatedComponent = new TopRatedComponent();
    this._topRatedContainerComponent = new FilmsListContainerComponent();
    this._mostCommentedComponent = new MostCommentedComponent();
    this._mostCommentedContainerComponent = new FilmsListContainerComponent();
  }

  render(cards) {
    const container = this._container.getElement();
    const isAllCardsWatched = cards.every((card) => card.isWatched);
    let cardsCopy = [...cards];

    const renderTopRatedCards = () => {
      const compareByRating = (a, b) => b.rating - a.rating;

      cardsCopy.sort(compareByRating);
      renderCards(this._topRatedContainerComponent.getElement(), cardsCopy.slice(0, 2));
    };

    const renderMostCommentedCards = () => {
      const compareByComments = (a, b) => b.comments.length - a.comments.length;

      cardsCopy.sort(compareByComments);
      renderCards(this._mostCommentedContainerComponent.getElement(), cardsCopy.slice(0, 2));
    };

    if (isAllCardsWatched) {
      render(container, this._noDataComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._allFilmsComponent, RenderPosition.BEFOREEND);
    render(this._allFilmsComponent.getElement(), this._filmsListContainerComponent, RenderPosition.BEFOREEND);

    const cardListElement = this._filmsListContainerComponent.getElement();
    let showingCardsCount = SHOWING_CARDS_COUNT_ON_START;

    renderCards(cardListElement, cards.slice(0, showingCardsCount));

    render(container, this._btnShowMoreComponent, RenderPosition.BEFOREEND);

    this._btnShowMoreComponent.setClickHandler(() => {
      const prevCardsCount = showingCardsCount;
      showingCardsCount = showingCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;
      renderCards(cardListElement, cards.slice(prevCardsCount, showingCardsCount));

      if (showingCardsCount >= cards.length) {
        remove(this._btnShowMoreComponent);
      }
    });

    render(container, this._topRatedComponent, RenderPosition.BEFOREEND);
    render(this._topRatedComponent.getElement(), this._topRatedContainerComponent, RenderPosition.BEFOREEND);
    renderTopRatedCards();

    render(container, this._mostCommentedComponent, RenderPosition.BEFOREEND);
    render(this._mostCommentedComponent.getElement(), this._mostCommentedContainerComponent, RenderPosition.BEFOREEND);
    renderMostCommentedCards();
  }
}
