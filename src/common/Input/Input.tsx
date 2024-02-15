interface InputProps {
  style?: string;
}
const Input = ({ style = `w-[70rem] h-[4.5rem]` }: InputProps) => {
  return (
    <>
      <input
        className={`${style} flex items-center pl-[1.75rem] rounded-2xl
bg-white border-2 border-green-100 my-4
outline-0 text-gray-300 tracking-wider box-border`}
      />
    </>
  );
};
export default Input;
