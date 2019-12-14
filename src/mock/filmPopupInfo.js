import {TITLES} from '../const.js';
import {POSTERS} from '../const.js';
import {DESCRIPTIONS} from '../const.js';
import {getRandomPosition} from './filmCard.js';
import {getDescription} from './filmCard.js';


const generateComment = () => {
  return {
    text: DESCRIPTIONS[Math.floor(Math.random() * DESCRIPTIONS.length)],
    date: `2019/12/31 23:59`
  };
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

const generatePopup = () => {
  return {
    poster: POSTERS[getRandomPosition(POSTERS)],
    title: TITLES[getRandomPosition(TITLES)],
    titleOriginal: TITLES[getRandomPosition(TITLES)],
    rating: 9.0,
    director: `Юрий Быков`,
    author: `Vasiliy Pupkin`,
    writers: [`Л.Н.Толстой`, `А.С.Пушкин`],
    actors: [`Christoph Waltz`, `Jeffrey Leon Bridges`],
    releaseDate: `10 February 1337`,
    runtime: `2h 28m`,
    country: `USA`,
    genres: [`Drama`, `Mystery`, `Comedy`],
    description: getDescription(),
    minAge: 18,
    comments: generateComments(4)
  };
};

export {generatePopup};
