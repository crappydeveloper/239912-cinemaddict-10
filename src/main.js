import UserRankComponent from './components/userRank.js';
import NavigationComponent from './components/navigation.js';
import FilmsSectionComponent from './components/filmsSection.js';
import PageController from './controllers/page.js';
import {generatePopups} from './mock/filmPopupInfo.js';
import {render, RenderPosition} from './utils/render.js';

const TASK_COUNT = 13;
const cards = generatePopups(TASK_COUNT);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, new UserRankComponent(), RenderPosition.BEFOREEND);
render(siteMainElement, new NavigationComponent(), RenderPosition.BEFOREEND);

const pageComponent = new FilmsSectionComponent();
render(siteMainElement, pageComponent, RenderPosition.BEFOREEND);

const pageController = new PageController(pageComponent);
pageController.render(cards);
