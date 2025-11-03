import { describe, it, expect, beforeEach } from 'vitest';
import {
  addPaymentCard,
  getPaymentCards,
  deletePaymentCard,
  setDefaultCard,
  getDefaultCard,
  PaymentCard,
} from '../paymentStorage';

/**
 * TDD Example 2: Payment Storage Testing
 * 
 * Testing Strategy:
 * - Unit tests for each storage function
 * - Test data persistence and retrieval
 * - Verify default payment method logic
 */

describe('Payment Storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('addPaymentCard', () => {
    it('should save a payment card to localStorage', () => {
      const card = addPaymentCard(
        '4111111111111234',
        'John Doe',
        '12',
        '25',
        '123',
        '29401',
        false
      );

      const cards = getPaymentCards();
      expect(cards).toHaveLength(1);
      expect(cards[0].last4).toBe('1234');
      expect(cards[0].brand).toBe('visa');
      expect(cards[0].nameOnCard).toBe('John Doe');
    });

    it('should append new payment cards', () => {
      addPaymentCard('4111111111111234', 'John Doe', '12', '25', '123', '29401', false);
      addPaymentCard('5555555555555678', 'Jane Smith', '06', '26', '456', '29403', false);
      
      const cards = getPaymentCards();
      expect(cards).toHaveLength(2);
      expect(cards[0].last4).toBe('1234');
      expect(cards[1].last4).toBe('5678');
    });

    it('should set first card as default automatically', () => {
      const card = addPaymentCard('4111111111111234', 'John Doe', '12', '25', '123', '29401', false);
      expect(card.isDefault).toBe(true);
    });
  });

  describe('getPaymentCards', () => {
    it('should return empty array when no cards saved', () => {
      const cards = getPaymentCards();
      expect(cards).toEqual([]);
    });

    it('should retrieve all saved payment cards', () => {
      addPaymentCard('4111111111111234', 'John Doe', '12', '25', '123', '29401', false);
      const cards = getPaymentCards();

      expect(cards).toHaveLength(1);
      expect(cards[0].last4).toBe('1234');
    });
  });

  describe('deletePaymentCard', () => {
    it('should remove a payment card by id', () => {
      const card1 = addPaymentCard('4111111111111234', 'John Doe', '12', '25', '123', '29401', false);
      const card2 = addPaymentCard('5555555555555678', 'Jane Smith', '06', '26', '456', '29403', false);
      
      deletePaymentCard(card1.id);

      const cards = getPaymentCards();
      expect(cards).toHaveLength(1);
      expect(cards[0].id).toBe(card2.id);
    });

    it('should set another card as default when deleting default', () => {
      const card1 = addPaymentCard('4111111111111234', 'John Doe', '12', '25', '123', '29401', true);
      const card2 = addPaymentCard('5555555555555678', 'Jane Smith', '06', '26', '456', '29403', false);
      
      deletePaymentCard(card1.id);

      const cards = getPaymentCards();
      expect(cards[0].isDefault).toBe(true);
    });
  });

  describe('setDefaultCard', () => {
    it('should set a payment card as default', () => {
      const card1 = addPaymentCard('4111111111111234', 'John Doe', '12', '25', '123', '29401', false);
      const card2 = addPaymentCard('5555555555555678', 'Jane Smith', '06', '26', '456', '29403', false);
      
      setDefaultCard(card2.id);

      const cards = getPaymentCards();
      expect(cards.find(c => c.id === card2.id)?.isDefault).toBe(true);
      expect(cards.find(c => c.id === card1.id)?.isDefault).toBe(false);
    });

    it('should unset previous default when setting new default', () => {
      const card1 = addPaymentCard('4111111111111234', 'John Doe', '12', '25', '123', '29401', true);
      const card2 = addPaymentCard('5555555555555678', 'Jane Smith', '06', '26', '456', '29403', false);
      
      setDefaultCard(card2.id);

      const defaultCard = getDefaultCard();
      expect(defaultCard?.id).toBe(card2.id);
    });
  });

  describe('getDefaultCard', () => {
    it('should return null when no cards saved', () => {
      const defaultCard = getDefaultCard();
      expect(defaultCard).toBeNull();
    });

    it('should return the default payment card', () => {
      const card = addPaymentCard('4111111111111234', 'John Doe', '12', '25', '123', '29401', true);
      const defaultCard = getDefaultCard();

      expect(defaultCard?.id).toBe(card.id);
      expect(defaultCard?.isDefault).toBe(true);
    });

    it('should return first card if no default set explicitly', () => {
      const card1 = addPaymentCard('4111111111111234', 'John Doe', '12', '25', '123', '29401', false);
      
      const defaultCard = getDefaultCard();
      expect(defaultCard?.id).toBe(card1.id);
    });
  });
});
