import { Fragment, useRef } from 'react';
import Divider from '@/common/Divider/Divider';
import { GameScoreType, I_AllMember } from '../types/websocketType';
import WordRankTrack from './WordRankTrack';

export type WordQuestionType = { [key: string]: number };

const WordRankContainer = ({
  gameScore,
  userId,
}: {
  gameScore: GameScoreType | I_AllMember[];
  userId: number;
}) => {
  function isTypeAllMembers(
    gameScore: GameScoreType | I_AllMember[]
  ): gameScore is I_AllMember[] {
    return gameScore.length > 0;
  }
  const trackList = useRef<{ [key: string]: number }>();
  if (isTypeAllMembers(gameScore)) {
    // I_AllMember[] 인 경우 정제하여 GameScoreType 형태의 값으로 만든 후 렌더하도록합니다
    const scoreFromMembers: { [key: string]: number } = {};
    for (const member of gameScore) {
      scoreFromMembers[member.memberId.toString()] = 0;
    }
    trackList.current = scoreFromMembers;
  }
  const rankData = trackList.current || gameScore;

  return (
    <>
      {Object.entries(rankData).map(([memberId, score], i) => {
        return (
          <Fragment key={i}>
            <div className={'h-[24rem] flex justify-between'}>
              {i === 0 ? (
                <Divider
                  orientation='vertical'
                  className='border-r-[.2rem]'
                />
              ) : (
                <Divider
                  orientation='vertical'
                  className='border-dashed border-r-[.2rem]'
                />
              )}
              <WordRankTrack
                key={i}
                track={i}
                isMe={userId === Number(memberId)}
                score={score}
              />
              {i === Object.entries(gameScore).length - 1 && (
                <Divider
                  orientation='vertical'
                  className='border-r-[.2rem]'
                />
              )}
            </div>
          </Fragment>
        );
      })}
    </>
  );
};

export default WordRankContainer;
