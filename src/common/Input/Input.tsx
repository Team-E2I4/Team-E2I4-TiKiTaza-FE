import { ForwardedRef, forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  whSize?: string;
}
const Input = forwardRef(
  (
    { whSize = `w-[70rem] h-[4.5rem]`, ...props }: InputProps,
    ref?: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <>
        <input
          ref={ref}
          {...props}
          className={`${whSize} flex items-center pl-[1.75rem] rounded-2xl
bg-white border-2 border-green-100 my-4
outline-0 text-gray-300 tracking-wider box-border`}
        />
      </>
    );
  }
);

Input.displayName = 'InputComponent';
export default Input;
