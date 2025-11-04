import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEvents, useEvent } from '../useEvents';
import { supabase } from '@/integrations/supabase/client';
import { ReactNode } from 'react';

/**
 * TDD Example 6: Database Hooks Testing
 * 
 * Testing Strategy:
 * - Mock Supabase client responses
 * - Test data fetching and caching
 * - Verify error handling
 */

vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
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

describe('useEvents', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch events successfully', async () => {
    const mockEvents = [
      {
        id: '1',
        title: 'Basketball Game',
        category: 'Big Arena',
        date: '2025-12-01',
        time: '19:00:00',
        location: 'TD Arena',
        capacity_max: 1000,
        tickets_sold: 500,
      },
    ];

    const mockFrom = {
      select: vi.fn().mockReturnValue({
        order: vi.fn().mockResolvedValue({
          data: mockEvents,
          error: null,
        }),
      }),
    };
    vi.mocked(supabase.from).mockReturnValue(mockFrom as any);

    const { result } = renderHook(() => useEvents(), {
      wrapper: createWrapper(),
    });

    // Wait for the query to resolve
    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(result.current.data).toEqual(mockEvents);
    expect(result.current.isSuccess).toBe(true);
  });

  it('should handle fetch errors', async () => {
    const mockFrom = {
      select: vi.fn().mockReturnValue({
        order: vi.fn().mockResolvedValue({
          data: null,
          error: { message: 'Database error' },
        }),
      }),
    };
    vi.mocked(supabase.from).mockReturnValue(mockFrom as any);

    const { result } = renderHook(() => useEvents(), {
      wrapper: createWrapper(),
    });

    // Wait for the query to resolve
    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(result.current.isError).toBe(true);
  });
});

describe('useEvent', () => {
  it('should fetch a single event', async () => {
    const mockEvent = {
      id: '1',
      title: 'Basketball Game',
      category: 'Big Arena',
      date: '2025-12-01',
      time: '19:00:00',
      location: 'TD Arena',
    };

    const mockFrom = {
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({
            data: mockEvent,
            error: null,
          }),
        }),
      }),
    };
    vi.mocked(supabase.from).mockReturnValue(mockFrom as any);

    const { result } = renderHook(() => useEvent('1'), {
      wrapper: createWrapper(),
    });

    // Wait for the query to resolve
    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(result.current.data).toEqual(mockEvent);
    expect(result.current.isSuccess).toBe(true);
  });

  it('should not fetch when eventId is undefined', () => {
    const { result } = renderHook(() => useEvent(undefined), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
  });
});
