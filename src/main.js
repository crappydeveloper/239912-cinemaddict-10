import UserRankComponent from './components/userRank.js';
import NavigationComponent from './components/navigation.js';
import SortComponent from './components/sort.js';
import FilmsSectionComponent from './components/filmsSection.js';
import PageController from './controllers/page.js';
import {generatePopups} from './mock/filmPopupInfo.js';
import {render, RenderPosition} from './utils/render.js';

const TASK_COUNT = 13;
const cards = generatePopups(TASK_COUNT);
// const cardsCopy = [...cards];

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, new UserRankComponent(), RenderPosition.BEFOREEND);
render(siteMainElement, new NavigationComponent(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortComponent(), RenderPosition.BEFOREEND);

const pageComponent = new FilmsSectionComponent();
render(siteMainElement, pageComponent, RenderPosition.BEFOREEND);

const pageController = new PageController(pageComponent);
pageController.render(cards);

/*
const compareByRating = (a, b) => b.rating - a.rating;
const compareByComments = (a, b) => b.comments.length - a.comments.length;

cardsCopy.sort(compareByRating);
const topRatedToRender = cardsCopy.slice(0, 2);
for (let i = 0; i < 2; i++) {
  render(topRatedContainer, new FilmCardComponent(topRatedToRender.pop()), RenderPosition.BEFOREEND);
}

cardsCopy.sort(compareByComments);
const mostCommentedToRender = cardsCopy.slice(0, 2);
for (let i = 0; i < 2; i++) {
  render(mostCommentedContainer, new FilmCardComponent(mostCommentedToRender.pop()), RenderPosition.BEFOREEND);
}
*/
