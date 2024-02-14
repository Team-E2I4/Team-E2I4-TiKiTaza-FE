// TODO: 서버로부터 받는 데이터 구조에 따라 props가 바뀌어야 할 것 같습니다.
interface IngameRankProps {
  isMe: boolean;
  rank: number;
  name: string;
}

const IngameRank = ({ isMe, rank, name }: IngameRankProps) => {
  return (
    <>
      <div
        className={`pl-4 flex bg-gradient-to-r items-center gap-4 mb-1 ${isMe ? 'from-green-100 h-[5rem] w-[30rem]' : 'from-gray-200 h-[4rem] w-[20rem]'}`}>
        <div className={isMe ? 'text-5xl' : 'text-4xl'}>{rank}</div>
        <div className={isMe ? 'text-3xl' : 'text-2xl'}>🚗</div>
        <div className={`truncate ${isMe ? 'text-3xl' : 'text-2xl'}`}>
          {name}
        </div>
      </div>
    </>
  );
};
const IngameRankContainer = () => {
  return (
    <>
      <IngameRank
        isMe={false}
        rank={2}
        name='다른유저이른이길러러러러러직며ㅕㅁㄴ?ㄴ'
      />
      <IngameRank
        isMe={true}
        rank={3}
        name='나야나'
      />
      <IngameRank
        isMe={false}
        rank={3}
        name='asdf'
      />
      <IngameRank
        isMe={false}
        rank={3}
        name='31231312'
      />
      <IngameRank
        isMe={false}
        rank={3}
        name='12313'
      />
      <IngameRank
        isMe={false}
        rank={3}
        name='나323232야나'
      />
      <IngameRank
        isMe={false}
        rank={3}
        name='asfsd'
      />
      <IngameRank
        isMe={false}
        rank={3}
        name='sdf'
      />
    </>
  );
};
export default IngameRankContainer;
