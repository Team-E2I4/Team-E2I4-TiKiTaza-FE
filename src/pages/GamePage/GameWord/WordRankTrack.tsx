import { TRACK_CARS } from '@/assets/canvasCars';

interface WordRankProps {
  track: number;
  score: number;
  isMe: boolean;
}

const WordRankTrack = (data: WordRankProps) => {
  const { track, score, isMe } = data;
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
          className={`w-full absolute bottom-0 text-center truncate h-[2rem] leading-8 border-t border-gray-300 pt-[0.1rem] ${isMe ? 'text-[1.8rem] text-green-100' : 'text-[1.4rem] text-gray-200'}`}>
          {track}
        </div>
      </div>
    </>
  );
};

export default WordRankTrack;
