import { Fragment } from 'react';
import Divider from '@/common/Divider/Divider';
import { I_AllMember } from '../types/websocketType';
import WordRankTrack from './WordRankTrack';

const WordRankContainer = ({
  allMembers,
  userId,
}: {
  allMembers: I_AllMember[];
  userId: number;
}) => {
  return (
    <>
      {allMembers.map((member, i) => {
        const { memberId, score } = member;
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
              {i === allMembers.length - 1 && (
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
