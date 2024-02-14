export const SentenceNow = ({ text }: { text: string }) => {
  return (
    <>
      <div className='w-[70rem] h-[4.5rem] flex items-center pl-8 rounded-2xl bg-green-100 tracking-wider'>
        {text}
      </div>
    </>
  );
};
export const SentenceNext = ({ text }: { text: string }) => {
  return (
    <>
      <div className='w-[60rem] h-[4.5rem] flex items-center pl-8 rounded-2xl bg-gray-10 my-1 text-gray-200 tracking-wider'>
        {text}
      </div>
    </>
  );
};
