import { ReactNode } from 'react';

interface GameModeInfoProps {
  children: ReactNode;
}

const GameModeInfo = ({ children }: GameModeInfoProps) => {
  return (
    <div className='w-[61.3rem] h-[15rem] flex bg-beige-100 shadow-md shadow-black/50 rounded-[2.5rem]'>
      <p className='w-[80%] my-[2.5rem] ml-[2rem] overflow-y-scroll text-center'>
        게임 모드 설명이 매우 길어 진다면 어떻게 될까요. 궁금해집니다. 한번
        알아볼까요? 한번 알아볼까요???
        <br /> 한번 알아볼까요
        <br /> 한번 알아볼까요
      </p>
      {children}
    </div>
  );
};

export default GameModeInfo;
