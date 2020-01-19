import AbstractComponent from './abstractComponent.js';

export default class AbstractSmartComponent extends AbstractComponent {
  constructor(filmInfo) {
    super();

    this._filmInfo = filmInfo;
  }

  recoveryListeners() {

  }

  rerender() {

  }
}
