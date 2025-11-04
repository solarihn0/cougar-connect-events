import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTickets, useEventTickets } from '../useTickets';
import { supabase } from '@/integrations/supabase/client';
import { ReactNode } from 'react';

/**
 * TDD Example 7: Authenticated Database Hooks Testing
 * 
 * Testing Strategy:
 * - Mock authenticated user
 * - Test user-specific data fetching
 * - Verify authorization checks
 */

vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      getUser: vi.fn(),
    },
    from: vi.fn(),
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useTickets', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch user tickets successfully', async () => {
    const mockUser = { id: 'user-123' };
    const mockTickets = [
      {
        id: 'ticket-1',
        user_id: 'user-123',
        event_id: 'event-1',
        event_title: 'Basketball Game',
        status: 'purchased',
      },
    ];

    vi.mocked(supabase.auth.getUser).mockResolvedValue({
      data: { user: mockUser },
      error: null,
    } as any);

    const mockFrom = {
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          order: vi.fn().mockResolvedValue({
            data: mockTickets,
            error: null,
          }),
        }),
      }),
    };
    vi.mocked(supabase.from).mockReturnValue(mockFrom as any);

    const { result } = renderHook(() => useTickets(), {
      wrapper: createWrapper(),
    });

    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(result.current.data).toEqual(mockTickets);
    expect(result.current.isSuccess).toBe(true);
  });

  it('should throw error when not authenticated', async () => {
    vi.mocked(supabase.auth.getUser).mockResolvedValue({
      data: { user: null },
      error: null,
    } as any);

    const { result } = renderHook(() => useTickets(), {
      wrapper: createWrapper(),
    });

    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(result.current.isError).toBe(true);
  });
});

describe('useEventTickets', () => {
  it('should fetch tickets for specific event', async () => {
    const mockUser = { id: 'user-123' };
    const mockTickets = [
      {
        id: 'ticket-1',
        user_id: 'user-123',
        event_id: 'event-1',
      },
    ];

    vi.mocked(supabase.auth.getUser).mockResolvedValue({
      data: { user: mockUser },
      error: null,
    } as any);

    const mockFrom = {
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({
            data: mockTickets,
            error: null,
          }),
        }),
      }),
    };
    vi.mocked(supabase.from).mockReturnValue(mockFrom as any);

    const { result } = renderHook(() => useEventTickets('event-1'), {
      wrapper: createWrapper(),
    });

    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(result.current.data).toEqual(mockTickets);
    expect(result.current.isSuccess).toBe(true);
  });

  it('should return empty array when eventId is undefined', async () => {
    const mockUser = { id: 'user-123' };

    vi.mocked(supabase.auth.getUser).mockResolvedValue({
      data: { user: mockUser },
      error: null,
    } as any);

    const { result } = renderHook(() => useEventTickets(undefined), {
      wrapper: createWrapper(),
    });

    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(result.current.data).toEqual([]);
  });
});
