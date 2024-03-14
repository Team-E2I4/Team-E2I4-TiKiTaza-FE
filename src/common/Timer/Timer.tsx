import useTimer from '@/hooks/useTimer';

const Timer = () => {
  const { timeLeft } = useTimer({
    minutes: 0,
    seconds: 10,
    onTimeFinish: () => {
      alert('시간이 종료되었습니다.');
    },
  });

  return (
    <div>
      <span className='font-bold font-[Giants-Inline] text-[3.2rem]'>
        남은 시간 : {timeLeft}
      </span>
    </div>
  );
};

export default Timer;
