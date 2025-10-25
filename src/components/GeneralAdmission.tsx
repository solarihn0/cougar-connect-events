import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Minus, Plus } from "lucide-react";

interface GeneralAdmissionProps {
  price: number;
  ticketCount: number;
  onTicketCountChange: (count: number) => void;
  maxTickets?: number;
  availableTickets?: number;
  capacity?: number;
  ticketsSold?: number;
}

const GeneralAdmission = ({
  price,
  ticketCount,
  onTicketCountChange,
  maxTickets = 10,
  availableTickets = 100,
  capacity,
  ticketsSold = 0,
}: GeneralAdmissionProps) => {
  const remainingCapacity = capacity ? capacity - ticketsSold : availableTickets;
  const effectiveMax = Math.min(maxTickets, remainingCapacity);
  const isSoldOut = capacity ? ticketsSold >= capacity : false;

  const handleIncrease = () => {
    if (ticketCount < effectiveMax) {
      onTicketCountChange(ticketCount + 1);
    }
  };

  const handleDecrease = () => {
    if (ticketCount > 0) {
      onTicketCountChange(ticketCount - 1);
    }
  };

  const totalPrice = price * ticketCount;
  const serviceFee = 2.50;
  const fees = ticketCount > 0 ? serviceFee : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          General Admission
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          No reserved seats. First come, first served.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div>
            <p className="font-semibold">Ticket Price</p>
            <p className="text-2xl font-bold text-primary">${price}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">
              {isSoldOut ? "Sold Out" : "Remaining"}
            </p>
            <p className={`font-semibold ${isSoldOut ? "text-destructive" : ""}`}>
              {isSoldOut ? "0 tickets" : `${remainingCapacity} tickets`}
            </p>
          </div>
        </div>

        {ticketCount > remainingCapacity && !isSoldOut && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-sm text-destructive font-medium">
              Only {remainingCapacity} ticket{remainingCapacity !== 1 ? 's' : ''} remaining
            </p>
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Number of Tickets</span>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={handleDecrease}
                disabled={ticketCount === 0}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="text-2xl font-bold min-w-[3rem] text-center">
                {ticketCount}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={handleIncrease}
                disabled={ticketCount >= effectiveMax || isSoldOut}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {ticketCount > 0 && (
            <div className="pt-4 border-t space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Subtotal ({ticketCount} ticket{ticketCount !== 1 ? 's' : ''})</span>
                <span className="font-semibold">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Service Fee</span>
                <span className="font-semibold">${serviceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-xs">Est. Taxes</span>
                <span className="text-sm">${(totalPrice * 0.08).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-2xl text-primary">
                  ${(totalPrice + fees + totalPrice * 0.08).toFixed(2)}
                </span>
              </div>
            </div>
          )}

          {ticketCount >= maxTickets && !isSoldOut && (
            <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">
              Maximum {maxTickets} tickets per order
            </p>
          )}

          {isSoldOut && (
            <p className="text-sm text-destructive font-bold text-center p-3 bg-destructive/10 rounded-lg">
              This event is sold out
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GeneralAdmission;
