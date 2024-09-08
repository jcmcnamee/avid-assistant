import { useTimeDifference } from '~/hooks/useTimeDifference';
import { DateRange } from '~/UI/DatePicker/DateRange';

type StatusIndicatorProps = {
  booking?: DateRange;
};

export default function StatusIndicator({ booking }: StatusIndicatorProps) {

  const timeDifference = useTimeDifference(booking?.end)
  
  if (timeDifference === "Available now") {
    return <span className="rounded-full bg-green-400 px-4 mb-2 shadow-md">Available</span>;
  }
  if (booking) {
    return <span className="rounded-full bg-red-400 px-4 mb-2 shadow-md">{timeDifference}...</span>;
  }
}
