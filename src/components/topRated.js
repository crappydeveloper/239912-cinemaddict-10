import {createFilmCardTemplate} from './filmCard.js';

export const createTopRatedTemplate = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container">
        ${createFilmCardTemplate()}
        ${createFilmCardTemplate()}
      </div>
    </section>`
  );
};
