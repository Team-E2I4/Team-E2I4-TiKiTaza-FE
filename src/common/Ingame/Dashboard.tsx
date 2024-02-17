import needle from '@/asssets/ingame/needle.png';

interface DashboardProps {
  type: 'wpm' | 'accuracy';
  value: number;
}
const Dashboard = ({ type, value }: DashboardProps) => {
  const ratioStyle = new Map([
    ['wpm', `${value > 800 ? '225deg' : `${Math.floor(value / 8) + 45}deg`}`],
    ['accuracy', `${value > 100 ? '225deg' : `${value * 1.8 + 45}deg`}`],
  ]);

  return (
    <>
      <div>
        <div className='w-[24rem] h-[12rem] rounded-[12rem_12rem_0_0] border-x-[2rem] border-t-[2rem] border-green-100 box-border'>
          <img
            src={needle}
            className={`w-[6rem] relative top-[8rem] left-[5rem] origin-[80%_15%]`}
            style={{
              rotate: ratioStyle.get(type),
            }}
          />
        </div>
        <div className='flex justify-evenly mt-4'>
          <div>{type === 'wpm' ? '타수' : '정확도'}</div>
          <div>
            {value}
            {type === 'wpm' ? '타' : '%'}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
