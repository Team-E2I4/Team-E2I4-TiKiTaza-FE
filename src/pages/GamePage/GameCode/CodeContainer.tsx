import Highlight from 'react-highlight';

interface CodeContainerProps {
  codeItem: string;
}

const CodeContainer = ({ codeItem }: CodeContainerProps) => {
  return (
    <>
      <div className='w-[60rem] select-none grow'>
        <Highlight className='javascript'>{codeItem}</Highlight>
      </div>
    </>
  );
};

export default CodeContainer;
