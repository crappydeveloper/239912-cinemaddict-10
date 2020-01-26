import SortComponent, {SortType} from '../components/sort.js';
import AllFilmsComponent from '../components/allFilms.js';
import FilmsListContainerComponent from '../components/filmsListContainer';
import NoDataComponent from '../components/noData.js';
import BtnShowMoreComponent from '../components/btnShowMore.js';
import TopRatedComponent from '../components/topRated';
import MostCommentedComponent from '../components/mostCommented';
import {render, RenderPosition, remove} from '../utils/render.js';
import MovieController from './movie.js';

const SHOWING_CARDS_COUNT_ON_START = 5;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;

const renderCards = (cardListElement, cards, onDataChange) => {
  return cards.map((card) => {
    const movieController = new MovieController(cardListElement, onDataChange);
    movieController.render(card);

    return movieController;
  });
};

export default class PageController {
  constructor(container) {
    this._container = container;

    this._cards = [];
    this._sortComponent = new SortComponent();
    this._allFilmsComponent = new AllFilmsComponent();
    this._filmsListContainerComponent = new FilmsListContainerComponent();
    this._noDataComponent = new NoDataComponent();
    this._btnShowMoreComponent = new BtnShowMoreComponent();
    this._topRatedComponent = new TopRatedComponent();
    this._topRatedContainerComponent = new FilmsListContainerComponent();
    this._mostCommentedComponent = new MostCommentedComponent();
    this._mostCommentedContainerComponent = new FilmsListContainerComponent();

    this._onDataChange = this._onDataChange.bind(this);
  }

  render(cards) {
    this._cards = cards;

    const container = this._container.getElement();
    const isAllCardsWatched = cards.every((card) => card.isWatched);
    let cardsCopy = [...cards];

    const renderLoadMoreButton = (containerElement = container, position = RenderPosition.BEFOREEND) => { // кажется мне, что аргументы — это костыль
      if (showingCardsCount >= cards.length) {
        return;
      }

      render(containerElement, this._btnShowMoreComponent, position);

      this._btnShowMoreComponent.setClickHandler(() => {
        const prevCardsCount = showingCardsCount;
        showingCardsCount = showingCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

        renderCards(cardListElement, cards.slice(prevCardsCount, showingCardsCount), this._onDataChange);

        if (showingCardsCount >= cards.length) {
          remove(this._btnShowMoreComponent);
        }
      });
    };

    const renderTopRatedCards = () => {
      const compareByRating = (a, b) => b.rating - a.rating;

      cardsCopy.sort(compareByRating);
      renderCards(this._topRatedContainerComponent.getElement(), cardsCopy.slice(0, 2), this._onDataChange);
    };

    const renderMostCommentedCards = () => {
      const compareByComments = (a, b) => b.comments.length - a.comments.length;

      cardsCopy.sort(compareByComments);
      renderCards(this._mostCommentedContainerComponent.getElement(), cardsCopy.slice(0, 2), this._onDataChange);
    };

    if (isAllCardsWatched) {
      render(container, this._noDataComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._sortComponent, RenderPosition.BEFOREBEGIN);

    render(container, this._allFilmsComponent, RenderPosition.BEFOREEND);
    render(this._allFilmsComponent.getElement(), this._filmsListContainerComponent, RenderPosition.BEFOREEND);

    const cardListElement = this._filmsListContainerComponent.getElement();
    let showingCardsCount = SHOWING_CARDS_COUNT_ON_START;

    renderCards(cardListElement, cards.slice(0, showingCardsCount), this._onDataChange);

    renderLoadMoreButton();

    render(container, this._topRatedComponent, RenderPosition.BEFOREEND);
    render(this._topRatedComponent.getElement(), this._topRatedContainerComponent, RenderPosition.BEFOREEND);
    renderTopRatedCards();

    render(container, this._mostCommentedComponent, RenderPosition.BEFOREEND);
    render(this._mostCommentedComponent.getElement(), this._mostCommentedContainerComponent, RenderPosition.BEFOREEND);
    renderMostCommentedCards();

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      let sortedCards = [];

      switch (sortType) {
        case SortType.DATE:
          sortedCards = cards.slice().sort((a, b) => b.releaseDate - a.releaseDate);
          break;
        case SortType.RATING:
          sortedCards = cards.slice().sort((a, b) => b.rating - a.rating);
          break;
        case SortType.DEFAULT:
          sortedCards = cards.slice(0, showingCardsCount);
          break;
      }

      cardListElement.innerHTML = ``;

      renderCards(cardListElement, sortedCards, this._onDataChange);

      if (sortType === SortType.DEFAULT) {
        renderLoadMoreButton(this._topRatedComponent.getElement(), RenderPosition.BEFOREBEGIN);
      } else {
        remove(this._btnShowMoreComponent);
      }
    });
  }

  _onDataChange(movieController, oldData, newData) {
    const index = this._cards.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._cards = [].concat(this._cards.slice(0, index), newData, this._cards.slice(index + 1));

    movieController.render(this._cards[index]);
  }
}
