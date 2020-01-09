import AbstractComponent from './abstractComponent.js';

const createFilmsSectionTemplate = () => {
  return (
    `<section class="films">
    </section>`
  );
};

export default class FilmsSection extends AbstractComponent {
  getTemplate() {
    return createFilmsSectionTemplate();
  }
}
