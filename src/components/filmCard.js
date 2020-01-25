import AbstractComponent from './abstractComponent.js';

const createFilmCardTemplate = (card) => {
  const {title, rating, releaseDate, runtime, genres, poster, description, comments} = card;
  const year = releaseDate.getFullYear();

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${runtime}</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src=${poster} alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched film-card__controls-item--active">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class FilmCard extends AbstractComponent {
  constructor(card) {
    super();

    this._card = card;
  }

  getTemplate() {
    return createFilmCardTemplate(this._card);
  }

  setClickHandler(handler) {
    const poster = this.getElement().querySelector(`.film-card__poster`);
    const title = this.getElement().querySelector(`.film-card__title`);
    const comments = this.getElement().querySelector(`.film-card__comments`);

    [poster, title, comments].forEach((it) => {
      it.addEventListener(`click`, handler);
    });
  }

  setAddToWatchlistButtonClickHandler(handler) {
    const addToWatchlistButton = this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`);
    addToWatchlistButton.addEventListener(`click`, handler);
  }

  setAlreadyWatchedButtonClickHandler(handler) {
    const alreadyWatchedButton = this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`);
    alreadyWatchedButton.addEventListener(`click`, handler);
  }

  setAddToFavoritesButtonClickHandler(handler) {
    const addToFavoritesButton = this.getElement().querySelector(`.film-card__controls-item--favorite`);
    addToFavoritesButton.addEventListener(`click`, handler);
  }
}
