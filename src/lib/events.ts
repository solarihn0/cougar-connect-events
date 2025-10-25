import { Event } from "@/components/EventCard";

export type EventCategory = "Big Arena" | "Selected Seats" | "Max Capacity";

export const mockEvents: Event[] = [
  // BIG ARENA - TD Arena sports with interactive court map
  {
    id: "basketball-uncw",
    title: "Men's Basketball vs. UNC Wilmington",
    category: "Sport",
    subcategory: "Basketball",
    eventCategory: "Big Arena",
    date: "2025-02-08",
    time: "7:00 PM",
    location: "TD Arena, Charleston, SC",
    price: "$25",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=600&fit=crop",
    isFeatured: true,
  },
  {
    id: "basketball-elon",
    title: "Men's Basketball vs. Elon University",
    category: "Sport",
    subcategory: "Basketball",
    eventCategory: "Big Arena",
    date: "2025-01-11",
    time: "7:00 PM",
    location: "TD Arena, Charleston, SC",
    price: "$25",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=600&fit=crop",
    isFeatured: true,
  },
  {
    id: "volleyball-towson",
    title: "Women's Volleyball vs. Towson",
    category: "Sport",
    subcategory: "Volleyball",
    eventCategory: "Big Arena",
    date: "2025-10-10",
    time: "6:00 PM",
    location: "TD Arena, Charleston, SC",
    price: "$20",
    image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&h=600&fit=crop",
  },
  {
    id: "womens-basketball-delaware",
    title: "Women's Basketball vs. Delaware",
    category: "Sport",
    subcategory: "Basketball",
    eventCategory: "Big Arena",
    date: "2025-01-25",
    time: "2:00 PM",
    location: "TD Arena, Charleston, SC",
    price: "$20",
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800&h=600&fit=crop",
  },

  // SELECTED SEATS - Assigned seating with stage-oriented maps
  {
    id: "homecoming-noah-kahan",
    title: "CofC Homecoming Concert ft. Noah Kahan",
    category: "Music",
    subcategory: "Pop/Indie",
    eventCategory: "Selected Seats",
    date: "2025-10-24",
    time: "8:00 PM",
    location: "TD Arena, College of Charleston",
    price: "$55",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop",
    isFeatured: true,
  },
  {
    id: "spring-concert-mt-joy",
    title: "CofC Spring Concert ft. Mt. Joy & Flipturn",
    category: "Music",
    subcategory: "Indie Rock",
    eventCategory: "Selected Seats",
    date: "2025-04-18",
    time: "7:30 PM",
    location: "TD Arena, College of Charleston",
    price: "$50",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop",
    isFeatured: true,
  },
  {
    id: "jazz-festival",
    title: "Charleston Jazz Festival Opening Night",
    category: "Music",
    subcategory: "Jazz",
    eventCategory: "Selected Seats",
    date: "2025-01-23",
    time: "8:00 PM",
    location: "Charleston Music Hall",
    price: "$45",
    image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&h=600&fit=crop",
  },
  {
    id: "holiday-celebration",
    title: "CofC Holiday Music Celebration",
    category: "Music",
    subcategory: "Classical/Holiday",
    eventCategory: "Selected Seats",
    date: "2025-12-06",
    time: "7:00 PM",
    location: "Sottile Theatre, Charleston",
    price: "$35",
    image: "https://images.unsplash.com/photo-1476445704028-a36e0c798192?w=800&h=600&fit=crop",
  },
  {
    id: "spoleto-preview",
    title: "Charleston Spoleto Arts Preview",
    category: "Lifestyle",
    subcategory: "Arts & Theater",
    eventCategory: "Selected Seats",
    date: "2025-11-08",
    time: "7:30 PM",
    location: "Gaillard Center, Charleston",
    price: "$60",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&h=600&fit=crop",
  },
  {
    id: "indie-nights",
    title: "Indie Nights Live: Local Bands Showcase",
    category: "Music",
    subcategory: "Indie/Alternative",
    eventCategory: "Selected Seats",
    date: "2025-07-12",
    time: "9:00 PM",
    location: "Music Farm Charleston",
    price: "$25",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
    isAgeRestricted: true,
  },
  {
    id: "nye-bash",
    title: "Charleston New Year's Eve Bash",
    category: "Lifestyle",
    subcategory: "Party/Nightlife",
    eventCategory: "Selected Seats",
    date: "2025-12-31",
    time: "9:00 PM",
    location: "The Refinery, Charleston",
    price: "$75",
    image: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=800&h=600&fit=crop",
    isAgeRestricted: true,
    isFeatured: true,
  },
  {
    id: "wine-food-festival",
    title: "Charleston Wine + Food Festival",
    category: "Lifestyle",
    subcategory: "Food & Beverage",
    eventCategory: "Selected Seats",
    date: "2025-03-06",
    time: "5:00 PM",
    location: "Marion Square / Riverfront Park",
    price: "$95",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
    isAgeRestricted: true,
    isFeatured: true,
  },

  // MAX CAPACITY - General admission with capacity tracking
  {
    id: "baseball-citadel",
    title: "Men's Baseball vs. The Citadel",
    category: "Sport",
    subcategory: "Baseball",
    eventCategory: "Max Capacity",
    date: "2025-03-15",
    time: "2:00 PM",
    location: "Patriots Point Stadium, Mt. Pleasant, SC",
    price: "$15",
    image: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800&h=600&fit=crop",
    capacity: 5000,
    ticketsSold: 3450,
  },
  {
    id: "baseball-clemson",
    title: "Men's Baseball vs. Clemson",
    category: "Sport",
    subcategory: "Baseball",
    eventCategory: "Max Capacity",
    date: "2025-03-29",
    time: "4:00 PM",
    location: "Patriots Point Stadium, Mt. Pleasant, SC",
    price: "$20",
    image: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800&h=600&fit=crop",
    capacity: 5000,
    ticketsSold: 4200,
    isFeatured: true,
  },
  {
    id: "mens-soccer-elon",
    title: "Men's Soccer vs. Elon",
    category: "Sport",
    subcategory: "Soccer",
    eventCategory: "Max Capacity",
    date: "2025-10-18",
    time: "7:00 PM",
    location: "Ralph Lundy Field, Patriots Point, SC",
    price: "$12",
    image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800&h=600&fit=crop",
    capacity: 2500,
    ticketsSold: 1800,
  },
  {
    id: "womens-soccer-hofstra",
    title: "Women's Soccer vs. Hofstra",
    category: "Sport",
    subcategory: "Soccer",
    eventCategory: "Max Capacity",
    date: "2025-09-27",
    time: "6:00 PM",
    location: "Ralph Lundy Field, Patriots Point, SC",
    price: "$10",
    image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&h=600&fit=crop",
    capacity: 2500,
    ticketsSold: 1200,
  },
  {
    id: "softball-hofstra",
    title: "Women's Softball vs. Hofstra",
    category: "Sport",
    subcategory: "Softball",
    eventCategory: "Max Capacity",
    date: "2025-04-26",
    time: "1:00 PM",
    location: "Patriots Point Softball Stadium",
    price: "$10",
    image: "https://images.unsplash.com/photo-1622838214831-8a0e9b47de2c?w=800&h=600&fit=crop",
    capacity: 800,
    ticketsSold: 450,
  },
  {
    id: "womens-tennis",
    title: "Women's Tennis vs. Georgia Southern",
    category: "Sport",
    subcategory: "Tennis",
    eventCategory: "Max Capacity",
    date: "2025-03-30",
    time: "11:00 AM",
    location: "Patriots Point Tennis Center",
    price: "$8",
    image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&h=600&fit=crop",
    capacity: 600,
    ticketsSold: 200,
  },
  {
    id: "mens-tennis",
    title: "Men's Tennis vs. Georgia State",
    category: "Sport",
    subcategory: "Tennis",
    eventCategory: "Max Capacity",
    date: "2025-03-08",
    time: "1:00 PM",
    location: "Patriots Point Tennis Center",
    price: "$8",
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=600&fit=crop",
    capacity: 600,
    ticketsSold: 150,
  },
  {
    id: "womens-golf",
    title: "Women's Golf – Charleston Spring Invitational",
    category: "Sport",
    subcategory: "Golf",
    eventCategory: "Max Capacity",
    date: "2025-03-24",
    time: "9:00 AM",
    location: "RiverTowne Country Club, Mt. Pleasant, SC",
    price: "$15",
    image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&h=600&fit=crop",
    capacity: 800,
    ticketsSold: 320,
  },
  {
    id: "street-food-fair",
    title: "CofC Street Food Fair",
    category: "Lifestyle",
    subcategory: "Food & Community",
    eventCategory: "Max Capacity",
    date: "2025-02-15",
    time: "11:00 AM",
    location: "Cougar Mall, College of Charleston",
    price: "$5",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop",
    capacity: 1500,
    ticketsSold: 850,
  },
  {
    id: "craft-beer-festival",
    title: "Lowcountry Craft Beer Festival",
    category: "Lifestyle",
    subcategory: "Beer & Beverage",
    eventCategory: "Max Capacity",
    date: "2025-05-03",
    time: "3:00 PM",
    location: "Riverfront Park, North Charleston",
    price: "$40",
    image: "https://images.unsplash.com/photo-1436076863939-06870fe779c2?w=800&h=600&fit=crop",
    capacity: 3500,
    ticketsSold: 2100,
    isAgeRestricted: true,
    isFeatured: true,
  },
  {
    id: "pride-festival",
    title: "Charleston Pride Festival",
    category: "Lifestyle",
    subcategory: "Community & Pride",
    eventCategory: "Max Capacity",
    date: "2025-06-14",
    time: "12:00 PM",
    location: "King Street & Brittlebank Park",
    price: "$10",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=600&fit=crop",
    capacity: 6000,
    ticketsSold: 3800,
    isFeatured: true,
  },
  {
    id: "sunset-yoga",
    title: "CofC Sunset Yoga & Wellness Night",
    category: "Lifestyle",
    subcategory: "Wellness",
    eventCategory: "Max Capacity",
    date: "2025-06-05",
    time: "6:30 PM",
    location: "Cistern Yard, College of Charleston",
    price: "$15",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
    capacity: 400,
    ticketsSold: 180,
  },
  {
    id: "margarita-festival",
    title: "Charleston Margarita Festival",
    category: "Lifestyle",
    subcategory: "Food & Beverage",
    eventCategory: "Max Capacity",
    date: "2025-09-13",
    time: "4:00 PM",
    location: "Brittlebank Park",
    price: "$35",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&h=600&fit=crop",
    capacity: 2500,
    ticketsSold: 1650,
    isAgeRestricted: true,
  },
  {
    id: "art-walk",
    title: "Charleston Art Walk & Street Market",
    category: "Lifestyle",
    subcategory: "Arts & Culture",
    eventCategory: "Max Capacity",
    date: "2025-09-27",
    time: "10:00 AM",
    location: "French Quarter, Charleston",
    price: "$8",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=600&fit=crop",
    capacity: 1800,
    ticketsSold: 950,
  },
];

export type VenueLayout = 
  | "td-arena-court" 
  | "td-arena-concert" 
  | "theater" 
  | "club" 
  | "festival";

export interface EventDetail extends Event {
  description: string;
  hasReservedSeating: boolean;
  maxTickets?: number;
  venueLayout?: VenueLayout;
}

export const getEventById = (id: string): EventDetail | undefined => {
  const baseEvent = mockEvents.find(e => e.id === id);
  if (!baseEvent) return undefined;

  // Generate description based on event category
  let description = "";
  let hasReservedSeating = false;
  let venueLayout: VenueLayout | undefined;
  let maxTickets: number | undefined;

  switch (baseEvent.eventCategory) {
    case "Big Arena":
      // Basketball and volleyball at TD Arena with court layout
      description = `Experience the excitement live at TD Arena! Watch the Cougars compete in this thrilling ${baseEvent.subcategory} matchup. Interactive seating map lets you choose your perfect view of the action.`;
      hasReservedSeating = true;
      venueLayout = "td-arena-court";
      break;
    
    case "Selected Seats":
      // Concerts, theater, clubs with stage layouts
      if (baseEvent.location.includes("TD Arena")) {
        description = `An unforgettable concert experience at TD Arena! ${baseEvent.title} brings incredible energy to Charleston. Select your seats from our interactive venue map - the closer to the stage, the better!`;
        hasReservedSeating = true;
        venueLayout = "td-arena-concert";
      } else if (baseEvent.location.includes("Music Hall") || baseEvent.location.includes("Sottile") || baseEvent.location.includes("Gaillard")) {
        description = `An intimate performance in one of Charleston's premier venues. Experience world-class entertainment with excellent sightlines from every seat. Choose from Orchestra, Mezzanine, or Balcony sections.`;
        hasReservedSeating = true;
        venueLayout = "theater";
      } else if (baseEvent.location.includes("Music Farm") || baseEvent.location.includes("Refinery")) {
        description = `Live music in an intimate club setting! Get up close to the performers with general admission floor access or reserved gallery seating. Limited capacity ensures an amazing experience.`;
        hasReservedSeating = true;
        venueLayout = "club";
      } else {
        description = `A premium festival experience with designated seating zones. Choose from VIP, Reserved, or Lawn sections based on your preference and budget.`;
        hasReservedSeating = true;
        venueLayout = "festival";
      }
      break;
    
    case "Max Capacity":
      // General admission events
      if (baseEvent.category === "Sport") {
        description = `Cheer on the Cougars at this exciting ${baseEvent.subcategory} match! General admission seating - arrive early for the best spots. Great atmosphere and competitive action guaranteed.`;
      } else {
        description = `${baseEvent.title} - A can't-miss community event! General admission provides access to all activities and areas. Limited capacity, so secure your spot today!`;
      }
      hasReservedSeating = false;
      maxTickets = 10;
      break;
  }

  return {
    ...baseEvent,
    description,
    hasReservedSeating,
    venueLayout,
    maxTickets,
  };
};
