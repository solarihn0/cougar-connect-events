import { describe, it, expect } from 'vitest';
import {
  rollDateToFuture,
  getQuickDateRanges,
  isEventAfterDate,
  isEventInDateRange,
} from '../dateHelpers';

/**
 * TDD Example 3: Date Utility Testing
 * 
 * Testing Strategy:
 * - Test date manipulation functions
 * - Verify date range filtering logic
 * - Edge cases for past/future dates
 */

describe('Date Helpers', () => {
  describe('rollDateToFuture', () => {
    it('should keep future dates unchanged', () => {
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1);
      const dateString = futureDate.toISOString().split('T')[0];

      const result = rollDateToFuture(dateString);
      expect(result).toBe(dateString);
    });

    it('should roll past dates to next year', () => {
      const pastDate = '2023-06-15';
      const result = rollDateToFuture(pastDate);
      
      const resultDate = new Date(result);
      const today = new Date();
      
      expect(resultDate.getTime()).toBeGreaterThan(today.getTime());
    });

    it('should preserve month and day when rolling forward', () => {
      const pastDate = '2023-12-25';
      const result = rollDateToFuture(pastDate);
      
      const resultDate = new Date(result);
      expect(resultDate.getMonth()).toBe(11); // December
      expect(resultDate.getDate()).toBe(25);
    });
  });

  describe('getQuickDateRanges', () => {
    it('should return date ranges for quick picks', () => {
      const ranges = getQuickDateRanges();
      
      expect(ranges).toHaveProperty('today');
      expect(ranges).toHaveProperty('thisWeekend');
      expect(ranges).toHaveProperty('next7Days');
      expect(ranges).toHaveProperty('next30Days');
    });

    it('should have from date before to date', () => {
      const ranges = getQuickDateRanges();
      
      Object.values(ranges).forEach(range => {
        expect(range.from.getTime()).toBeLessThanOrEqual(range.to.getTime());
      });
    });

    it('should include today in today range', () => {
      const ranges = getQuickDateRanges();
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      
      expect(ranges.today.from.getTime()).toBe(todayStart.getTime());
    });
  });

  describe('isEventAfterDate', () => {
    it('should return true for events after the given date', () => {
      const eventDate = '2025-12-31';
      const compareDate = new Date('2025-01-01');
      
      expect(isEventAfterDate(eventDate, compareDate)).toBe(true);
    });

    it('should return false for events before the given date', () => {
      const eventDate = '2025-01-01';
      const compareDate = new Date('2025-12-31');
      
      expect(isEventAfterDate(eventDate, compareDate)).toBe(false);
    });

    it('should return true for events on the same date', () => {
      const eventDate = '2025-06-15';
      const compareDate = new Date('2025-06-15');
      
      expect(isEventAfterDate(eventDate, compareDate)).toBe(true);
    });
  });

  describe('isEventInDateRange', () => {
    it('should return true for events within range', () => {
      const eventDate = '2025-06-15';
      const startDate = new Date('2025-06-01');
      const endDate = new Date('2025-06-30');
      
      expect(isEventInDateRange(eventDate, startDate, endDate)).toBe(true);
    });

    it('should return true for events on start date', () => {
      const eventDate = '2025-06-01';
      const startDate = new Date('2025-06-01');
      const endDate = new Date('2025-06-30');
      
      expect(isEventInDateRange(eventDate, startDate, endDate)).toBe(true);
    });

    it('should return true for events on end date', () => {
      const eventDate = '2025-06-30';
      const startDate = new Date('2025-06-01');
      const endDate = new Date('2025-06-30');
      
      expect(isEventInDateRange(eventDate, startDate, endDate)).toBe(true);
    });

    it('should return false for events before range', () => {
      const eventDate = '2025-05-31';
      const startDate = new Date('2025-06-01');
      const endDate = new Date('2025-06-30');
      
      expect(isEventInDateRange(eventDate, startDate, endDate)).toBe(false);
    });

    it('should return false for events after range', () => {
      const eventDate = '2025-07-01';
      const startDate = new Date('2025-06-01');
      const endDate = new Date('2025-06-30');
      
      expect(isEventInDateRange(eventDate, startDate, endDate)).toBe(false);
    });
  });
});
