import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, MapPin, QrCode, TicketX } from "lucide-react";
import { useTickets } from "@/context/TicketContext";

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
          <div className="space-y-6">
            {tickets.map((ticket) => (
              <Card key={ticket.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
                  <CardTitle className="text-xl">{ticket.eventTitle}</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-semibold">Date & Time</p>
                          <p className="text-muted-foreground">
                            {ticket.date} at {ticket.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-semibold">Location</p>
                          <p className="text-muted-foreground">{ticket.location}</p>
                        </div>
                      </div>
                      {ticket.seatNumber && (
                        <div className="flex items-start gap-3">
                          <QrCode className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <p className="font-semibold">Seat</p>
                            <p className="text-muted-foreground">{ticket.seatNumber}</p>
                          </div>
                        </div>
                      )}
                      {ticket.quantity && (
                        <div className="flex items-start gap-3">
                          <QrCode className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <p className="font-semibold">Quantity</p>
                            <p className="text-muted-foreground">{ticket.quantity} ticket(s)</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-center justify-center bg-muted rounded-lg p-6">
                      <p className="text-sm font-semibold mb-3 text-center">
                        Scan at Entry
                      </p>
                      <img
                        src={ticket.qrCode}
                        alt="Ticket QR Code"
                        className="w-48 h-48 border-4 border-white shadow-lg rounded-lg"
                      />
                      <p className="text-xs text-muted-foreground mt-3">
                        Ticket ID: {ticket.id}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <TicketX className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No Tickets Yet</h3>
              <p className="text-muted-foreground mb-6">Start exploring events and purchase your first ticket!</p>
              <Button variant="gold" onClick={() => navigate("/")}>
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
