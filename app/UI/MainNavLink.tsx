import { NavLink } from '@remix-run/react';
import { ReactNode } from 'react';

type MainNavLinkProps = {
  to: string;
  children: ReactNode;
};

export default function MainNavLink({ to, children }: MainNavLinkProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-5 rounded-md border-indigo-400 px-1 py-1 font-bold transition-all duration-500 ${isActive ? 'border-4 bg-indigo-300' : 'text-indigo-400 [&>svg]:text-indigo-400 [&>svg]:transition-colors [&>svg]:duration-500 [&>svg]:hover:text-amber-400'}`
      }
    >
      {children}
    </NavLink>
  );
}
