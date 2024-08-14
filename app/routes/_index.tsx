import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Avid Assistant' },
    { name: 'Assistant app', content: 'Welcome to Avid Assistant' }
  ];
};

export default function Index() {
  return (
    <>
      <h1>Hello world</h1>
      <Link to="/machines">Go here</Link>
    </>
  );
}
