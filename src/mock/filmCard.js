const DESCRIPTIONS = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`];

const TITLES = [
  `Во все тяжкие`,
  `Одержимость`,
  `Дыллда`,
  `Как я встретил вашу маму`,
  `Друзья`,
  `Омерзительная восьмерка`,
  `Криминальное чтиво`,
  `Однажды в голливуде`,
  `Бесславные ублюдки`,
  `Джанго освобожденный`,
  `Интерстеллар`,
  `Гарри Поттер и орден феникса`,
  `Социальная сеть`,
  `11 друзей Оушена`,
  `Сторож`
];

const POSTERS = [
  `./images/posters/the-man-with-the-golden-arm.jpg`,
  `./images/posters/made-for-each-other.png`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/the-great-flamarion.jpg`
];

const getRandomPosition = (arr) => {
  return Math.floor(Math.random() * arr.length);
};

const getDescription = () => {
  let descriptionsCopy = Array.from(DESCRIPTIONS);

  descriptionsCopy.length = getRandomPosition(descriptionsCopy) + 1;
  descriptionsCopy = descriptionsCopy.join(` `);
  return descriptionsCopy;
};

export const mockData = {
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
