import * as Tabs from '@radix-ui/react-tabs';
import { useEffect, useState } from 'react';
import { useRank } from '@/hooks/useRank';
import RankList from './RankList';

const RankPage = () => {
  const [selectedTab, setSelectedTab] = useState('');
  const { data: rankData, refetch } = useRank(selectedTab);

  const tabData = [
    { value: '', text: '전체' },
    { value: 'WORD', text: '단어' },
    { value: 'SENTENCE', text: '문장' },
    { value: 'CODE', text: '코드' },
  ];

  useEffect(() => {
    // 탭이 변경될 때마다 refetch 함수를 호출하여 랭킹 데이터를 갱신합니다.
    refetch();
  }, [selectedTab, refetch]);

  return (
    <Tabs.Root
      className='flex flex-col gap-[4rem] w-[60%] mx-auto'
      defaultValue=''
      onValueChange={setSelectedTab}>
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
      {rankData &&
        tabData.map(({ value }) => (
          <Tabs.Content
            key={value}
            value={value}>
            <RankList data={rankData.data.data} />
          </Tabs.Content>
        ))}
    </Tabs.Root>
  );
};

export default RankPage;
