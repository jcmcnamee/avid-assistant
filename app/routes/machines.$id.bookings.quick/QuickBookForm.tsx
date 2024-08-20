import { useNavigate } from '@remix-run/react';
import Button from '~/UI/Button';
import Modal from '~/UI/Modal';

export default function QuickBookForm() {
  const navigate = useNavigate();

  function handleClose() {
    navigate('..');
  }

  return (
    <Modal onClose={handleClose}>
      <div className="mb-4 border-b-[1px] border-slate-400">
        <h1 className="text-lg font-bold">Quick book</h1>
      </div>
      <form>
        <label htmlFor="length">Book for:</label>
        <br />
        <select id="length" name="length" className="mb-2 rounded-lg p-2">
          <option value="30"> 00:30</option>
          <option value="60">01:00</option>
          <option value="90">01:30</option>
          <option value="120">02:00</option>
        </select>
        <br />
        <Button category="primary">Confirm</Button>
      </form>
    </Modal>
  );
}
