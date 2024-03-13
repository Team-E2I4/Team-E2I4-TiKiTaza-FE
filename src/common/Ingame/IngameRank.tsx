import { TRACK_CARS } from '@/assets/canvasCars';
import { I_RankInfoList } from '@/pages/GamePage/GameSentence/GameSentence';

const IngameRank = ({ rankInfos }: { rankInfos: I_RankInfoList[] }) => {
  return (
    <>
      {rankInfos.map((rankInfo, i) => {
        return (
          <div
            key={i}
            className={`pl-4 flex bg-gradient-to-r items-center gap-4 mb-1 ${rankInfo.isMe ? 'from-green-100 h-[5rem] w-[30rem]' : 'from-gray-200 h-[4rem] w-[20rem]'}`}>
            <div className={rankInfo.isMe ? 'text-[3rem]' : 'text-[2.5rem]'}>
              {i + 1}
            </div>
            <div className='text-[2rem]'>
              <img
                src={TRACK_CARS[i]}
                width={rankInfo.isMe ? '25px' : '20px'}
              />
            </div>
            <div
              className={`truncate ${rankInfo.isMe ? 'text-[2rem]' : 'text-[1.8rem]'}`}>
              {rankInfo.nickname}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default IngameRank;
