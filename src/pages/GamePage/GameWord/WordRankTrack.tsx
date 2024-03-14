import { useMemo } from 'react';
import { TRACK_CARS } from '@/assets/canvasCars';
import { I_AllMember } from '../types/websocketType';

interface WordRankProps {
  track: number;
  userId: number;
  member: I_AllMember;
}

const WordRankTrack = ({ track, member, userId }: WordRankProps) => {
  const { memberId, score, nickname } = member;
  const isMe = useMemo(() => userId === Number(memberId), [userId, memberId]);
  // 초기 기본값 2rem. 도착지점일때 20rem
  const calculatedBottom = `${2 + score * 0.2}rem`;
  return (
    <>
      <div className='w-28 h-[24rem] box-content relative'>
        <div className={'flex justify-between'}>
          <div
            style={{ bottom: calculatedBottom }}
            className='w-full absolute flex flex-col items-center'>
            <div className='text-[1.2rem] leading-[1.2rem]'>{score}</div>
            <img
              src={TRACK_CARS[track]}
              width={isMe ? '25px' : '20px'}
            />
          </div>
        </div>
        <div
          className={`w-full absolute bottom-0 text-center h-[2rem] leading-8 border-t border-gray-300 pt-[0.1rem]  ${isMe ? 'font-bold text-[1.4rem] text-green-100' : 'text-[1.2rem] text-gray-200'}`}>
          {nickname}
        </div>
      </div>
    </>
  );
};

export default WordRankTrack;
