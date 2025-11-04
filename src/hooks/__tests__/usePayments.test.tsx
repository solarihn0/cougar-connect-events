import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePayments, useDefaultPayment } from '../usePayments';
import { supabase } from '@/integrations/supabase/client';
import { ReactNode } from 'react';

/**
 * TDD Example 8: Payment Hooks Testing
 * 
 * Testing Strategy:
 * - Test secure payment data fetching
 * - Verify default payment logic
 * - Test payment CRUD operations
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

describe('usePayments', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch user payment methods', async () => {
    const mockUser = { id: 'user-123' };
    const mockPayments = [
      {
        id: 'payment-1',
        user_id: 'user-123',
        card_brand: 'Visa',
        last_four: '4242',
        is_default: true,
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
            data: mockPayments,
            error: null,
          }),
        }),
      }),
    };
    vi.mocked(supabase.from).mockReturnValue(mockFrom as any);

    const { result } = renderHook(() => usePayments(), {
      wrapper: createWrapper(),
    });

    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(result.current.data).toEqual(mockPayments);
    expect(result.current.isSuccess).toBe(true);
  });
});

describe('useDefaultPayment', () => {
  it('should fetch default payment method', async () => {
    const mockUser = { id: 'user-123' };
    const mockPayment = {
      id: 'payment-1',
      card_brand: 'Visa',
      last_four: '4242',
      is_default: true,
    };

    vi.mocked(supabase.auth.getUser).mockResolvedValue({
      data: { user: mockUser },
      error: null,
    } as any);

    const mockFrom = {
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            maybeSingle: vi.fn().mockResolvedValue({
              data: mockPayment,
              error: null,
            }),
          }),
        }),
      }),
    };
    vi.mocked(supabase.from).mockReturnValue(mockFrom as any);

    const { result } = renderHook(() => useDefaultPayment(), {
      wrapper: createWrapper(),
    });

    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(result.current.data).toEqual(mockPayment);
    expect(result.current.isSuccess).toBe(true);
  });

  it('should return null when no default payment exists', async () => {
    const mockUser = { id: 'user-123' };

    vi.mocked(supabase.auth.getUser).mockResolvedValue({
      data: { user: mockUser },
      error: null,
    } as any);

    const mockFrom = {
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            maybeSingle: vi.fn().mockResolvedValue({
              data: null,
              error: null,
            }),
          }),
        }),
      }),
    };
    vi.mocked(supabase.from).mockReturnValue(mockFrom as any);

    const { result } = renderHook(() => useDefaultPayment(), {
      wrapper: createWrapper(),
    });

    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(result.current.data).toBeNull();
    expect(result.current.isSuccess).toBe(true);
  });
});
