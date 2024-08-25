import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = {
  category: 'primary' | 'secondary';
  children: ReactNode;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  category,
  children,
  iconLeft,
  iconRight,
  ...props
}: ButtonProps) {
  if (category === 'primary')
    return (
      <button
        className="rounded-full bg-amber-400 px-4 py-2 font-semibold shadow-sm transition-colors duration-300 hover:bg-amber-500 focus:outline-amber-500"
        {...props}
      >
        <div className="flex items-center gap-1">
          {iconLeft && iconLeft}
          {children}
          {iconRight && iconRight}
        </div>
      </button>
    );

  if (category === 'secondary')
    return (
      <button
        className="rounded-full bg-indigo-200 px-4 py-2 font-medium shadow-sm transition-colors duration-300 hover:bg-indigo-400 focus:border-4 focus:outline-indigo-500"
        {...props}
      >
        <div className="flex items-center gap-1">
          {iconLeft && iconLeft}
          {children}
          {iconRight && iconRight}
        </div>
      </button>
    );
}
