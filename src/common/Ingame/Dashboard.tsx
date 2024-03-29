import './dashborad.css';
import needle from '@/assets/ingame/needle.webp';

interface DashboardProps {
  type: 'cpm' | 'accuracy';
  value: number;
}
const dashboardUnit = {
  cpm: {
    label: '타수',
    unit: '타',
  },
  accuracy: {
    label: '정확도',
    unit: '%',
  },
};

const Dashboard = ({ type, value }: DashboardProps) => {
  const ratioStyle = new Map([
    [
      'cpm',
      `${value > 1000 ? '225deg' : `${Math.floor((value * 180) / 1000) + 45}deg`}`,
    ],
    ['accuracy', `${value > 100 ? '225deg' : `${value * 1.8 + 45}deg`}`],
  ]);

  return (
    <>
      <div>
        <div className='p-8 box-border rounded-[12rem_12rem_0_0] dashboardStyle'>
          <img
            src={needle}
            alt='계기판'
            className={`w-[5rem] relative top-[7rem] left-[4rem] origin-[80%_15%]`}
            style={{
              rotate: ratioStyle.get(type),
            }}
          />
        </div>
        <div className='flex justify-evenly mt-4 font-[Giants-Inline]'>
          <div>{dashboardUnit[type].label}</div>
          <div>
            {value}
            {dashboardUnit[type].unit}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
