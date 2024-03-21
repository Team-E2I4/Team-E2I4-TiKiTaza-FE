import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { convertTime } from '@/common/Timer/utils/convertTime';
import useTimer from '@/hooks/useTimer';
import useGameWaitingRoomStore from '@/store/useGameWaitingRoomStore';
import useIngameStore from '@/store/useIngameStore';
import RankList from '../../RankPage/RankList';
import { I_AllMember, I_IngameWsResponse } from '../types/websocketType';

const GameFinish = ({
  allMembers,
  userId,
}: {
  allMembers: I_AllMember[];
  userId: number;
}) => {
  const navigate = useNavigate();
  const { setDidAdminStart } = useGameWaitingRoomStore();
  const { setIngameRoomRes } = useIngameStore();

  const { timeLeft } = useTimer({
    minutes: 0,
    seconds: 10,
    onTimeFinish: () => {
      onMoveToGameRoom();
    },
  });

  const onMoveToGameRoom = () => {
    setDidAdminStart(false);
    setIngameRoomRes({} as I_IngameWsResponse);
    navigate('/game', { replace: true });
  };

  const convertedRankData = useMemo(() => {
    let rank = 1;
    return allMembers
      .map(({ nickname, score, memberId }) => ({
        nickname,
        score,
        isMe: memberId === userId,
      }))
      .sort(
        ({ score: prevScore }, { score: nextScore }) => nextScore - prevScore
      )
      .map((data, idx, sortedData) => {
        if (idx !== 0 && data.score !== sortedData[idx - 1].score) {
          rank = idx + 1;
        }
        return { ...data, ranking: rank };
      });
  }, [allMembers, userId]);
  return (
    <div className='flex flex-col gap-[8rem] items-center'>
      <section>
        <span className='text-[3rem] font-bold font-[Giants-Inline]'>
          {`${convertTime(timeLeft)}초 뒤 게임 대기방으로 이동합니다.`}
        </span>
      </section>
      <section className='flex gap-[10rem] w-full'>
        <div className='flex flex-grow justify-center'>
          <RankList convertedRankData={convertedRankData} />
        </div>
      </section>
      <section className='flex gap-10 font-[Giants-Inline]'>
        <button
          onClick={() => {
            navigate('/main', { replace: true });
            navigate(0);
          }}
          className='bg-coral-100 px-6 py-6 rounded-[1rem] text-[2rem] font-bold'>
          로비로 나가기
        </button>
        <button
          onClick={() => {
            onMoveToGameRoom();
          }}
          className='bg-coral-100 px-6 py-6 rounded-[1rem] text-[2rem] font-bold'>
          다시하기
        </button>
      </section>
    </div>
  );
};

export default GameFinish;
