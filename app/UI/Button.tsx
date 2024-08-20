import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = {
  category: 'primary' | 'secondary';
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ category, children, ...props }: ButtonProps) {
  if (category === 'primary')
    return (
      <button
        className="rounded-full bg-amber-400 px-4 py-2 font-semibold shadow-sm transition-colors duration-300 hover:bg-amber-500"
        {...props}
      >
        {children}
      </button>
    );

  if (category === 'secondary')
    return (
      <button
        className="rounded-full bg-indigo-200 px-4 py-2 font-medium shadow-sm transition-colors duration-300 hover:bg-indigo-400"
        {...props}
      >
        {children}
      </button>
    );
}
