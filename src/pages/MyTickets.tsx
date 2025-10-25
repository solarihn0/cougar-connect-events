import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, MapPin, TicketX } from "lucide-react";
import { useTickets } from "@/context/TicketContext";
import TicketIcon from "@/components/TicketIcon";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const MyTickets = () => {
  const navigate = useNavigate();
  const { tickets } = useTickets();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold">My Tickets</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {tickets.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {tickets.map((ticket) => (
              <Dialog key={ticket.id}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-xl transition-shadow">
                    <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-1">{ticket.eventTitle}</CardTitle>
                          <Badge variant="secondary" className="mt-1">
                            {ticket.eventCategory}
                          </Badge>
                        </div>
                        <TicketIcon 
                          eventCategory={ticket.eventCategory}
                          status={ticket.status}
                          section={ticket.section}
                          row={ticket.row}
                          seat={ticket.seat}
                          quantity={ticket.quantity}
                          size="md"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{ticket.date} at {ticket.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{ticket.location}</span>
                        </div>
                        {ticket.seatNumber && (
                          <div className="text-sm font-semibold pt-2">
                            {ticket.seatNumber}
                          </div>
                        )}
                        {ticket.quantity && (
                          <div className="text-sm font-semibold pt-2">
                            {ticket.quantity} General Admission Ticket{ticket.quantity > 1 ? 's' : ''}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>

                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>{ticket.eventTitle}</DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    {/* QR Code */}
                    <div className="flex flex-col items-center bg-muted rounded-lg p-6">
                      <p className="text-sm font-semibold mb-3">Scan at Entry</p>
                      <img
                        src={ticket.qrCode}
                        alt="Ticket QR Code"
                        className="w-48 h-48 border-4 border-white shadow-lg rounded-lg"
                      />
                      <p className="text-xs text-muted-foreground mt-3">
                        Ticket ID: {ticket.id}
                      </p>
                    </div>

                    {/* Event Details */}
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-semibold">Date & Time</p>
                        <p className="text-muted-foreground">{ticket.date} at {ticket.time}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Location</p>
                        <p className="text-muted-foreground">{ticket.location}</p>
                      </div>
                      {ticket.seatNumber && (
                        <div>
                          <p className="text-sm font-semibold">Seat Information</p>
                          <p className="text-muted-foreground">{ticket.seatNumber}</p>
                        </div>
                      )}
                      {ticket.quantity && (
                        <div>
                          <p className="text-sm font-semibold">Quantity</p>
                          <p className="text-muted-foreground">{ticket.quantity} ticket(s)</p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-semibold">Total Paid</p>
                        <p className="text-lg font-bold text-primary">
                          ${ticket.quantity ? (ticket.price * ticket.quantity).toFixed(2) : ticket.price.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1" size="sm">
                        View Venue Map
                      </Button>
                      <Button variant="outline" className="flex-1" size="sm">
                        Transfer
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <TicketX className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No Tickets Yet</h3>
              <p className="text-muted-foreground mb-6">Start exploring events and purchase your first ticket!</p>
              <Button onClick={() => navigate("/")}>
                Browse Events
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default MyTickets;
