/* eslint-disable no-console */
import IngameHeader from '@/common/Ingame/IngameHeader';
import IngameRank from '@/common/Ingame/IngameRank';
import { GameScoreType } from '../types/websocketType';
import CanvasTrack from './CanvasTrack';
import { responseDummy } from './testDummy';

const GameSentence = () => {
  return (
    <>
      <IngameHeader />
      <div>
        <div className='absolute'>
          <IngameRank />
        </div>
        <div className='flex flex-col items-center justify-center ml-80 h-[61rem] relative'>
          <div className='absolute w-[110rem] h-full rounded-[10rem] border-2 border-black'></div>
          <div className='absolute w-[100rem] h-[calc(100%-10rem)] rounded-[5rem] border-2 border-black '></div>
          <CanvasTrack gameScore={responseDummy.gameScore as GameScoreType} />
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
