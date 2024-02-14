// TODO: 서버로부터 받는 데이터 구조에 따라 props가 바뀌어야 할 것 같습니다.
interface IEachRankInfo {
  isMe: boolean;
  rank?: number; // 인덱스가 순위 정보이지 않을까?
  name: string;
}
interface IngameRankProps {
  rankInfos?: IEachRankInfo[];
}

const rankInfosDummy = [
  {
    isMe: false,
    name: '유저11',
  },
  {
    isMe: true,
    name: '나야나',
  },
  {
    isMe: false,
    name: '유저222',
  },
  {
    isMe: false,
    name: '유저3',
  },
  {
    isMe: false,
    name: '유저44444444444444444',
  },
  {
    isMe: false,
    name: '유저5',
  },
  {
    isMe: false,
    name: '유저6',
  },
  {
    isMe: false,
    name: '유저777777_7_&',
  },
];
const IngameRank = ({ rankInfos = rankInfosDummy }: IngameRankProps) => {
  return (
    <>
      {rankInfos.map((rankInfo, i) => {
        return (
          <div
            key={i}
            className={`pl-4 flex bg-gradient-to-r items-center gap-4 mb-1 ${rankInfo.isMe ? 'from-green-100 h-[5rem] w-[30rem]' : 'from-gray-200 h-[4rem] w-[20rem]'}`}>
            <div className={rankInfo.isMe ? 'text-5xl' : 'text-4xl'}>
              {rankInfo.rank}
            </div>
            <div className={rankInfo.isMe ? 'text-3xl' : 'text-2xl'}>🚗</div>
            <div
              className={`truncate ${rankInfo.isMe ? 'text-3xl' : 'text-2xl'}`}>
              {rankInfo.name}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default IngameRank;
