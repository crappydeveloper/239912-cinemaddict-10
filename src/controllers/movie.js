import NoDataComponent from '../components/noData.js';
import FilmCardComponent from '../components/filmCard.js';
import FilmPopupInfoComponent from '../components/filmPopupInfo.js';
// import LeftRatingComponent from '../components/leftRating.js';
import {render, RenderPosition, remove, replace} from '../utils/render.js';

export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._noDataComponent = new NoDataComponent();

    this._filmCardComponent = null;
    this._filmPopupInfoComponent = null;
  }

  render(card) {
    const oldFilmCardComponent = this._filmCardComponent;
    const oldFilmPopupInfoComponent = this._filmPopupInfoComponent;

    this._filmCardComponent = new FilmCardComponent(card);
    this._filmPopupInfoComponent = new FilmPopupInfoComponent(card);
    // this._leftRatingComponent = new LeftRatingComponent(card);

    const escKeyDownHandler = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
      if (isEscKey) {
        removePopup();
        document.removeEventListener(`keydown`, escKeyDownHandler);
      }
    };

    const removePopup = () => {
      remove(this._filmPopupInfoComponent);
    };

    this._filmCardComponent.setClickHandler(() => {
      render(this._container, this._filmPopupInfoComponent, RenderPosition.BEFOREEND);
      document.addEventListener(`keydown`, escKeyDownHandler);
      this._filmPopupInfoComponent.setButtonCloseClickHandler(removePopup);
    });

    this._filmCardComponent.setAddToWatchlistButtonClickHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        watchlist: !card.watchlist,
      }));
    });

    this._filmCardComponent.setAlreadyWatchedButtonClickHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        alreadyWatched: !card.alreadyWatched,
      }));
    });

    this._filmCardComponent.setAddToFavoritesButtonClickHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        favorite: !card.favorite,
      }));
    });

    this._filmPopupInfoComponent.setAddToWatchlistButtonClickHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        watchlist: !card.watchlist,
      }));
    });

    this._filmPopupInfoComponent.setAlreadyWatchedButtonClickHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        alreadyWatched: !card.alreadyWatched,
      }));
    });

    this._filmPopupInfoComponent.setAddToFavoritesButtonClickHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        favorite: !card.favorite,
      }));
    });

    if (oldFilmCardComponent && oldFilmPopupInfoComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
      replace(this._filmPopupInfoComponent, oldFilmPopupInfoComponent);
    } else {
      render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
    }
  }

  removePopup() {
    remove(this._filmPopupInfoComponent);
  }
}
