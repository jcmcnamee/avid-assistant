import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = {
  category: 'primary' | 'secondary';
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ category, children, ...props }: ButtonProps) {
  if (category === 'primary')
    return (
      <button className="bg-amber-400" {...props}>
        {children}
      </button>
    );

  if (category === 'secondary')
    return (
      <button
        className="rounded-full bg-indigo-200 hover:bg-indigo-500 px-2 font-bold"
        {...props}
      >
        {children}
      </button>
    );
}
