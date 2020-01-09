import AbstractComponent from './abstractComponent.js';

const createFilmsListContainerTemplate = () => {
  return (
    `<div class="films-list__container">
    </div>`
  );
};

export default class FilmsListContainer extends AbstractComponent {
  getTemplate() {
    return createFilmsListContainerTemplate();
  }
}
