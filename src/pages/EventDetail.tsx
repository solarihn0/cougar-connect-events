import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, MapPin, Users, Heart } from "lucide-react";
import { useState } from "react";
import SeatingMap, { Section } from "@/components/SeatingMap";
import GeneralAdmission from "@/components/GeneralAdmission";
import { toast } from "sonner";
import { getEventById } from "@/lib/events";
import { useTickets } from "@/context/TicketContext";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addTickets } = useTickets();
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState<{ sectionId: string; seatId: string }[]>([]);
  const [generalAdmissionCount, setGeneralAdmissionCount] = useState(0);

  const event = getEventById(id || "");

  if (!event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
          <Button onClick={() => navigate("/")}>Back to Events</Button>
        </div>
      </div>
    );
  }

  // Mock venue sections for events with reserved seating
  const venueSections: Section[] = event.hasReservedSeating ? [
    {
      id: "section-a",
      name: "Section A",
      price: 45,
      color: "#FFD700",
      seats: Array.from({ length: 30 }, (_, i) => ({
        id: `a-${i}`,
        row: String.fromCharCode(65 + Math.floor(i / 6)),
        number: (i % 6) + 1,
        isAvailable: Math.random() > 0.3,
        x: 150 + (i % 6) * 25,
        y: 180 + Math.floor(i / 6) * 25,
      })),
    },
    {
      id: "section-b",
      name: "Section B",
      price: 35,
      color: "#C0C0C0",
      seats: Array.from({ length: 30 }, (_, i) => ({
        id: `b-${i}`,
        row: String.fromCharCode(65 + Math.floor(i / 6)),
        number: (i % 6) + 1,
        isAvailable: Math.random() > 0.3,
        x: 500 + (i % 6) * 25,
        y: 180 + Math.floor(i / 6) * 25,
      })),
    },
    {
      id: "section-c",
      name: "Section C",
      price: 25,
      color: "#CD7F32",
      seats: Array.from({ length: 40 }, (_, i) => ({
        id: `c-${i}`,
        row: String.fromCharCode(65 + Math.floor(i / 8)),
        number: (i % 8) + 1,
        isAvailable: Math.random() > 0.3,
        x: 150 + (i % 8) * 25,
        y: 350 + Math.floor(i / 8) * 25,
      })),
    },
    {
      id: "section-d",
      name: "Section D",
      price: 25,
      color: "#CD7F32",
      seats: Array.from({ length: 40 }, (_, i) => ({
        id: `d-${i}`,
        row: String.fromCharCode(65 + Math.floor(i / 8)),
        number: (i % 8) + 1,
        isAvailable: Math.random() > 0.3,
        x: 450 + (i % 8) * 25,
        y: 350 + Math.floor(i / 8) * 25,
      })),
    },
  ] : [];

  const handleSeatSelect = (sectionId: string, seatId: string) => {
    setSelectedSeats(prev => {
      const exists = prev.find(s => s.sectionId === sectionId && s.seatId === seatId);
      if (exists) {
        return prev.filter(s => !(s.sectionId === sectionId && s.seatId === seatId));
      }
      return [...prev, { sectionId, seatId }];
    });
  };

  const calculateTotal = () => {
    if (event.hasReservedSeating) {
      return selectedSeats.reduce((total, selected) => {
        const section = venueSections.find(s => s.id === selected.sectionId);
        return total + (section?.price || 0);
      }, 0);
    } else {
      const basePrice = parseInt(event.price.replace("$", "") || "0");
      return basePrice * generalAdmissionCount;
    }
  };

  const handleProceedToPayment = () => {
    if (event.hasReservedSeating && selectedSeats.length === 0) {
      toast.error("Please select at least one seat");
      return;
    }
    if (!event.hasReservedSeating && generalAdmissionCount === 0) {
      toast.error("Please select at least one ticket");
      return;
    }

    // Generate tickets
    const newTickets = event.hasReservedSeating
      ? selectedSeats.map((selected, idx) => {
          const section = venueSections.find(s => s.id === selected.sectionId);
          const seat = section?.seats.find(s => s.id === selected.seatId);
          return {
            id: `${Date.now()}-${idx}`,
            eventId: event.id,
            eventTitle: event.title,
            date: event.date,
            time: event.time,
            location: event.location,
            seatNumber: seat ? `${section?.name}, Row ${seat.row}, Seat ${seat.number}` : 'Reserved',
            qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TICKET-${event.id}-${selected.seatId}-${Date.now()}`,
            purchaseDate: new Date().toISOString(),
          };
        })
      : [{
          id: `${Date.now()}`,
          eventId: event.id,
          eventTitle: event.title,
          date: event.date,
          time: event.time,
          location: event.location,
          quantity: generalAdmissionCount,
          qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TICKET-${event.id}-GA-${Date.now()}`,
          purchaseDate: new Date().toISOString(),
        }];

    addTickets(newTickets);

    toast.success(`🎉 Tickets purchased! ${event.hasReservedSeating ? selectedSeats.length : generalAdmissionCount} ticket(s) added to My Tickets`);

    setTimeout(() => navigate("/my-tickets"), 1500);
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
              onClick={() => navigate("/")}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold">Event Details</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Event Image */}
        <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl mb-8">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-start justify-between">
              <div>
                <Badge className="mb-3">{event.category} - {event.subcategory}</Badge>
                <h1 className="text-4xl font-bold text-white mb-2">{event.title}</h1>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsFavorite(!isFavorite)}
                className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
              >
                <Heart className={`w-6 h-6 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Event Info */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-2xl font-bold">Event Information</h2>
                <p className="text-muted-foreground leading-relaxed">{event.description}</p>

                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Date</p>
                      <p className="text-muted-foreground">{event.date}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Time</p>
                      <p className="text-muted-foreground">{event.time}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Location</p>
                      <p className="text-muted-foreground">{event.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Ticket Type</p>
                      <p className="text-muted-foreground">{event.hasReservedSeating ? 'Reserved Seating' : 'General Admission'}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seating or General Admission */}
            {event.hasReservedSeating ? (
              <SeatingMap
                sections={venueSections}
                onSeatSelect={handleSeatSelect}
                selectedSeats={selectedSeats}
              />
            ) : (
              <GeneralAdmission
                price={parseInt(event.price.replace("$", "") || "0")}
                ticketCount={generalAdmissionCount}
                onTicketCountChange={setGeneralAdmissionCount}
                maxTickets={event.maxTickets || 10}
              />
            )}
          </div>

          {/* Purchase Card */}
          <div className="md:col-span-1">
            <Card className="sticky top-8 shadow-xl">
              <CardContent className="p-6 space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {event.hasReservedSeating ? "Starting from" : "Price per ticket"}
                  </p>
                  <p className="text-4xl font-bold text-primary">{event.price}</p>
                </div>

                {(event.hasReservedSeating ? selectedSeats.length > 0 : generalAdmissionCount > 0) && (
                  <div className="pt-4 border-t space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-semibold">${calculateTotal()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Service Fee</span>
                      <span className="font-semibold">$2.50</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="font-bold">Total</span>
                      <span className="font-bold text-2xl text-primary">
                        ${(calculateTotal() + 2.5).toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <Button 
                    variant="gold" 
                    size="lg" 
                    className="w-full"
                    onClick={handleProceedToPayment}
                    disabled={event.hasReservedSeating ? selectedSeats.length === 0 : generalAdmissionCount === 0}
                  >
                    Proceed to Payment
                  </Button>
                </div>

                {event.isAgeRestricted && (
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                    <p className="text-sm font-semibold text-destructive">
                      21+ Event - Age verification required
                    </p>
                  </div>
                )}

                <div className="pt-4 border-t space-y-2 text-sm text-muted-foreground">
                  <p>• Tickets are final sale</p>
                  <p>• Digital tickets sent via email</p>
                  <p>• Valid photo ID required at entry</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventDetail;
