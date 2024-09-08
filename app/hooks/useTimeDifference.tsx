import { formatDistanceToNow } from 'date-fns';
import { useEffect, useState } from 'react';

export function useTimeDifference(endDate?: Date) {
  const [timeDifference, setTimeDifference] = useState('');
  if (!endDate) {
    endDate = new Date();
  }

  useEffect(() => {
    const updateTimeDifference = () => {
      const now = new Date();
      if (now >= endDate) {
        setTimeDifference('Available now');
      } else {
        setTimeDifference(formatDistanceToNow(endDate, { addSuffix: true }));
      }
    };

    // Update immediately
    updateTimeDifference();

    // Set up an interval to update every minute
    const intervalId = setInterval(updateTimeDifference, 60000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [endDate]);

  return timeDifference;
}
