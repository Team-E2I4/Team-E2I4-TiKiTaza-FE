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
      nickname: 'user5',
      score: 60,
    },
    {
      id: 6,
      nickname: 'user6',
      score: 50,
    },
    {
      id: 7,
      nickname: 'user7',
      score: 40,
    },
    {
      id: 8,
      nickname: 'user8',
      score: 30,
    },
    {
      id: 9,
      nickname: 'user9',
      score: 20,
    },
  ];
  return (
    <div className='flex flex-col bg-[#FFF4DC] gap-4 rounded-2xl overflow-hidden'>
      <div className='flex gap-2 justify-center font-bold font-[Giants-Inline] text-5xl py-2 px-4 border-b border-gray-200'>
        <span className='w-[30%] text-center'>순위</span>
        <span className='w-[40%] text-center'>닉네임</span>
        <span className='w-[30%] text-center'>점수</span>
      </div>
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

export default RankList;
