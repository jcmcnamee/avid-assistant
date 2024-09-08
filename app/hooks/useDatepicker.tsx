import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useReducer
} from 'react';

type DatePickerState = {
  numDays: number;
  intervalMinutes: number;
  columnHourStart: number;
  columnHourEnd: number;
};

type DatePickerContextValue = DatePickerState & {
  setNumDays: (days: number) => void;
  setInterval: (interval: number) => void;
  setStartHour: (hour: number) => void;
  setEndHour: (hour: number) => void;
};

type Action =
  | { type: 'SET_DAYS'; payload: number }
  | { type: 'SET_INTERVAL'; payload: number }
  | { type: 'SET_DAY_START'; payload: number }
  | { type: 'SET_DAY_END'; payload: number };

const initialState: DatePickerState = {
  numDays: 5,
  intervalMinutes: 15,
  columnHourStart: 8,
  columnHourEnd: 20
};

const DatePickerContext = createContext<DatePickerContextValue | undefined>(
  undefined
);

function reducer(state: DatePickerState, action: Action): DatePickerState {
  switch (action.type) {
    case 'SET_DAYS':
      return {
        ...state,
        numDays: action.payload
      };
    case 'SET_INTERVAL':
      return {
        ...state,
        intervalMinutes: action.payload
      };
    case 'SET_DAY_START':
      return {
        ...state,
        columnHourStart: action.payload
      };
    case 'SET_DAY_END':
      return {
        ...state,
        columnHourEnd: action.payload
      };
  }
}

export default function DatePickerProvider({
  children
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Ensure value only changes when state changes to prevent consuming component re-renders.
  const ctx = useMemo<DatePickerContextValue>(
    () => ({
      ...state,
      setNumDays: (days: number) =>
        dispatch({ type: 'SET_DAYS', payload: days }),
      setInterval: (interval: number) =>
        dispatch({ type: 'SET_INTERVAL', payload: interval }),
      setStartHour: (hour: number) =>
        dispatch({ type: 'SET_DAY_START', payload: hour }),
      setEndHour: (hour: number) =>
        dispatch({ type: 'SET_DAY_END', payload: hour })
    }),
    [state]
  );

  return (
    <DatePickerContext.Provider value={ctx}>
      {children}
    </DatePickerContext.Provider>
  );
}

export function useDatePicker(): DatePickerContextValue {
  const context = useContext(DatePickerContext);

  if (context === undefined) {
    throw new Error('useDatePicker must be used within a DatePickerProvider');
  }

  return context;
}
