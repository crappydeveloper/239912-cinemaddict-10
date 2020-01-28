import AbstractComponent from './abstractComponent.js';

const createEmojiTemplate = (src) => {
  return (
    `<img src="${src}" width="55" height="55" alt="emoji">`
  );
};

export default class Emoji extends AbstractComponent {
  constructor(src) {
    super();

    this._src = src;
  }

  getTemplate() {
    return createEmojiTemplate(this._src);
  }
}
