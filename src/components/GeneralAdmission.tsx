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
  ticketsSold,
}: GeneralAdmissionProps) => {
  const handleIncrease = () => {
    if (ticketCount < maxTickets && ticketCount < availableTickets) {
      onTicketCountChange(ticketCount + 1);
    }
  };

  const handleDecrease = () => {
    if (ticketCount > 0) {
      onTicketCountChange(ticketCount - 1);
    }
  };

  const totalPrice = price * ticketCount;

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
            <p className="text-sm text-muted-foreground">Available</p>
            <p className="font-semibold">{availableTickets} tickets</p>
          </div>
        </div>

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
                disabled={ticketCount >= maxTickets || ticketCount >= availableTickets}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {ticketCount > 0 && (
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">${totalPrice}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Service Fee</span>
                <span className="font-semibold">$2.50</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="font-bold">Total</span>
                <span className="font-bold text-2xl text-primary">
                  ${(totalPrice + 2.5).toFixed(2)}
                </span>
              </div>
            </div>
          )}

          {ticketCount >= maxTickets && (
            <p className="text-sm text-destructive">
              Maximum {maxTickets} tickets per order
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GeneralAdmission;
