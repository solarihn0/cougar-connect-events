import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CreditCard, Trash2, Star } from "lucide-react";
import { getPaymentCards, deletePaymentCard, setDefaultCard, type PaymentCard } from "@/lib/paymentStorage";
import PaymentMethodDialog from "@/components/PaymentMethodDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const PaymentSettings = () => {
  const navigate = useNavigate();
  const [paymentCards, setPaymentCards] = useState<PaymentCard[]>(getPaymentCards());

  const refreshCards = () => {
    setPaymentCards(getPaymentCards());
  };

  const handleDelete = (cardId: string) => {
    deletePaymentCard(cardId);
    setPaymentCards(getPaymentCards());
    toast.success("Payment method removed");
  };

  const handleSetDefault = (cardId: string) => {
    setDefaultCard(cardId);
    setPaymentCards(getPaymentCards());
    toast.success("Default payment method updated");
  };

  const getCardBrandIcon = (brand: string) => {
    const brandLower = brand.toLowerCase();
    if (brandLower === 'visa') return '💳';
    if (brandLower === 'mastercard') return '💳';
    if (brandLower === 'amex') return '💳';
    if (brandLower === 'discover') return '💳';
    return '💳';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/settings")}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold">Payment Methods</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Saved Payment Methods
            </CardTitle>
            <CardDescription>
              Manage your payment methods for faster checkout
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {paymentCards.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <CreditCard className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No payment methods saved</p>
                <p className="text-sm">Add a card to speed up your checkout</p>
              </div>
            ) : (
              <div className="space-y-3">
                {paymentCards.map((card) => (
                  <Card key={card.id} className="relative">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{getCardBrandIcon(card.brand)}</div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold">
                                {card.brand.charAt(0).toUpperCase() + card.brand.slice(1)} •••• {card.last4}
                              </p>
                              {card.isDefault && (
                                <Badge variant="secondary" className="text-xs">
                                  <Star className="w-3 h-3 mr-1 fill-current" />
                                  Default
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Expires {card.expiryMonth}/{card.expiryYear}
                            </p>
                            <p className="text-xs text-muted-foreground">{card.nameOnCard}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {!card.isDefault && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleSetDefault(card.id)}
                            >
                              Set Default
                            </Button>
                          )}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Remove Payment Method?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to remove this payment method? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(card.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Remove
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            <PaymentMethodDialog onCardAdded={refreshCards} />
          </CardContent>
        </Card>

        <Card className="border-muted">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="text-muted-foreground mt-0.5">🔒</div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Secure & encrypted</p>
                <p className="text-xs text-muted-foreground">
                  Your payment information is encrypted and securely stored. We never share your card details.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PaymentSettings;
