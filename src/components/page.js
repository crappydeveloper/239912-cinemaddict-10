import AbstractComponent from './abstractComponent.js';

const createPageTemplate = () => {
  return (
    `<section class="page container"></section>`
  );
};


export default class Page extends AbstractComponent {
  getTemplate() {
    return createPageTemplate();
  }
}
