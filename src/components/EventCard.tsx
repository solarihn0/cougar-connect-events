import { Calendar, MapPin, Clock, Tag } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export interface Event {
  id: string;
  title: string;
  category: "Music" | "Sport" | "Lifestyle";
  subcategory: string;
  date: string;
  time: string;
  location: string;
  price: string;
  image: string;
  isAgeRestricted?: boolean;
  isFeatured?: boolean;
}

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const navigate = useNavigate();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Music":
        return "bg-purple-500/10 text-purple-700 border-purple-200";
      case "Sport":
        return "bg-primary/10 text-primary border-primary/20";
      case "Lifestyle":
        return "bg-blue-500/10 text-blue-700 border-blue-200";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer" onClick={() => navigate(`/event/${event.id}`)}>
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {event.isFeatured && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-secondary text-secondary-foreground shadow-lg">
              Featured
            </Badge>
          </div>
        )}
        {event.isAgeRestricted && (
          <div className="absolute top-3 left-3">
            <Badge variant="destructive" className="shadow-lg">
              21+
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors">
            {event.title}
          </h3>
          <Badge variant="outline" className={getCategoryColor(event.category)}>
            {event.category}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground">{event.subcategory}</p>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-primary" />
          <span className="font-bold text-lg text-primary">{event.price}</span>
        </div>
        <Button variant="gold" size="sm" onClick={(e) => {
          e.stopPropagation();
          navigate(`/event/${event.id}`);
        }}>
          Get Tickets
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
