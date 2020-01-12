import {TITLES} from '../const.js';
import {POSTERS} from '../const.js';
import {DESCRIPTIONS} from '../const.js';

const getRandomPosition = (arr) => {
  return Math.floor(Math.random() * arr.length);
};

const getDescription = () => {
  let descriptionsCopy = Array.from(DESCRIPTIONS);

  descriptionsCopy.length = getRandomPosition(descriptionsCopy) + 1;
  descriptionsCopy = descriptionsCopy.join(` `);
  return descriptionsCopy;
};

const getRandomDate = () => {
  const targetDate = new Date();

  targetDate.setDate(targetDate.getDate() - Math.random() * 20000);

  return targetDate;
};

const generateComment = () => {
  return {
    text: DESCRIPTIONS[Math.floor(Math.random() * DESCRIPTIONS.length)],
    author: TITLES[getRandomPosition(TITLES)],
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
    rating: (Math.random() * 10).toFixed(1),
    director: `Юрий Быков`,
    author: `Vasiliy Pupkin`,
    writers: [`Л.Н.Толстой`, `А.С.Пушкин`],
    actors: [`Christoph Waltz`, `Jeffrey Leon Bridges`],
    releaseDate: getRandomDate(),
    runtime: `2h 28m`,
    country: `USA`,
    genres: [`Drama`, `Mystery`, `Comedy`],
    description: getDescription(),
    minAge: 18,
    comments: generateComments(Math.floor(Math.random() * 18)),
    isWatched: Math.random() > 0.5,
  };
};

const generatePopups = (count) => {
  return new Array(count)
    .fill(``)
    .map(generatePopup);
};

export {generatePopup, generatePopups};
