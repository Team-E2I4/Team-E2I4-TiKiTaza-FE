import RankItem from './RankItem';

const RankList = () => {
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
      <div></div>
      <div>
        <div className='flex gap-2 items-center font-bold text-5xl bg-[#FFF4DC] py-2 px-4 border-b'>
          <span className='w-[20%] text-center'>순위</span>
          <span className='w-[20%] text-center'>닉네임</span>
          <span className='w-[20%] text-center'>점수</span>
        </div>
        {DUMMY_DATA.map((rank, index) => (
          <RankItem
            key={rank.id}
            rank={rank}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default RankList;
