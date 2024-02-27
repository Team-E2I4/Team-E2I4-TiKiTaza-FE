interface getRandomTitleProps {
  titles: string[];
}

const getRandomTitle = ({ titles = [] }: getRandomTitleProps) => {
  const randomIndex = Math.floor(Math.random() * titles.length);
  return titles[randomIndex];
};

export default getRandomTitle;
