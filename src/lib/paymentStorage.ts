// Payment card storage (PCI-aware, tokenized storage)
// NOTE: In production, use a proper payment processor like Stripe

export interface PaymentCard {
  id: string;
  last4: string;
  brand: 'visa' | 'mastercard' | 'amex' | 'discover';
  expiryMonth: string;
  expiryYear: string;
  nameOnCard: string;
  billingZip: string;
  isDefault: boolean;
  addedDate: string;
  // In production, store only tokenized reference, never full PAN
  token: string; // Simulated token
}

const STORAGE_KEY = 'payment_cards';

export const getPaymentCards = (): PaymentCard[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const addPaymentCard = (
  cardNumber: string,
  nameOnCard: string,
  expiryMonth: string,
  expiryYear: string,
  cvv: string,
  billingZip: string,
  setAsDefault: boolean
): PaymentCard => {
  // Extract last 4 digits
  const last4 = cardNumber.slice(-4);
  
  // Detect brand (simplified)
  let brand: PaymentCard['brand'] = 'visa';
  if (cardNumber.startsWith('5')) brand = 'mastercard';
  else if (cardNumber.startsWith('34') || cardNumber.startsWith('37')) brand = 'amex';
  else if (cardNumber.startsWith('6')) brand = 'discover';
  
  // Generate token (in production, this would be from Stripe/processor)
  const token = `tok_${Math.random().toString(36).substring(2, 15)}`;
  
  const newCard: PaymentCard = {
    id: `card_${Date.now()}`,
    last4,
    brand,
    expiryMonth,
    expiryYear,
    nameOnCard,
    billingZip,
    isDefault: setAsDefault,
    addedDate: new Date().toISOString(),
    token,
  };
  
  const cards = getPaymentCards();
  
  // If setting as default, unset other defaults
  if (setAsDefault) {
    cards.forEach(card => card.isDefault = false);
  }
  
  // If this is the first card, make it default
  if (cards.length === 0) {
    newCard.isDefault = true;
  }
  
  cards.push(newCard);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  
  return newCard;
};

export const deletePaymentCard = (cardId: string): void => {
  const cards = getPaymentCards().filter(c => c.id !== cardId);
  
  // If we deleted the default card, set another as default
  if (cards.length > 0 && !cards.some(c => c.isDefault)) {
    cards[0].isDefault = true;
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
};

export const setDefaultCard = (cardId: string): void => {
  const cards = getPaymentCards();
  cards.forEach(card => {
    card.isDefault = card.id === cardId;
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
};

export const getDefaultCard = (): PaymentCard | null => {
  const cards = getPaymentCards();
  return cards.find(c => c.isDefault) || cards[0] || null;
};
