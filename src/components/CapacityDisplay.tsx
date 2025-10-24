import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface CapacityDisplayProps {
  ticketsSold: number;
  capacity: number;
  eventTitle: string;
}

const CapacityDisplay = ({ ticketsSold, capacity, eventTitle }: CapacityDisplayProps) => {
  const percentageSold = Math.round((ticketsSold / capacity) * 100);
  const ticketsRemaining = capacity - ticketsSold;
  const isSoldOut = ticketsSold >= capacity;
  const isAlmostSoldOut = percentageSold >= 85;

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Event Capacity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main capacity counter */}
        <div className="text-center p-6 bg-muted rounded-lg">
          <div className="text-sm text-muted-foreground mb-2">Tickets Sold</div>
          <div className="text-5xl font-bold text-primary mb-1">
            {ticketsSold.toLocaleString()}
          </div>
          <div className="text-xl text-muted-foreground">
            / {capacity.toLocaleString()}
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Capacity</span>
            <span className="font-semibold">{percentageSold}% Full</span>
          </div>
          <Progress 
            value={percentageSold} 
            className="h-3"
          />
        </div>

        {/* Status message */}
        {isSoldOut ? (
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-center">
            <p className="font-bold text-destructive text-lg">SOLD OUT</p>
            <p className="text-sm text-muted-foreground mt-1">
              This event has reached maximum capacity
            </p>
          </div>
        ) : isAlmostSoldOut ? (
          <div className="p-4 bg-secondary/10 border border-secondary/20 rounded-lg text-center">
            <div className="flex items-center justify-center gap-2 text-secondary-foreground mb-1">
              <TrendingUp className="w-4 h-4" />
              <p className="font-bold">Selling Fast!</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Only {ticketsRemaining} ticket{ticketsRemaining !== 1 ? 's' : ''} remaining
            </p>
          </div>
        ) : (
          <div className="p-4 bg-primary/5 border border-primary/10 rounded-lg text-center">
            <p className="font-semibold text-primary">
              {ticketsRemaining.toLocaleString()} Tickets Available
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              General admission - first come, first served
            </p>
          </div>
        )}

        {/* Event info reminder */}
        <div className="pt-4 border-t text-sm text-muted-foreground space-y-1">
          <p>• General admission seating</p>
          <p>• Arrive early for best spots</p>
          <p>• Tickets are non-refundable</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CapacityDisplay;
