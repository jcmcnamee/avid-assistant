import { useOutletContext } from '@remix-run/react';
import QuickBookForm from './QuickBookForm';

export default function MachineQuickBookForm() {
  const context = useOutletContext();
  
  return <QuickBookForm />;
}
