import AbstractComponent from './abstractComponent.js';

const createBtnShowMoreTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class BtnShowMore extends AbstractComponent {
  getTemplate() {
    return createBtnShowMoreTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
