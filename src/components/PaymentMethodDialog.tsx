import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CreditCard, Plus } from "lucide-react";
import { addPaymentCard } from "@/lib/paymentStorage";
import { toast } from "sonner";

interface PaymentMethodDialogProps {
  onCardAdded?: () => void;
}

const PaymentMethodDialog = ({ onCardAdded }: PaymentMethodDialogProps) => {
  const [open, setOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [billingZip, setBillingZip] = useState("");
  const [saveCard, setSaveCard] = useState(true);
  const [setAsDefault, setSetAsDefault] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Card number validation (simplified)
    const cleanCardNumber = cardNumber.replace(/\s/g, '');
    if (!cleanCardNumber || cleanCardNumber.length < 13 || cleanCardNumber.length > 19) {
      newErrors.cardNumber = "Invalid card number";
    }

    // Name validation
    if (!nameOnCard.trim()) {
      newErrors.nameOnCard = "Name is required";
    }

    // Expiry validation
    const month = parseInt(expiryMonth);
    const year = parseInt(expiryYear);
    if (!month || month < 1 || month > 12) {
      newErrors.expiryMonth = "Invalid month";
    }
    if (!year || year < new Date().getFullYear() % 100) {
      newErrors.expiryYear = "Card expired";
    }

    // CVV validation
    if (!cvv || cvv.length < 3 || cvv.length > 4) {
      newErrors.cvv = "Invalid CVV";
    }

    // Billing ZIP
    if (!billingZip || billingZip.length < 5) {
      newErrors.billingZip = "Invalid ZIP code";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    try {
      const cleanCardNumber = cardNumber.replace(/\s/g, '');
      addPaymentCard(
        cleanCardNumber,
        nameOnCard,
        expiryMonth.padStart(2, '0'),
        expiryYear,
        cvv,
        billingZip,
        setAsDefault
      );

      toast.success("Payment method added successfully");
      
      // Reset form
      setCardNumber("");
      setNameOnCard("");
      setExpiryMonth("");
      setExpiryYear("");
      setCvv("");
      setBillingZip("");
      setSaveCard(true);
      setSetAsDefault(false);
      setErrors({});
      
      setOpen(false);
      onCardAdded?.();
    } catch (error) {
      toast.error("Failed to add payment method");
    }
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const chunks = cleaned.match(/.{1,4}/g) || [];
    return chunks.join(' ');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Payment Method
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Add Payment Method
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* Card Number */}
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              maxLength={19}
            />
            {errors.cardNumber && (
              <p className="text-sm text-destructive">{errors.cardNumber}</p>
            )}
          </div>

          {/* Name on Card */}
          <div className="space-y-2">
            <Label htmlFor="nameOnCard">Name on Card</Label>
            <Input
              id="nameOnCard"
              placeholder="John Doe"
              value={nameOnCard}
              onChange={(e) => setNameOnCard(e.target.value)}
            />
            {errors.nameOnCard && (
              <p className="text-sm text-destructive">{errors.nameOnCard}</p>
            )}
          </div>

          {/* Expiry and CVV */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryMonth">Month</Label>
              <Input
                id="expiryMonth"
                placeholder="MM"
                value={expiryMonth}
                onChange={(e) => setExpiryMonth(e.target.value.replace(/\D/g, '').slice(0, 2))}
                maxLength={2}
              />
              {errors.expiryMonth && (
                <p className="text-xs text-destructive">{errors.expiryMonth}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiryYear">Year</Label>
              <Input
                id="expiryYear"
                placeholder="YY"
                value={expiryYear}
                onChange={(e) => setExpiryYear(e.target.value.replace(/\D/g, '').slice(0, 2))}
                maxLength={2}
              />
              {errors.expiryYear && (
                <p className="text-xs text-destructive">{errors.expiryYear}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                placeholder="123"
                type="password"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                maxLength={4}
              />
              {errors.cvv && (
                <p className="text-xs text-destructive">{errors.cvv}</p>
              )}
            </div>
          </div>

          {/* Billing ZIP */}
          <div className="space-y-2">
            <Label htmlFor="billingZip">Billing ZIP Code</Label>
            <Input
              id="billingZip"
              placeholder="12345"
              value={billingZip}
              onChange={(e) => setBillingZip(e.target.value.slice(0, 10))}
            />
            {errors.billingZip && (
              <p className="text-sm text-destructive">{errors.billingZip}</p>
            )}
          </div>

          {/* Save card toggle */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="saveCard"
              checked={saveCard}
              onCheckedChange={(checked) => setSaveCard(checked as boolean)}
            />
            <Label htmlFor="saveCard" className="text-sm font-normal cursor-pointer">
              Save this card for future purchases
            </Label>
          </div>

          {/* Set as default */}
          {saveCard && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="setAsDefault"
                checked={setAsDefault}
                onCheckedChange={(checked) => setSetAsDefault(checked as boolean)}
              />
              <Label htmlFor="setAsDefault" className="text-sm font-normal cursor-pointer">
                Set as default payment method
              </Label>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setOpen(false)} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="flex-1">
            Add Card
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentMethodDialog;
