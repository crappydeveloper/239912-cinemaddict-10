import {DESCRIPTIONS} from '../const.js';
import {TITLES} from '../const.js';
import {POSTERS} from '../const.js';

const getRandomPosition = (arr) => {
  return Math.floor(Math.random() * arr.length);
};

const getDescription = () => {
  let descriptionsCopy = Array.from(DESCRIPTIONS);

  descriptionsCopy.length = getRandomPosition(descriptionsCopy) + 1;
  descriptionsCopy = descriptionsCopy.join(` `);
  return descriptionsCopy;
};

const generateCard = () => {
  return {
    title: TITLES[getRandomPosition(TITLES)],
    rating: 9.0,
    posterSrc: POSTERS[getRandomPosition(POSTERS)],
    info: {
      year: 1988,
      duration: `1h 45m`,
      genre: `Drama`
    },
    description: getDescription()
  };
};

const generateCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateCard);
};

export {generateCard, generateCards, getDescription, getRandomPosition};
