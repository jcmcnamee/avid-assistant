import { useNavigate } from '@remix-run/react';
import Modal from '~/UI/Modal';

export default function BookingForm() {
  const navigate = useNavigate();

  function handleClose() {
    navigate('..');
  }

  return (
    <Modal onClose={handleClose}>
      <div className="mb-4 border-b-[1px] border-slate-400">
        <h1 className="text-lg font-medium">Book machine</h1>
      </div>
    </Modal>
  );
}
