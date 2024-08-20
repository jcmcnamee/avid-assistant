import { InputHTMLAttributes } from 'react';

export default function Input({
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="h-8 w-[100%] rounded-md border-2 border-solid p-2"
      {...props}
    />
  );
}
