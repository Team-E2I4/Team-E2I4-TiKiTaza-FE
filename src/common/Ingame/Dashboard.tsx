import './dashborad.css';
import needle from '@/asssets/ingame/needle.png';

interface DashboardProps {
  type: 'wpm' | 'accuracy';
  value: number;
}
const Dashboard = ({ type, value }: DashboardProps) => {
  const ratioStyle = new Map([
    [
      'wpm',
      `${value > 1000 ? '225deg' : `${Math.floor((value * 180) / 1000) + 45}deg`}`,
    ],
    ['accuracy', `${value > 100 ? '225deg' : `${value * 1.8 + 45}deg`}`],
  ]);

  return (
    <>
      <div>
        <div className='w-[24rem] h-[12rem] p-8 box-border rounded-[12rem_12rem_0_0] dashboardStyle'>
          {/* <div className='w-[24rem] h-[12rem] p-8 bg-gradient-radial bg-origin-content'> */}
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
