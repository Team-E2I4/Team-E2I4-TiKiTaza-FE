import { I_RankInfoList } from '@/pages/GamePage/GameSentence/GameSentence';

const IngameRank = ({ rankInfos }: { rankInfos: I_RankInfoList[] }) => {
  return (
    <>
      {rankInfos.map((rankInfo, i) => {
        return (
          <div
            key={i}
            className={`pl-4 flex bg-gradient-to-r items-center gap-4 mb-1 ${rankInfo.isMe ? 'from-green-100 h-[5rem] w-[30rem]' : 'from-gray-200 h-[4rem] w-[20rem]'}`}>
            <div className={rankInfo.isMe ? 'text-[5rem]' : 'text-[4rem]'}>
              {i + 1}
            </div>
            <div className={rankInfo.isMe ? 'text-[3rem]' : 'text-[2rem]'}>
              🚗
            </div>
            <div
              className={`truncate ${rankInfo.isMe ? 'text-[3rem]' : 'text-[2rem]'}`}>
              {rankInfo.nickname}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default IngameRank;
