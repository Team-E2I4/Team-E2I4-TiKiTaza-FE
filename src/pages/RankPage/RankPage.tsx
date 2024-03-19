import * as Tabs from '@radix-ui/react-tabs';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Backward from '@/common/Backward/Backward';
import { useRank } from '@/hooks/useRank';
import RankList from './RankList';

const RankPage = () => {
  const [selectedTab, setSelectedTab] = useState('');
  const { data: rankData, refetch } = useRank(selectedTab || undefined);

  const tabData = [
    { value: '', text: '전체' },
    { value: 'WORD', text: '단어' },
    { value: 'SENTENCE', text: '문장' },
    { value: 'CODE', text: '코드' },
  ];

  const navigate = useNavigate();

  const handleClickBackward = useCallback(() => {
    navigate('/main', { replace: true });
  }, []);

  useEffect(() => {
    // 탭이 변경될 때마다 refetch 함수를 호출하여 랭킹 데이터를 갱신합니다.
    refetch();
  }, [selectedTab, refetch]);

  return (
    <>
      <Backward handleClickBackward={handleClickBackward} />
      <Tabs.Root
        className='flex flex-col gap-[4rem] w-[60%] mx-auto'
        defaultValue=''
        onValueChange={setSelectedTab}>
        <Tabs.List className='flex gap-[11rem] justify-center font-bold font-[Giants-Inline] text-4x'>
          {tabData.map(({ value, text }) => (
            <Tabs.Trigger
              key={text}
              value={value}
              className='bg-green-70 rounded-[1rem] px-8 py-4 data-[state=active]:bg-green-100'
              data-state={value === selectedTab ? 'active' : 'inactive'}>
              {text}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        {tabData.map(({ value, text }) => (
          <Tabs.Content
            key={text}
            value={value}>
            <RankList convertedRankData={rankData.data.data} />
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </>
  );
};

export default RankPage;
