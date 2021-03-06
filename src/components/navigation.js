import {getStatistics} from '../mock/navigation.js';
import AbstractComponent from './abstractComponent.js';

const createNavigationTemplate = () => {
  return (
    `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${getStatistics()}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${getStatistics()}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${getStatistics()}</span></a>
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>`
  );
};

export default class Navigation extends AbstractComponent {
  getTemplate() {
    return createNavigationTemplate();
  }
}
