import { Event } from "@/components/EventCard";

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Summer Music Festival 2024",
    category: "Music",
    subcategory: "Pop/Rock",
    date: "2024-07-15",
    time: "6:00 PM",
    location: "Central Park, New York",
    price: "$89",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop",
    isFeatured: true,
    isAgeRestricted: false,
  },
  {
    id: "2",
    title: "Lakers vs Warriors - NBA Finals",
    category: "Sport",
    subcategory: "Basketball",
    date: "2024-06-20",
    time: "8:00 PM",
    location: "Crypto.com Arena, Los Angeles",
    price: "$150",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=600&fit=crop",
    isFeatured: true,
    isAgeRestricted: false,
  },
  {
    id: "3",
    title: "Yoga & Meditation Workshop",
    category: "Lifestyle",
    subcategory: "Wellness",
    date: "2024-06-10",
    time: "10:00 AM",
    location: "Zen Studio, San Francisco",
    price: "$45",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
    isAgeRestricted: false,
  },
  {
    id: "4",
    title: "Electronic Dance Night",
    category: "Music",
    subcategory: "Electronic/EDM",
    date: "2024-07-01",
    time: "10:00 PM",
    location: "Warehouse District, Miami",
    price: "$65",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop",
    isAgeRestricted: true,
  },
  {
    id: "5",
    title: "Champions League Final",
    category: "Sport",
    subcategory: "Football",
    date: "2024-06-25",
    time: "3:00 PM",
    location: "Wembley Stadium, London",
    price: "$200",
    image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800&h=600&fit=crop",
    isFeatured: true,
    isAgeRestricted: false,
  },
  {
    id: "6",
    title: "Food & Wine Tasting Experience",
    category: "Lifestyle",
    subcategory: "Culinary",
    date: "2024-06-18",
    time: "7:00 PM",
    location: "Gourmet Plaza, Chicago",
    price: "$95",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
    isAgeRestricted: true,
  },
];

export interface EventDetail extends Event {
  description: string;
  hasReservedSeating: boolean;
  maxTickets?: number;
}

export const getEventById = (id: string): EventDetail | undefined => {
  const baseEvent = mockEvents.find(e => e.id === id);
  if (!baseEvent) return undefined;

  // Extended details for each event
  const eventDetails: Record<string, Partial<EventDetail>> = {
    "1": {
      description: "Join us for the biggest music festival of the summer! Featuring top artists from around the world performing across multiple stages.",
      hasReservedSeating: false,
      maxTickets: 10,
    },
    "2": {
      description: "Experience the intensity of NBA Finals basketball as the Lakers take on the Warriors in this epic showdown!",
      hasReservedSeating: true,
    },
    "3": {
      description: "Start your wellness journey with our comprehensive yoga and meditation workshop. Perfect for beginners and experienced practitioners.",
      hasReservedSeating: false,
      maxTickets: 5,
    },
    "4": {
      description: "Dance the night away with world-class DJs spinning the hottest electronic tracks. 21+ event with full bar service.",
      hasReservedSeating: false,
      maxTickets: 8,
    },
    "5": {
      description: "Witness football history at Wembley Stadium! The best teams in Europe compete for the ultimate trophy.",
      hasReservedSeating: true,
    },
    "6": {
      description: "Indulge in an evening of exquisite cuisine paired with fine wines, curated by renowned chefs and sommeliers.",
      hasReservedSeating: false,
      maxTickets: 6,
    },
  };

  return {
    ...baseEvent,
    description: eventDetails[id]?.description || "Experience this amazing event!",
    hasReservedSeating: eventDetails[id]?.hasReservedSeating ?? false,
    maxTickets: eventDetails[id]?.maxTickets,
  };
};
