// TODO: 서버로부터 받는 데이터 구조에 따라 props가 바뀌어야 할 것 같습니다.
interface IngameRankProps {
  isMe: boolean;
  rank: number;
  name: string;
}
const rankOther = {
  bgColor: 'gray-200',
  width: '20rem',
  height: '4rem',
};
const rankMe = {
  bgColor: 'green-100',
  width: '30rem',
  height: '5rem',
};
const IngameRank = ({ isMe, rank, name }: IngameRankProps) => {
  const rankOption = isMe ? rankMe : rankOther;
  return (
    <>
      <div
        className={`pl-4 flex bg-gradient-to-r from-${rankOption.bgColor} w-[${rankOption.width}] h-[${rankOption.height}] items-center gap-4`}>
        <div className={isMe ? 'text-5xl' : 'text-4xl'}>{rank}</div>
        <div>🚗</div>
        <div className={isMe ? 'text-3xl' : 'text-2xl'}>{name}</div>
      </div>
    </>
  );
};
export default IngameRank;
