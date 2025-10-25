import { addYears, isBefore, startOfToday, addDays, endOfDay, startOfDay, isWithinInterval } from "date-fns";

/**
 * Rolls a date forward to next year if it's in the past
 */
export const rollDateToFuture = (dateString: string): string => {
  const eventDate = new Date(dateString);
  const today = startOfToday();
  
  if (isBefore(eventDate, today)) {
    const rolledDate = addYears(eventDate, 1);
    return rolledDate.toISOString().split('T')[0];
  }
  
  return dateString;
};

/**
 * Get quick date range presets
 */
export const getQuickDateRanges = () => {
  const today = startOfToday();
  
  return {
    today: { from: today, to: endOfDay(today), label: "Today" },
    thisWeekend: { 
      from: startOfDay(addDays(today, (6 - today.getDay()) % 7)), 
      to: endOfDay(addDays(today, (7 - today.getDay()) % 7)),
      label: "This Weekend"
    },
    next7Days: { 
      from: today, 
      to: endOfDay(addDays(today, 7)),
      label: "Next 7 Days"
    },
    next30Days: { 
      from: today, 
      to: endOfDay(addDays(today, 30)),
      label: "Next 30 Days"
    },
  };
};

/**
 * Check if event date is after a specific date
 */
export const isEventAfterDate = (eventDate: string, afterDate: Date): boolean => {
  const event = new Date(eventDate);
  return event >= startOfDay(afterDate);
};

/**
 * Check if event date is within a date range
 */
export const isEventInDateRange = (eventDate: string, from: Date, to: Date): boolean => {
  const event = new Date(eventDate);
  return isWithinInterval(event, { start: startOfDay(from), end: endOfDay(to) });
};
