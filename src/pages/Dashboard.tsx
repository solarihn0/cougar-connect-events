import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "@/components/EventCard";
import CategoryFilter from "@/components/CategoryFilter";
import DatePriceFilter from "@/components/DatePriceFilter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Ticket, Search, Settings, CalendarDays, TicketX } from "lucide-react";
import { mockEvents } from "@/lib/events";
import { useTickets } from "@/context/TicketContext";
const Dashboard = () => {
  const navigate = useNavigate();
  const { tickets } = useTickets();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [show21Plus, setShow21Plus] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  
  const maxEventPrice = Math.max(...mockEvents.map(e => {
    const priceStr = e.price.replace('$', '');
    return priceStr === 'Free' ? 0 : parseInt(priceStr);
  }));
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxEventPrice]);

  const filteredEvents = mockEvents.filter((event) => {
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
    const matches21Plus = !show21Plus || event.isAgeRestricted;
    const matchesSearch =
      searchQuery === "" ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Date filtering
    const eventDate = new Date(event.date);
    let matchesDate = true;
    
    if (dateRange.from && !dateRange.to) {
      // Single date selected - show events from this date onwards
      matchesDate = eventDate >= dateRange.from;
    } else if (dateRange.from && dateRange.to) {
      // Date range selected
      matchesDate = eventDate >= dateRange.from && eventDate <= dateRange.to;
    }
    
    // Price filtering
    const eventPrice = event.price === "Free" ? 0 : parseInt(event.price.replace("$", ""));
    const matchesPrice = eventPrice <= priceRange[1];
    
    return matchesCategory && matches21Plus && matchesSearch && matchesDate && matchesPrice;
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
                className="text-primary-foreground hover:bg-primary-foreground/10 relative"
              >
                {tickets.length > 0 ? (
                  <>
                    <CalendarDays className="w-5 h-5" />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {tickets.length}
                    </Badge>
                  </>
                ) : (
                  <TicketX className="w-5 h-5" />
                )}
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
        <div className="space-y-4">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            show21Plus={show21Plus}
            onToggle21Plus={() => setShow21Plus(!show21Plus)}
          />
          
          <DatePriceFilter
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            maxPrice={maxEventPrice}
          />
        </div>

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
