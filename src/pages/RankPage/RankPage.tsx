import * as Tabs from '@radix-ui/react-tabs';
import RankList from './RankList';

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

const RankPage = () => {
  const tabData = [
    { value: 'tab1', text: '전체' },
    { value: 'tab2', text: '단어' },
    { value: 'tab3', text: '문장' },
    { value: 'tab4', text: '코드' },
  ];
  return (
    <Tabs.Root
      className='flex flex-col gap-[4rem] w-[60%] mx-auto'
      defaultValue='tab1'>
      <Tabs.List className='flex gap-[11rem] justify-center font-bold font-[Giants-Inline] text-4xl text-white'>
        {tabData.map(({ value, text }) => (
          <Tabs.Trigger
            key={value}
            value={value}
            className='bg-coral-100 rounded-[1rem] px-8 py-4'>
            {text}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <Tabs.Content value='tab1'>
        <RankList data={DUMMY_DATA} />
      </Tabs.Content>
      <Tabs.Content value='tab2'>
        <RankList data={DUMMY_DATA} />
      </Tabs.Content>
      <Tabs.Content value='tab3'>
        <RankList data={DUMMY_DATA} />
      </Tabs.Content>
      <Tabs.Content value='tab4'>
        <RankList data={DUMMY_DATA} />
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default RankPage;
