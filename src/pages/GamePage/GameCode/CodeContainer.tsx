import Highlight from 'react-highlight';

interface CodeContainerProps {
  dummyCode: string;
}

const CodeContainer = ({ dummyCode }: CodeContainerProps) => {
  return (
    <>
      <div className='w-[60rem] select-none'>
        <Highlight className='javascript'>{dummyCode}</Highlight>
      </div>
    </>
  );
};

export default CodeContainer;
