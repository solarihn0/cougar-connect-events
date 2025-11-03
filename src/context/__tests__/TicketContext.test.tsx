import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { TicketProvider, useTickets, Ticket } from '../TicketContext';
import { ReactNode } from 'react';

/**
 * TDD Example 5: Context/Hook Testing
 * 
 * Testing Strategy:
 * - Test context provider and consumer
 * - Verify state management operations
 * - Test localStorage persistence
 */

const wrapper = ({ children }: { children: ReactNode }) => (
  <TicketProvider>{children}</TicketProvider>
);

describe('TicketContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('addTickets', () => {
    it('should add tickets to the context', () => {
      const { result } = renderHook(() => useTickets(), { wrapper });

      const newTickets: Ticket[] = [
        {
          id: '1',
          eventId: 'event1',
          eventTitle: 'Basketball Game',
          eventCategory: 'Big Arena',
          date: '2025-12-01',
          time: '19:00',
          location: 'TD Arena',
          section: '205',
          row: 'F',
          seat: '12',
          price: 52,
          qrCode: 'QR123',
          purchaseDate: '2025-11-01',
          status: 'purchased',
        },
      ];

      act(() => {
        result.current.addTickets(newTickets);
      });

      expect(result.current.tickets).toHaveLength(1);
      expect(result.current.tickets[0]).toEqual(newTickets[0]);
    });

    it('should add multiple tickets at once', () => {
      const { result } = renderHook(() => useTickets(), { wrapper });

      const newTickets: Ticket[] = [
        {
          id: '1',
          eventId: 'event1',
          eventTitle: 'Basketball Game',
          eventCategory: 'Big Arena',
          date: '2025-12-01',
          time: '19:00',
          location: 'TD Arena',
          section: '205',
          row: 'F',
          seat: '12',
          price: 52,
          qrCode: 'QR123',
          purchaseDate: '2025-11-01',
          status: 'purchased',
        },
        {
          id: '2',
          eventId: 'event2',
          eventTitle: 'Concert',
          eventCategory: 'Selected Seats',
          date: '2025-12-15',
          time: '20:00',
          location: 'Gaillard Center',
          section: 'A',
          row: '10',
          seat: '5',
          price: 45,
          qrCode: 'QR456',
          purchaseDate: '2025-11-01',
          status: 'purchased',
        },
      ];

      act(() => {
        result.current.addTickets(newTickets);
      });

      expect(result.current.tickets).toHaveLength(2);
    });
  });

  describe('removeTicket', () => {
    it('should remove a ticket by id', () => {
      const { result } = renderHook(() => useTickets(), { wrapper });

      const newTickets: Ticket[] = [
        {
          id: '1',
          eventId: 'event1',
          eventTitle: 'Basketball Game',
          eventCategory: 'Big Arena',
          date: '2025-12-01',
          time: '19:00',
          location: 'TD Arena',
          section: '205',
          row: 'F',
          seat: '12',
          price: 52,
          qrCode: 'QR123',
          purchaseDate: '2025-11-01',
          status: 'purchased',
        },
        {
          id: '2',
          eventId: 'event2',
          eventTitle: 'Concert',
          eventCategory: 'Selected Seats',
          date: '2025-12-15',
          time: '20:00',
          location: 'Gaillard Center',
          price: 45,
          qrCode: 'QR456',
          purchaseDate: '2025-11-01',
          status: 'purchased',
        },
      ];

      act(() => {
        result.current.addTickets(newTickets);
      });

      act(() => {
        result.current.removeTicket('1');
      });

      expect(result.current.tickets).toHaveLength(1);
      expect(result.current.tickets[0].id).toBe('2');
    });
  });

  describe('getTicketsByEvent', () => {
    it('should return tickets for a specific event', () => {
      const { result } = renderHook(() => useTickets(), { wrapper });

      const newTickets: Ticket[] = [
        {
          id: '1',
          eventId: 'event1',
          eventTitle: 'Basketball Game',
          eventCategory: 'Big Arena',
          date: '2025-12-01',
          time: '19:00',
          location: 'TD Arena',
          section: '205',
          row: 'F',
          seat: '12',
          price: 52,
          qrCode: 'QR123',
          purchaseDate: '2025-11-01',
          status: 'purchased',
        },
        {
          id: '2',
          eventId: 'event2',
          eventTitle: 'Concert',
          eventCategory: 'Selected Seats',
          date: '2025-12-15',
          time: '20:00',
          location: 'Gaillard Center',
          price: 45,
          qrCode: 'QR456',
          purchaseDate: '2025-11-01',
          status: 'purchased',
        },
        {
          id: '3',
          eventId: 'event1',
          eventTitle: 'Basketball Game',
          eventCategory: 'Big Arena',
          date: '2025-12-01',
          time: '19:00',
          location: 'TD Arena',
          section: '206',
          row: 'G',
          seat: '8',
          price: 52,
          qrCode: 'QR789',
          purchaseDate: '2025-11-01',
          status: 'purchased',
        },
      ];

      act(() => {
        result.current.addTickets(newTickets);
      });

      const event1Tickets = result.current.getTicketsByEvent('event1');
      expect(event1Tickets).toHaveLength(2);
      expect(event1Tickets.every(t => t.eventId === 'event1')).toBe(true);
    });

    it('should return empty array for non-existent event', () => {
      const { result } = renderHook(() => useTickets(), { wrapper });

      const tickets = result.current.getTicketsByEvent('nonexistent');
      expect(tickets).toEqual([]);
    });
  });

  describe('localStorage persistence', () => {
    it('should persist tickets to localStorage', () => {
      const { result } = renderHook(() => useTickets(), { wrapper });

      const newTickets: Ticket[] = [
        {
          id: '1',
          eventId: 'event1',
          eventTitle: 'Basketball Game',
          eventCategory: 'Big Arena',
          date: '2025-12-01',
          time: '19:00',
          location: 'TD Arena',
          section: '205',
          row: 'F',
          seat: '12',
          price: 52,
          qrCode: 'QR123',
          purchaseDate: '2025-11-01',
          status: 'purchased',
        },
      ];

      act(() => {
        result.current.addTickets(newTickets);
      });

      const stored = localStorage.getItem('userTickets');
      expect(stored).not.toBeNull();
      
      const parsed = JSON.parse(stored!);
      expect(parsed).toHaveLength(1);
      expect(parsed[0].id).toBe('1');
    });
  });
});
