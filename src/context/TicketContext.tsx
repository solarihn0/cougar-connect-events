import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Ticket {
  id: string;
  eventId: string;
  eventTitle: string;
  eventCategory: 'Big Arena' | 'Selected Seats' | 'Max Capacity';
  date: string;
  time: string;
  location: string;
  seatNumber?: string; // Format: "Section • Row • Seat" (e.g., "205 • F • 12")
  section?: string;
  row?: string;
  seat?: string;
  quantity?: number;
  price: number;
  qrCode: string;
  purchaseDate: string;
  status: 'selected' | 'purchased' | 'refunded'; // yellow, green, grey
}

interface TicketContextType {
  tickets: Ticket[];
  addTickets: (tickets: Ticket[]) => void;
  removeTicket: (ticketId: string) => void;
  getTicketsByEvent: (eventId: string) => Ticket[];
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export const TicketProvider = ({ children }: { children: ReactNode }) => {
  const [tickets, setTickets] = useState<Ticket[]>(() => {
    const stored = localStorage.getItem('userTickets');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('userTickets', JSON.stringify(tickets));
  }, [tickets]);

  const addTickets = (newTickets: Ticket[]) => {
    setTickets(prev => [...prev, ...newTickets]);
  };

  const removeTicket = (ticketId: string) => {
    setTickets(prev => prev.filter(t => t.id !== ticketId));
  };

  const getTicketsByEvent = (eventId: string) => {
    return tickets.filter(t => t.eventId === eventId);
  };

  return (
    <TicketContext.Provider value={{ tickets, addTickets, removeTicket, getTicketsByEvent }}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTickets = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTickets must be used within TicketProvider');
  }
  return context;
};
