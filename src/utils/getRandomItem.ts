interface getRandomItemProps {
  items: string[];
}

const getRandomItem = ({ items = [] }: getRandomItemProps) => {
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
};

export default getRandomItem;
