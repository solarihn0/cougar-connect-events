# Testing Guide - CSCI 360 Assignment 6

## Quick Start

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage

# Open test UI
npm run test:ui
```

## Test Files Created

- ✅ `src/lib/__tests__/utils.test.ts` - Utility function tests
- ✅ `src/lib/__tests__/paymentStorage.test.ts` - Payment storage tests (12 tests)
- ✅ `src/lib/__tests__/dateHelpers.test.ts` - Date helper tests (13 tests)
- ✅ `src/components/__tests__/TicketIcon.test.tsx` - Component tests (12 tests)
- ✅ `src/context/__tests__/TicketContext.test.tsx` - Context tests (7 tests)
- ✅ `src/hooks/__tests__/useEvents.test.tsx` - Database event hooks (4 tests)
- ✅ `src/hooks/__tests__/useTickets.test.tsx` - Database ticket hooks (4 tests)
- ✅ `src/hooks/__tests__/usePayments.test.tsx` - Database payment hooks (3 tests)

**Total: 55+ tests covering utilities, components, contexts, and database operations**

## Documentation

- 📄 `docs/TDD_DOCUMENTATION.md` - Complete TDD workflow, examples, and contribution guide
- 📄 `docs/ARCHITECTURE_DIAGRAM.md` - System architecture with Mermaid diagrams

## GitHub Actions

Automated test pipeline configured in `.github/workflows/test.yml` - runs on every push/PR.

## For Your Assignment

1. **Group Deliverable**: Use `docs/TDD_DOCUMENTATION.md` and `docs/ARCHITECTURE_DIAGRAM.md`
2. **Individual Deliverable**: Show your test commits with screenshots of failing → passing tests
3. **Presentation**: Run `npm run test:ui` to demo live testing

Good luck! 🎓
