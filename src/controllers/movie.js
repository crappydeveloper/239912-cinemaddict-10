import NoDataComponent from '../components/noData.js';
import FilmCardComponent from '../components/filmCard.js';
import FilmPopupInfoComponent from '../components/filmPopupInfo.js';
import {render, RenderPosition, remove} from '../utils/render.js';

/*
const Mode = {
  DEFAULT: `default`,
  POPUP: `popup`,
};
*/

export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container; //тут сделано как в Академии
    this._onDataChange = onDataChange;
    this._noDataComponent = new NoDataComponent();

    //this._mode = Mode.DEFAULT;

    this._filmCardComponent = null;
    this._filmPopupInfoComponent = null;

    //this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(card) {
    const oldFilmCardComponent = this._filmCardComponent;
    const oldFilmPopupInfoComponent = this._filmPopupInfoComponent;

    this._filmCardComponent = new FilmCardComponent(card);
    this._filmPopupInfoComponent = new FilmPopupInfoComponent(card);

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

    this._filmCardComponent.setClickHandler(() => {
      render(container, filmPopupInfoComponent, RenderPosition.BEFOREEND);
      document.addEventListener(`keydown`, escKeyDownHandler);
      filmPopupInfoComponent.setButtonCloseClickHandler(removePopup);
    });

    this._filmCardComponent.setAddToWatchlistButtonClickHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        watchlist: !card.watchlist,
      }));
    });

    this._filmCardComponent.setAlreadyWatchedButtonClickHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        already_watched: !card.already_watched,
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
        already_watched: !card.already_watched,
      }));
    });

    this._filmPopupInfoComponent.setAddToFavoritesButtonClickHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        favorite: !card.favorite,
      }));
    });
    
    if (oldFilmCardComponent && oldFilmPopupInfoComponent) {
      replace(this._taskComponent, oldTaskComponent); // переделать
      replace(this._taskEditComponent, oldTaskEditComponent); // переделать
    } else {
      render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
    }
  }

  removePopup() {
    remove(filmPopupInfoComponent);
  }

  escKeyDownHandler(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      removePopup();
      document.removeEventListener(`keydown`, escKeyDownHandler);
    }
  }

}
