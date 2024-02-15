import RankItem from './RankItem';

const RankPage = () => {
  const DUMMY_DATA = [
    {
      id: 1,
      nickname: 'user1',
      score: 100,
    },
    {
      id: 2,
      nickname: 'user2',
      score: 90,
    },
    {
      id: 3,
      nickname: 'user3',
      score: 80,
    },
    {
      id: 4,
      nickname: 'user4',
      score: 70,
    },
    {
      id: 5,
      nickname: 'user3',
      score: 60,
    },
    {
      id: 6,
      nickname: 'user3',
      score: 50,
    },
    {
      id: 7,
      nickname: 'user3',
      score: 40,
    },
    {
      id: 8,
      nickname: 'user3',
      score: 30,
    },
    {
      id: 9,
      nickname: 'user3',
      score: 20,
    },
  ];
  return (
    <div>
      {DUMMY_DATA.map((rank, index) => (
        <RankItem
          key={rank.id}
          rank={rank}
          index={index}
        />
      ))}
    </div>
  );
};

export default RankPage;
