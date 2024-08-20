import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError
} from '@remix-run/react';
import './tailwind.css';
import Sidebar from './UI/Sidebar';
import MainNav from './UI/MainNav';
import { LuComputer } from 'react-icons/lu';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="grid-row-[auto_1fr] grid h-screen grid-cols-[auto_1fr]">
          <header className="col-start-2 row-start-1 flex h-20 bg-indigo-800 shadow-md">
            <div className="flex w-96 items-center p-4">
              <h1 className="text-4xl text-amber-400">Avid Assistant</h1>
            </div>
          </header>
          <aside className="row-span-2 flex w-56 flex-col gap-4 bg-indigo-800 py-4 pl-4 pr-2 shadow-lg">
            <LuComputer className="size-24 self-center text-amber-400" />
            <MainNav />
          </aside>
          <main className="col-start-2 row-start-2 p-16">{children}</main>
          <ScrollRestoration />
          <Scripts />
        </div>
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-Montserrat">
        <header className="flex h-20 bg-indigo-800 shadow-md">
          <div className="flex w-96 items-center p-4">
            <h1 className="text-6xl text-amber-500">Avid Assistant</h1>
          </div>
        </header>
        <main>
          <aside className="flex flex-col gap-5 border-r-[1px] bg-indigo-800"></aside>
          <h1>An error occurred</h1>
          <p>{error.message}</p>
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function links() {
  return [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap'
    }
  ];
}
