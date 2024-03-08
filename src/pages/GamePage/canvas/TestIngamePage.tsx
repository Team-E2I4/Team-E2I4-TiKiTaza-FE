/* eslint-disable no-console */
import { useState } from 'react';
import IngameHeader from '@/common/Ingame/IngameHeader';
import IngameRank from '@/common/Ingame/IngameRank';
import { GameScoreType } from '../types/websocketType';
import CanvasTrack from './CanvasTrack';
import { responseDummy, responseDummy2 } from './testDummy';

const GameSentence = () => {
  const [data, setData] = useState(responseDummy);
  console.log('GameSentence 에서 data : ', data.gameScore);
  setTimeout(() => {
    setData(responseDummy2);
    console.log('------DATA변경됨! : ', data.gameScore);
  }, 3000);

  return (
    <>
      <IngameHeader />
      <div>
        <div className='absolute'>
          <IngameRank />
        </div>
        <div className='flex flex-col items-center justify-center ml-80 h-[61rem] relative w-[110rem]'>
          <div className='absolute w-[110rem] h-full rounded-[10rem] border-2 border-black'></div>
          <div className='absolute w-[100rem] h-[calc(100%-10rem)] rounded-[5rem] border-2 border-black '></div>
          <CanvasTrack
            gameScore={data.gameScore as GameScoreType}
            messageType='INFO'
            // messageType='NEXT_ROUND_START'
          />
          <div className='flex flex-col items-center justify-center z-10 h-[51rem] bg-slate-400 mt-[5rem]'>
            {/* <SentenceNow text={sentenceDummy[idx]} />
            <GameForm
              inputName='sentence'
              sample='gd'
              cpm={cpm}
              accurate={accurate}
              onInputChange={onInputChange}
            />
            <SentenceNext text={sentenceDummy[idx + 1]} />
            <SentenceNext text={sentenceDummy[idx + 2]} /> */}
          </div>
          <div className='w-full flex justify-evenly mt-20'>
            {/* <Dashboard
              type='wpm'
              value={wpmTest}
            />
            <Dashboard
              type='accuracy'
              value={accTest}
            /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default GameSentence;
