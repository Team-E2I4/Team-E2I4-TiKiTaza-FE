import { ForwardedRef, forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  whSize?: string;
  isError: boolean;
}
const Input = forwardRef(
  (
    { isError, className, ...props }: InputProps,
    ref?: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <>
        <input
          ref={ref}
          className={`w-[70rem] h-[4.5rem] flex items-center pl-[1.75rem] rounded-2xl
bg-white border-2 ${isError ? 'border-red-500' : 'border-green-100'} my-4
outline-0 text-gray-300 tracking-wider box-border ${className}`}
          {...props}
        />
      </>
    );
  }
);

Input.displayName = 'InputComponent';
export default Input;
