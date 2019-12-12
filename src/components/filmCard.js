import {mockData} from '../mock/filmCard.js';

export const createFilmCardTemplate = () => {
  return (
    `<article class="film-card">
      <h3 class="film-card__title">${mockData.title}</h3>
      <p class="film-card__rating">${mockData.rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${mockData.info.year}</span>
        <span class="film-card__duration">${mockData.info.duration}</span>
        <span class="film-card__genre">${mockData.info.genre}</span>
      </p>
      <img src=${mockData.posterSrc} alt="" class="film-card__poster">
      <p class="film-card__description">${mockData.description}</p>
      <a class="film-card__comments">18 comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched film-card__controls-item--active">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};
