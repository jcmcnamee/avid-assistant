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
      <div className="mb-6 border-b-[1px] border-slate-400">
        <h1 className="text-lg font-medium">Quick book</h1>
      </div>
      <form className="grid-col-2 grid items-baseline gap-x-4">
        <label htmlFor="length" className="mb-1">
          Book for:
        </label>
        <select
          id="length"
          name="length"
          className="col-start-2 mb-2 rounded-lg p-2"
        >
          <option value="30">30 min</option>
          <option value="60">60 min</option>
          <option value="90">90 min</option>
          <option value="120">120 min</option>
        </select>
        <label htmlFor="job-type" className="mb-1">
          Type:
        </label>
        <select id="job-type" name="job-type" className="mb-2 rounded-lg p-2">
          <option value="ingest">Ingest</option>
          <option value="export">Export</option>
          <option value="general">Other</option>
        </select>
        <div className="col-span-2 mt-4 justify-self-center">
          <Button category="primary">Confirm</Button>
        </div>
      </form>
    </Modal>
  );
}
