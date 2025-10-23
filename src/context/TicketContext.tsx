import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Ticket {
  id: string;
  eventId: string;
  eventTitle: string;
  date: string;
  time: string;
  location: string;
  seatNumber?: string;
  quantity?: number;
  qrCode: string;
  purchaseDate: string;
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
