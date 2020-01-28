import NoDataComponent from '../components/noData.js';
import FilmCardComponent from '../components/filmCard.js';
import FilmPopupInfoComponent from '../components/filmPopupInfo.js';
import FilmPopupMiddleContainer from '../components/filmPopupMiddleContainer.js';
import FilmPopupUserRatingComponent from '../components/filmPopupUserRating.js';
import EmojiComponent from '../components/emoji.js';
import {render, RenderPosition, remove, replace} from '../utils/render.js';

export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._noDataComponent = new NoDataComponent();
    this._filmPopupMiddleContainer = new FilmPopupMiddleContainer();

    this._filmCardComponent = null;
    this._filmPopupInfoComponent = null;
    this._filmPopupUserRatingComponent = null;
  }

  render(card) {
    const oldFilmCardComponent = this._filmCardComponent;
    const oldFilmPopupInfoComponent = this._filmPopupInfoComponent;

    this._filmCardComponent = new FilmCardComponent(card);
    this._filmPopupInfoComponent = new FilmPopupInfoComponent(card);
    this._filmPopupUserRatingComponent = new FilmPopupUserRatingComponent(card);

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

    const showRankSetterBlock = () => {
      const filmPopupTopContainer = this._filmPopupInfoComponent.getElement().querySelector(`.form-details__top-container`);

      render(filmPopupTopContainer, this._filmPopupMiddleContainer, RenderPosition.AFTEREND);
      render(this._filmPopupMiddleContainer.getElement(), this._filmPopupUserRatingComponent, RenderPosition.BEFOREEND);
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

      if (card.alreadyWatched) {
        render(this._container, this._filmPopupInfoComponent, RenderPosition.BEFOREEND);
        document.addEventListener(`keydown`, escKeyDownHandler);
        this._filmPopupInfoComponent.setButtonCloseClickHandler(removePopup);

        showRankSetterBlock();
      } else {
        card.personalRating = null;
        remove(this._filmPopupMiddleContainer);
      }
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

      if (card.alreadyWatched) {
        showRankSetterBlock();
      } else {
        card.personalRating = null;
        remove(this._filmPopupMiddleContainer);
      }
    });

    this._filmPopupInfoComponent.setAddToFavoritesButtonClickHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        favorite: !card.favorite,
      }));
    });

    this._filmPopupInfoComponent.setAnyEmojiClickHandler((evt) => {
      const emojiInCommentBlock = this._filmPopupInfoComponent.getElement().querySelector(`.film-details__add-emoji-label`);
      emojiInCommentBlock.innerHTML = ``;
      let chosenEmojiSrc = evt.target.src;

      this._emojiComponent = new EmojiComponent(chosenEmojiSrc);
      render(emojiInCommentBlock, this._emojiComponent, RenderPosition.BEFOREEND);
    });

    this._filmPopupUserRatingComponent.setAnyScoreClickHandler((evt) => {
      const personalRating = evt.target.textContent; // здесь было currentTarget. Посмотрим, не будет ли бага
      card.personalRating = personalRating; // возможно, тут необходимо вызывать onDataChange
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
