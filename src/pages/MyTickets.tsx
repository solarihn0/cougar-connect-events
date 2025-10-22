import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, MapPin, QrCode } from "lucide-react";

interface Ticket {
  id: string;
  eventTitle: string;
  date: string;
  time: string;
  location: string;
  seatNumber: string;
  qrCode: string;
}

const mockTickets: Ticket[] = [
  {
    id: "1",
    eventTitle: "Charleston Cougars vs Tigers - Basketball",
    date: "Nov 15, 2025",
    time: "7:00 PM",
    location: "TD Arena, Charleston, SC",
    seatNumber: "Section A, Row 5, Seat 12",
    qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TICKET-001",
  },
  {
    id: "2",
    eventTitle: "Jazz Night at the Pour House",
    date: "Nov 18, 2025",
    time: "8:30 PM",
    location: "The Pour House, Charleston, SC",
    seatNumber: "General Admission",
    qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TICKET-002",
  },
];

const MyTickets = () => {
  const navigate = useNavigate();

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
        {mockTickets.length > 0 ? (
          <div className="space-y-6">
            {mockTickets.map((ticket) => (
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
                      <div className="flex items-start gap-3">
                        <QrCode className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-semibold">Seat</p>
                          <p className="text-muted-foreground">{ticket.seatNumber}</p>
                        </div>
                      </div>
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
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg mb-4">You don't have any tickets yet</p>
            <Button variant="gold" onClick={() => navigate("/")}>
              Browse Events
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default MyTickets;
