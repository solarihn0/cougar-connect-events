import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, MapPin, Users, Heart } from "lucide-react";
import { useState } from "react";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock event data - in real app, fetch by ID
  const event = {
    id,
    title: "Charleston Cougars vs Tigers - Basketball",
    category: "Sport",
    subcategory: "CofC Athletics - Men's Basketball",
    date: "Nov 15, 2025",
    time: "7:00 PM",
    location: "TD Arena, Charleston, SC",
    price: "$25",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&h=600&fit=crop",
    description:
      "Join us for an exciting basketball matchup as the Charleston Cougars take on the Tigers! Experience the energy and excitement of college basketball at its finest. This is a must-see event for all sports fans in Charleston.",
    capacity: "2,500 seats",
    isAgeRestricted: false,
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
                <Badge className="mb-3">{event.category}</Badge>
                <h1 className="text-4xl font-bold text-white mb-2">{event.title}</h1>
                <p className="text-white/90">{event.subcategory}</p>
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
                      <p className="font-semibold">Capacity</p>
                      <p className="text-muted-foreground">{event.capacity}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Purchase Card */}
          <div className="md:col-span-1">
            <Card className="sticky top-8 shadow-xl">
              <CardContent className="p-6 space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Starting from</p>
                  <p className="text-4xl font-bold text-primary">{event.price}</p>
                </div>

                <div className="space-y-3">
                  <Button variant="gold" size="lg" className="w-full">
                    Select Seats
                  </Button>
                  <Button variant="outline" size="lg" className="w-full">
                    View Seating Map
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
                  <p>• Tickets are non-refundable</p>
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
