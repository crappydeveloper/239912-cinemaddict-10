import AbstractComponent from './abstractComponent.js';

const createFilmPopupMiddleContainerTemplate = () => {
  return (
    `<div class="form-details__middle-container">

    </div>`
  );
};

export default class filmPopupMiddleContainer extends AbstractComponent {
  getTemplate() {
    return createFilmPopupMiddleContainerTemplate();
  }
}
