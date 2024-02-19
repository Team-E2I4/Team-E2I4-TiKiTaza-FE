import * as Tabs from '@radix-ui/react-tabs';
import { DUMMY_DATA } from './RankData';
import RankList from './RankList';

const RankPage = () => {
  const tabData = [
    { value: 'tab1', text: '전체', data: DUMMY_DATA },
    { value: 'tab2', text: '단어', data: DUMMY_DATA },
    { value: 'tab3', text: '문장', data: DUMMY_DATA },
    { value: 'tab4', text: '코드', data: DUMMY_DATA },
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
      {tabData.map(({ value, data }) => (
        <Tabs.Content
          key={value}
          value={value}>
          <RankList data={data} />
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
};

export default RankPage;
