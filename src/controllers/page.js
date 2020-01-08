import FilmCardComponent from '../components/filmCard.js';
import FilmPopupInfoComponent from '../components/filmPopupInfo.js';
import BtnShowMoreComponent from '../components/btnShowMore.js';
import NoDataComponent from '../components/noData.js';
import {render, RenderPosition, remove} from '../utils/render.js';

const SHOWING_CARDS_COUNT_ON_START = 5;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;


// renderCard() должен создавать компонент карточки (вешать листенеры и т.д.), как это делалось в renderCard, принимать должен не кол-во карт,
// а cardListElement — ЭЛЕМЕНТ, куда отрисовывать, card — компонент карты
// PageController.render() должен отрисовывать весь борд, принимать массив всех созданных карт cards,
// в контейнер с помощью render отрисовывать cardListElement

const renderCard = (cardListElement, card) => { //cardListElement — то, куда отрисовывать ЭЛЕМЕНТ, card — компонент карты
  const escKeyDownHandler = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      removePopup();
      document.removeEventListener(`keydown`, escKeyDownHandler);
    }
  };

  const removePopup = () => {
    remove(filmPopupInfoComponent);
  }

  const filmCardComponent = new FilmCardComponent(card);
  const filmPopupInfoComponent = new FilmPopupInfoComponent(card);

  filmCardComponent.setClickHandler(() => {
    render(siteMainElement, filmPopupInfoComponent, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, escKeyDownHandler);
  });

  filmPopupInfoComponent.setButtonCloseClickHandler(removePopup);

  render(cardListElement, filmCardComponent, RenderPosition.BEFOREEND);
};

export default class PageController {
  constructor(container) {
    this._container = container;

    this._noDataComponent = new NoDataComponent();
//    this._sortComponent = new SortComponent();
//    this._tasksComponent = new TasksComponent();
    this._btnShowMoreComponent = new BtnShowMoreComponent();
// разбить компонент с блоком отрисовки карточек на несколько
// добавить сюда все. отрисовывать в render
  }

  render(cards) {
    const container = this._container.getElement();
    const isAllCardsWatched = cards.every((card) => card.isWatched);

    if (isAllCardsWatched) {
      render(container, this._noDataComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._cardsComponent, RenderPosition.BEFOREEND);

    const cardListElement = this._cardsComponent.getElement();

    let showingCardsCount = SHOWING_CARDS_COUNT_ON_START;
    cards.slice(0, showingCardsCount)
      .forEach((card) => {
        renderCard(cardListElement, card);
      });

    render(container, this._btnShowMoreComponent, RenderPosition.BEFOREEND);

    this._btnShowMoreComponent.setClickHandler(() => {
      const clickBtnShowMoreHandler = () => {
        const prevCardsCount = showingCardsCount;
        showingCardsCount = showingCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

        cards.slice(prevCardsCount, showingCardsCount)
          .forEach((card) => renderTask(cardListElement, card));

        if (showingCardsCount === cards.length) {
          remove(this._btnShowMoreComponent);
        }
      };
    })
  }
}
