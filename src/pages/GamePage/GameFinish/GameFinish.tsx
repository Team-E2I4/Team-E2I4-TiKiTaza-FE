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
      .map((data, idx) => {
        if (idx !== 0 && data.score !== allMembers[idx - 1].score) {
          rank = idx;
        }
        return { ...data, ranking: rank };
      });
  }, [allMembers]);

  return (
    <div className='flex flex-col gap-[8rem] items-center'>
      <section>
        <span className='text-[3rem] font-bold font-[Giants-Inline]'>
          {`${convertTime(timeLeft)}초 뒤 게임 대기방으로 이동합니다.`}
        </span>
      </section>
      <section className='flex gap-[10rem] w-full'>
        <div className='flex flex-1 justify-center items-end'>
          <div
            className='h-[28rem] w-[14rem] flex items-center justify-center shadow-2xl text-[5rem] font-bold'
            style={{
              backgroundImage:
                'linear-gradient(0deg, #8B8C8D 0%, #C0C0C0 25%, #6D6E71 50%, #F5F5F5 100%)',
              boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
            }}>
            2
          </div>
          <div
            className='h-[40rem] w-[14rem] flex items-center justify-center shadow-2xl text-[5rem] font-bold'
            style={{
              backgroundImage:
                'linear-gradient(0deg, #ECC440 0%, #FFFA8A 25%, #DDAC17 50%, #FFFF95 100%)',
              boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
            }}>
            1
          </div>
          <div
            className='h-[20rem] w-[14rem] flex items-center justify-center shadow-2xl text-[5rem] font-bold'
            style={{
              backgroundImage:
                'linear-gradient(0deg, #CD7F32 0%, #E89752 25%, #8B4513 50%, #CD7F32 100%)',
              boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
            }}>
            3
          </div>
        </div>

        <div className='flex-1'>
          <RankList convertedRankData={convertedRankData} />
        </div>
      </section>
      <section className='flex gap-10 font-[Giants-Inline]'>
        <button
          onClick={() => {
            navigate('/main', { replace: true });
            navigate(0);
          }}
          className='bg-coral-100 px-6 py-6 rounded-[1rem] text-[3rem] font-bold'>
          로비로 나가기
        </button>
        <button
          onClick={() => {
            onMoveToGameRoom();
          }}
          className='bg-coral-100 px-6 py-6 rounded-[1rem] text-[3rem] font-bold'>
          다시하기
        </button>
      </section>
    </div>
  );
};

export default GameFinish;
