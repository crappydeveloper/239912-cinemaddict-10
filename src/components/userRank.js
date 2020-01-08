import {getUserRank} from '../mock/userRank.js';
import AbstractComponent from './abstractComponent.js';

const createUserRankTemplate = () => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${getUserRank()}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class UserRank extends AbstractComponent {
  getTemplate() {
    return createUserRankTemplate();
  }
}
