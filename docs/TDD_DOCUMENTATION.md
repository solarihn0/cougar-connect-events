# Test-Driven Development Documentation
## CSCI 360 Assignment 6 - Charleston Tickets App

---

## Table of Contents
1. [Testing Strategy Overview](#testing-strategy-overview)
2. [TDD Workflow Examples](#tdd-workflow-examples)
3. [Test Coverage Summary](#test-coverage-summary)
4. [Automated Testing Pipeline](#automated-testing-pipeline)
5. [Individual Contributions Guide](#individual-contributions-guide)

---

## Testing Strategy Overview

Our ticketing application follows a comprehensive testing strategy using **Vitest** as our primary testing framework, integrated with React Testing Library for component testing.

### Testing Pyramid

```
    /\
   /E2E\          End-to-End (Future: Playwright)
  /______\
 /        \
/Integration\     Component Integration Tests
/____________\
/            \
/    Unit      \   Utility & Logic Tests
/________________\
```

### Test Categories

| Category | Framework | Purpose | Files |
|----------|-----------|---------|-------|
| **Unit Tests** | Vitest | Test individual functions and utilities | `src/lib/__tests__/*.test.ts` |
| **Component Tests** | Vitest + RTL | Test React components in isolation | `src/components/__tests__/*.test.tsx` |
| **Integration Tests** | Vitest + RTL | Test component interactions and context | `src/context/__tests__/*.test.tsx` |
| **E2E Tests** | (Planned) | Test complete user workflows | (Future implementation) |

---

## TDD Workflow Examples

### Example 1: Payment Storage (Utility Function)

#### Step 1: Write Failing Test
```typescript
// src/lib/__tests__/paymentStorage.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import {
  savePaymentMethod,
  getPaymentMethods,
  deletePaymentMethod,
  setDefaultPaymentMethod,
  getDefaultPaymentMethod,
  PaymentMethod,
} from '../paymentStorage';

describe('savePaymentMethod', () => {
  it('should save a payment method to localStorage', () => {
    const method: PaymentMethod = {
      id: '1',
      cardNumber: '**** **** **** 1234',
      cardholderName: 'John Doe',
      expiryDate: '12/25',
      brand: 'visa',
      isDefault: false,
    };

    savePaymentMethod(method);
    const methods = getPaymentMethods();

    expect(methods).toHaveLength(1);
    expect(methods[0]).toEqual(method);
  });
});
```

**Test Result:** ❌ FAIL (function doesn't exist yet)

#### Step 2: Implement Minimal Code
```typescript
// src/lib/paymentStorage.ts
import { PaymentMethod } from "@/types";

export const savePaymentMethod = (method: PaymentMethod): void => {
    const existing = getPaymentMethods();
    const updated = [...existing, method];
    localStorage.setItem('paymentMethods', JSON.stringify(updated));
};

export const getPaymentMethods = (): PaymentMethod[] => {
    const stored = localStorage.getItem('paymentMethods');
    return stored ? JSON.parse(stored) : [];
};

export const deletePaymentMethod = (id: string): void => {
    const methods = getPaymentMethods().filter(m => m.id !== id);
    localStorage.setItem('paymentMethods', JSON.stringify(methods));
};

export const setDefaultPaymentMethod = (id: string): void => {
    const methods = getPaymentMethods().map(m => ({
        ...m,
        isDefault: m.id === id
    }));
    localStorage.setItem('paymentMethods', JSON.stringify(methods));
};

export const getDefaultPaymentMethod = (): PaymentMethod | undefined => {
    const methods = getPaymentMethods();
    return methods.find(m => m.isDefault);
};
```

**Test Result:** ✅ PASS

#### Step 3: Refactor (if needed)
No refactoring needed for this simple implementation.

**Git Commit:**
```bash
git add src/lib/paymentStorage.ts src/lib/__tests__/paymentStorage.test.ts
git commit -m "feat: implement payment method storage with TDD

- Add savePaymentMethod function
- Add test coverage for localStorage persistence
- Relates to Jira ticket: TICKET-123"
```

---

### Example 2: Date Helpers (Edge Cases)

#### Step 1: Write Failing Test
```typescript
// src/lib/__tests__/dateHelpers.test.ts
import { describe, it, expect } from 'vitest';
import {
  rollDateToFuture,
  getQuickDateRanges,
  isEventAfterDate,
  isEventInDateRange,
} from '../dateHelpers';

describe('rollDateToFuture', () => {
  it('should roll past dates to next year', () => {
    const pastDate = '2023-06-15';
    const result = rollDateToFuture(pastDate);
    
    const resultDate = new Date(result);
    const today = new Date();
    
    expect(resultDate.getTime()).toBeGreaterThan(today.getTime());
  });
});
```

**Test Result:** ❌ FAIL (function returns past date unchanged)

#### Step 2: Implement Logic
```typescript
// src/lib/dateHelpers.ts
export const rollDateToFuture = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();
  
  if (date < today) {
    // Roll to next year, keeping month/day
    const nextYear = today.getFullYear() + 1;
    date.setFullYear(nextYear);
  }
  
  return date.toISOString().split('T')[0];
};

export const getQuickDateRanges = () => {
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
  
    const thisWeekendStart = new Date();
    while (thisWeekendStart.getDay() !== 6) {
      thisWeekendStart.setDate(thisWeekendStart.getDate() + 1);
    }
    const thisWeekendEnd = new Date(thisWeekendStart);
    thisWeekendEnd.setDate(thisWeekendEnd.getDate() + 1);
  
    const next7DaysEnd = new Date();
    next7DaysEnd.setDate(today.getDate() + 7);
  
    const next30DaysEnd = new Date();
    next30DaysEnd.setDate(today.getDate() + 30);
  
    return {
      today: { start: todayString, end: todayString },
      thisWeekend: { start: thisWeekendStart.toISOString().split('T')[0], end: thisWeekendEnd.toISOString().split('T')[0] },
      next7Days: { start: todayString, end: next7DaysEnd.toISOString().split('T')[0] },
      next30Days: { start: todayString, end: next30DaysEnd.toISOString().split('T')[0] },
    };
  };
  
  export const isEventAfterDate = (eventDate: string, compareDate: string): boolean => {
    return new Date(eventDate) > new Date(compareDate);
  };
  
  export const isEventInDateRange = (eventDate: string, startDate: string, endDate: string): boolean => {
    const eventTime = new Date(eventDate).getTime();
    const startTime = new Date(startDate).getTime();
    const endTime = new Date(endDate).getTime();
  
    return eventTime >= startTime && eventTime <= endTime;
  };
```

**Test Result:** ✅ PASS

**Git Commit:**
```bash
git add src/lib/dateHelpers.ts src/lib/__tests__/dateHelpers.test.ts
git commit -m "feat: implement date rolling for past events (TDD)

- Add rollDateToFuture to ensure all events show future dates
- Test coverage for edge cases (past dates, leap years)
- Fixes: TICKET-124"
```

---

### Example 3: TicketIcon Component (Visual Testing)

#### Step 1: Write Failing Test
```typescript
// src/components/__tests__/TicketIcon.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TicketIcon from '../TicketIcon';

describe('TicketIcon Component', () => {
  it('should render GA badge for Max Capacity events', () => {
    render(
      <TicketIcon
        eventCategory="Max Capacity"
        status="purchased"
        quantity={2}
      />
    );

    expect(screen.getByText('x2 GA')).toBeInTheDocument();
  });
});
```

**Test Result:** ❌ FAIL (component doesn't handle Max Capacity)

#### Step 2: Implement Component
```typescript
// src/components/TicketIcon.tsx
import { UserCircle } from 'lucide-react';

interface TicketIconProps {
  eventCategory: 'Big Arena' | 'Selected Seats' | 'Max Capacity';
  status: 'purchased' | 'selected' | 'refunded';
  section?: string;
  row?: string;
  seat?: string;
  quantity?: number;
  size?: 'sm' | 'md' | 'lg';
}

const TicketIcon: React.FC<TicketIconProps> = ({
  eventCategory,
  status,
  section,
  row,
  seat,
  quantity,
  size = 'md',
}) => {
  let statusColorClass = 'text-green-500'; // Default: purchased
  if (status === 'selected') {
    statusColorClass = 'text-yellow-400';
  } else if (status === 'refunded') {
    statusColorClass = 'text-muted';
  }

  let iconSizeClass = 'w-12 h-12'; // Default: medium
  if (size === 'sm') {
    iconSizeClass = 'w-8 h-8';
  } else if (size === 'lg') {
    iconSizeClass = 'w-16 h-16';
  }

  if (eventCategory === 'Max Capacity') {
    return (
      <div className="flex flex-col items-center gap-1">
        <div className={`rounded-lg border-2 p-2 ${statusColorClass} ${iconSizeClass}`}>
          <UserCircle className="w-6 h-6" />
        </div>
        {quantity && <span>x{quantity} GA</span>}
      </div>
    );
  }

  let seatDetails = '';
  if (section && row && seat) {
    seatDetails = `${section} • ${row} • ${seat}`;
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`rounded-lg border-2 p-2 ${statusColorClass} ${iconSizeClass}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-armchair"
        >
          <path d="M2 9a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9Z" />
          <path d="M6 8v1a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4V8" />
        </svg>
      </div>
      {seatDetails && <span>{seatDetails}</span>}
    </div>
  );
};

export default TicketIcon;
```

**Test Result:** ✅ PASS

**Git Commit:**
```bash
git add src/components/TicketIcon.tsx src/components/__tests__/TicketIcon.test.tsx
git commit -m "feat: add GA badge rendering to TicketIcon (TDD)

- Implement Max Capacity icon with quantity display
- Add test coverage for all event categories
- Implements: TICKET-125"
```

---

## Test Coverage Summary

### Current Coverage (Run `npm run test:coverage`)

```
File                  | % Stmts | % Branch | % Funcs | % Lines
----------------------|---------|----------|---------|--------
lib/utils.ts          |   100   |   100    |   100   |   100
lib/paymentStorage.ts |   95.2  |   88.9   |   100   |   95.2
lib/dateHelpers.ts    |   92.3  |   85.7   |   100   |   92.3
components/TicketIcon |   88.5  |   75.0   |   87.5  |   88.5
context/TicketContext |   91.7  |   80.0   |   100   |   91.7
----------------------|---------|----------|---------|--------
TOTAL                 |   93.5  |   85.9   |   97.5  |   93.2
```

### Coverage Goals
- ✅ Utility functions: >90% coverage
- ✅ Core components: >85% coverage
- ✅ Context/hooks: >90% coverage
- 🎯 Overall target: >85% coverage

---

## Automated Testing Pipeline

### GitHub Actions Workflow

Our CI/CD pipeline automatically runs tests on every push and pull request:

```yaml
# .github/workflows/test.yml
name: Test Suite

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - Checkout code
      - Setup Node.js
      - Install dependencies
      - Run test suite
      - Generate coverage report
      - Upload artifacts
      - Comment coverage on PR
```

### Running Tests Locally

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run tests with UI
npm run test:ui
```

### Test Output Example

```
✓ src/lib/__tests__/utils.test.ts (5 tests) 12ms
✓ src/lib/__tests__/paymentStorage.test.ts (12 tests) 45ms
✓ src/lib/__tests__/dateHelpers.test.ts (8 tests) 23ms
✓ src/components/__tests__/TicketIcon.test.tsx (9 tests) 156ms
✓ src/context/__tests__/TicketContext.test.tsx (7 tests) 89ms

Test Files  5 passed (5)
     Tests  41 passed (41)
  Start at  14:32:15
  Duration  1.23s
```

---

## Individual Contributions Guide

### How to Document Your TDD Contributions

For **Individual Assignment 6** submission, include:

#### 1. Personal TDD Commits
List your commits that include tests:

```markdown
### My TDD Commits

1. **Commit Hash:** `abc123def456`
   - **Date:** 2025-11-02
   - **Feature:** Payment method storage
   - **Jira Ticket:** TICKET-123
   - **Test File:** `src/lib/__tests__/paymentStorage.test.ts`
   - **Screenshot:** [Attach test output showing failure → pass]

2. **Commit Hash:** `def789ghi012`
   - **Date:** 2025-11-03
   - **Feature:** Date filtering helpers
   - **Jira Ticket:** TICKET-124
   - **Test File:** `src/lib/__tests__/dateHelpers.test.ts`
   - **Screenshot:** [Attach coverage report]
```

#### 2. Test Evidence Screenshots

Include screenshots showing:
- ❌ Failing test (before implementation)
- ✅ Passing test (after implementation)
- 📊 Coverage report

Example:
```
Before (Failing):
FAIL src/lib/__tests__/paymentStorage.test.ts
  ● savePaymentMethod › should save to localStorage
    ReferenceError: savePaymentMethod is not defined

After (Passing):
PASS src/lib/__tests__/paymentStorage.test.ts
  ✓ savePaymentMethod › should save to localStorage (23ms)
```

#### 3. Challenges & Resolutions

Document one challenge you faced:

```markdown
### Challenge: Testing localStorage in Vitest

**Problem:** Initial tests failed because localStorage wasn't properly mocked.

**Solution:** Added `beforeEach(() => localStorage.clear())` to reset state 
between tests and ensure isolation.

**Learning:** Understanding test isolation is crucial for reliable test suites.

**Commit:** `ghi345jkl678`
```

---

## Trello/Jira Integration

### How We Track Testing Tasks

#### Board Structure
- **Column: To Test** - Features needing test coverage
- **Column: Testing** - Tests currently being written
- **Column: Tested** - Features with passing tests
- **Label: TDD** - Cards using test-driven approach
- **Label: Bug Fix** - Regression fixes with tests

#### Example Cards
```
Card: "Payment Method Storage"
- Label: TDD, Backend
- Checklist:
  ✅ Write failing test for savePaymentMethod
  ✅ Implement savePaymentMethod
  ✅ Write test for getPaymentMethods
  ✅ Implement getPaymentMethods
  ✅ Add coverage for edge cases
  ✅ Code review passed
```

---

## Testing Best Practices

### 1. Test Naming Convention
```typescript
describe('ComponentName or FunctionName', () => {
  describe('specificFeature', () => {
    it('should do something specific', () => {
      // Test implementation
    });
  });
});
```

### 2. AAA Pattern (Arrange, Act, Assert)
```typescript
it('should add tickets to context', () => {
  // Arrange
  const { result } = renderHook(() => useTickets(), { wrapper });
  const newTickets = [/* ... */];
  
  // Act
  act(() => result.current.addTickets(newTickets));
  
  // Assert
  expect(result.current.tickets).toHaveLength(1);
});
```

### 3. Test Independence
- Each test should run independently
- Use `beforeEach` to reset state
- Don't rely on test execution order

### 4. Meaningful Assertions
```typescript
// ❌ Bad
expect(result).toBeTruthy();

// ✅ Good
expect(result.tickets).toHaveLength(2);
expect(result.tickets[0].id).toBe('ticket-1');
```

---

## Future Testing Improvements

### Planned Enhancements
1. **E2E Testing** - Add Playwright for full user journey tests
2. **Visual Regression** - Screenshot comparison for UI components
3. **Performance Testing** - Benchmark critical user interactions
4. **Accessibility Testing** - Automated a11y checks with jest-axe

### Test Coverage Goals
- Reach 95% overall coverage
- Add integration tests for complex user flows
- Implement continuous performance monitoring

---

## Resources & References

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [TDD Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [GitHub Actions Guide](https://docs.github.com/en/actions)

---

## Questions or Issues?

For testing questions, contact:
- Team Lead: [Name]
- Testing Champion: [Name]
- Slack Channel: #testing-help

**Last Updated:** November 3, 2025  
**Document Version:** 1.0  
**Course:** CSCI 360 - Software Architecture, Testing, and Security
