import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EventCard, { Event } from "@/components/EventCard";
import CategoryFilter from "@/components/CategoryFilter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Ticket, Search, Settings, CalendarDays } from "lucide-react";

// Mock event data
const mockEvents: Event[] = [
  {
    id: "1",
    title: "Charleston Cougars vs Tigers - Basketball",
    category: "Sport",
    subcategory: "CofC Athletics - Men's Basketball",
    date: "Nov 15, 2025",
    time: "7:00 PM",
    location: "TD Arena, Charleston, SC",
    price: "$25",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=400&fit=crop",
    isFeatured: true,
  },
  {
    id: "2",
    title: "Jazz Night at the Pour House",
    category: "Music",
    subcategory: "Classical & Jazz",
    date: "Nov 18, 2025",
    time: "8:30 PM",
    location: "The Pour House, Charleston, SC",
    price: "$15",
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&h=400&fit=crop",
    isAgeRestricted: true,
  },
  {
    id: "3",
    title: "Craft Beer & Food Festival",
    category: "Lifestyle",
    subcategory: "Food & Drink",
    date: "Nov 20, 2025",
    time: "2:00 PM",
    location: "Waterfront Park, Charleston, SC",
    price: "$40",
    image: "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&h=400&fit=crop",
    isAgeRestricted: true,
    isFeatured: true,
  },
  {
    id: "4",
    title: "Morning Yoga on the Beach",
    category: "Lifestyle",
    subcategory: "Health & Wellness",
    date: "Nov 16, 2025",
    time: "6:30 AM",
    location: "Folly Beach, SC",
    price: "Free",
    image: "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=800&h=400&fit=crop",
  },
  {
    id: "5",
    title: "The Indie Rockers - Live Concert",
    category: "Music",
    subcategory: "Concerts & Live Shows",
    date: "Nov 22, 2025",
    time: "9:00 PM",
    location: "Music Farm, Charleston, SC",
    price: "$30",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=400&fit=crop",
  },
  {
    id: "6",
    title: "Women's Soccer Championship",
    category: "Sport",
    subcategory: "CofC Athletics - Women's Soccer",
    date: "Nov 19, 2025",
    time: "5:00 PM",
    location: "Ralph Muldrow Field, Charleston, SC",
    price: "$10",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=400&fit=crop",
    isFeatured: true,
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [show21Plus, setShow21Plus] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = mockEvents.filter((event) => {
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
    const matches21Plus = !show21Plus || event.isAgeRestricted;
    const matchesSearch =
      searchQuery === "" ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matches21Plus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-secondary text-secondary-foreground p-2 rounded-lg">
                <Ticket className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold">CougarTickets</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/my-tickets")}
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                <CalendarDays className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/settings")}
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-2xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold mb-2">Discover Events</h2>
          <p className="text-primary-foreground/90 mb-6">
            Find the best events in Charleston
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search events, venues, or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-white"
            />
          </div>
        </div>

        {/* Filters */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          show21Plus={show21Plus}
          onToggle21Plus={() => setShow21Plus(!show21Plus)}
        />

        {/* Events Grid */}
        <div>
          <h3 className="text-2xl font-bold mb-6">
            {selectedCategory === "all" ? "All Events" : `${selectedCategory} Events`}
            <span className="text-muted-foreground text-base ml-2">
              ({filteredEvents.length} events)
            </span>
          </h3>
          
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No events found matching your criteria
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
