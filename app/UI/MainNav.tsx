import { NavLink } from '@remix-run/react';
import { LuBook, LuCog, LuComputer } from 'react-icons/lu';
import MainNavLink from './MainNavLink';

export default function MainNav() {
  return (
    <nav>
      <ul className="flex flex-col gap-1">
        <li>
          <MainNavLink to="/machines">
            <LuComputer className="size-8" />
            Machines
          </MainNavLink>
        </li>
        <li>
          <MainNavLink to="/bookings">
            <LuBook className="size-8" />
            Bookings
          </MainNavLink>
        </li>
        <li>
          <MainNavLink to="/settings">
            <LuCog className="size-8" />
            Settings
          </MainNavLink>
        </li>
      </ul>
    </nav>
  );
}
