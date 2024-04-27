import React from 'react';
import Highlight from 'react-highlight';

interface CodeContainerProps {
  codeItem: string;
}

// eslint-disable-next-line react-refresh/only-export-components
const CodeContainer = ({ codeItem }: CodeContainerProps) => {
  return (
    <>
      <div className='w-[60rem] select-none grow'>
        <Highlight className={'javascript' || 'java'}>{codeItem}</Highlight>
      </div>
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(CodeContainer);
