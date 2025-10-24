import { Section } from "@/components/SeatingMap";

// Color scheme: Selected = yellow, Sold = grey, Free = green
// Using semantic colors from design system

export const getTDArenaCourtLayout = (): Section[] => {
  // TD Arena with basketball court in center
  // Sections: Floor (closest), Lower Bowl, Mid Bowl, Upper Bowl
  return [
    {
      id: "floor-section",
      name: "Floor Section",
      price: 85,
      color: "hsl(45 100% 51%)", // Gold
      seats: Array.from({ length: 24 }, (_, i) => ({
        id: `floor-${i}`,
        row: String.fromCharCode(65 + Math.floor(i / 8)),
        number: (i % 8) + 1,
        isAvailable: Math.random() > 0.4,
        x: 250 + (i % 8) * 30,
        y: 150 + Math.floor(i / 8) * 30,
      })),
    },
    {
      id: "lower-bowl-east",
      name: "Lower Bowl East",
      price: 65,
      color: "hsl(210 100% 60%)", // Blue
      seats: Array.from({ length: 40 }, (_, i) => ({
        id: `lower-e-${i}`,
        row: String.fromCharCode(65 + Math.floor(i / 8)),
        number: (i % 8) + 1,
        isAvailable: Math.random() > 0.3,
        x: 520 + (i % 8) * 25,
        y: 120 + Math.floor(i / 8) * 25,
      })),
    },
    {
      id: "lower-bowl-west",
      name: "Lower Bowl West",
      price: 65,
      color: "hsl(210 100% 60%)", // Blue
      seats: Array.from({ length: 40 }, (_, i) => ({
        id: `lower-w-${i}`,
        row: String.fromCharCode(65 + Math.floor(i / 8)),
        number: (i % 8) + 1,
        isAvailable: Math.random() > 0.3,
        x: 80 + (i % 8) * 25,
        y: 120 + Math.floor(i / 8) * 25,
      })),
    },
    {
      id: "mid-bowl-east",
      name: "Mid Bowl East",
      price: 45,
      color: "hsl(120 60% 50%)", // Green
      seats: Array.from({ length: 48 }, (_, i) => ({
        id: `mid-e-${i}`,
        row: String.fromCharCode(65 + Math.floor(i / 8)),
        number: (i % 8) + 1,
        isAvailable: Math.random() > 0.25,
        x: 580 + (i % 8) * 22,
        y: 100 + Math.floor(i / 8) * 22,
      })),
    },
    {
      id: "mid-bowl-west",
      name: "Mid Bowl West",
      price: 45,
      color: "hsl(120 60% 50%)", // Green
      seats: Array.from({ length: 48 }, (_, i) => ({
        id: `mid-w-${i}`,
        row: String.fromCharCode(65 + Math.floor(i / 8)),
        number: (i % 8) + 1,
        isAvailable: Math.random() > 0.25,
        x: 20 + (i % 8) * 22,
        y: 100 + Math.floor(i / 8) * 22,
      })),
    },
    {
      id: "upper-bowl",
      name: "Upper Bowl",
      price: 25,
      color: "hsl(280 60% 60%)", // Purple
      seats: Array.from({ length: 64 }, (_, i) => ({
        id: `upper-${i}`,
        row: String.fromCharCode(65 + Math.floor(i / 16)),
        number: (i % 16) + 1,
        isAvailable: Math.random() > 0.2,
        x: 100 + (i % 16) * 28,
        y: 50 + Math.floor(i / 16) * 20,
      })),
    },
  ];
};

export const getTDArenaConcertLayout = (): Section[] => {
  // TD Arena with stage at one end (west)
  // GA pit on floor + tiered seating
  return [
    {
      id: "ga-pit",
      name: "GA Pit (Standing)",
      price: 75,
      color: "hsl(45 100% 51%)", // Gold
      seats: Array.from({ length: 20 }, (_, i) => ({
        id: `pit-${i}`,
        row: String.fromCharCode(65 + Math.floor(i / 10)),
        number: (i % 10) + 1,
        isAvailable: Math.random() > 0.5,
        x: 120 + (i % 10) * 30,
        y: 200 + Math.floor(i / 10) * 35,
      })),
    },
    {
      id: "floor-reserved",
      name: "Floor Reserved",
      price: 60,
      color: "hsl(210 100% 60%)", // Blue
      seats: Array.from({ length: 40 }, (_, i) => ({
        id: `floor-res-${i}`,
        row: String.fromCharCode(65 + Math.floor(i / 10)),
        number: (i % 10) + 1,
        isAvailable: Math.random() > 0.35,
        x: 150 + (i % 10) * 28,
        y: 280 + Math.floor(i / 10) * 28,
      })),
    },
    {
      id: "lower-bowl-concert",
      name: "Lower Bowl",
      price: 45,
      color: "hsl(120 60% 50%)", // Green
      seats: Array.from({ length: 50 }, (_, i) => ({
        id: `lower-con-${i}`,
        row: String.fromCharCode(65 + Math.floor(i / 10)),
        number: (i % 10) + 1,
        isAvailable: Math.random() > 0.3,
        x: 200 + (i % 10) * 26,
        y: 350 + Math.floor(i / 10) * 26,
      })),
    },
    {
      id: "upper-bowl-concert",
      name: "Upper Bowl",
      price: 30,
      color: "hsl(280 60% 60%)", // Purple
      seats: Array.from({ length: 60 }, (_, i) => ({
        id: `upper-con-${i}`,
        row: String.fromCharCode(65 + Math.floor(i / 12)),
        number: (i % 12) + 1,
        isAvailable: Math.random() > 0.25,
        x: 150 + (i % 12) * 30,
        y: 420 + Math.floor(i / 12) * 24,
      })),
    },
  ];
};

export const getTheaterLayout = (): Section[] => {
  // Theater with proscenium stage
  // Orchestra (front/premium), Mezzanine, Balcony
  return [
    {
      id: "orchestra",
      name: "Orchestra",
      price: 75,
      color: "hsl(45 100% 51%)", // Gold
      seats: Array.from({ length: 48 }, (_, i) => ({
        id: `orch-${i}`,
        row: String.fromCharCode(65 + Math.floor(i / 12)),
        number: (i % 12) + 1,
        isAvailable: Math.random() > 0.4,
        x: 200 + (i % 12) * 30,
        y: 300 + Math.floor(i / 12) * 30,
      })),
    },
    {
      id: "mezzanine",
      name: "Mezzanine",
      price: 55,
      color: "hsl(210 100% 60%)", // Blue
      seats: Array.from({ length: 36 }, (_, i) => ({
        id: `mezz-${i}`,
        row: String.fromCharCode(65 + Math.floor(i / 12)),
        number: (i % 12) + 1,
        isAvailable: Math.random() > 0.3,
        x: 220 + (i % 12) * 28,
        y: 420 + Math.floor(i / 12) * 28,
      })),
    },
    {
      id: "balcony",
      name: "Balcony",
      price: 35,
      color: "hsl(120 60% 50%)", // Green
      seats: Array.from({ length: 30 }, (_, i) => ({
        id: `balc-${i}`,
        row: String.fromCharCode(65 + Math.floor(i / 10)),
        number: (i % 10) + 1,
        isAvailable: Math.random() > 0.2,
        x: 250 + (i % 10) * 28,
        y: 500 + Math.floor(i / 10) * 26,
      })),
    },
  ];
};

export const getClubLayout = (): Section[] => {
  // Club venue: GA floor + small reserved gallery
  return [
    {
      id: "ga-floor",
      name: "GA Floor",
      price: 35,
      color: "hsl(45 100% 51%)", // Gold
      seats: Array.from({ length: 30 }, (_, i) => ({
        id: `ga-${i}`,
        row: String.fromCharCode(65 + Math.floor(i / 10)),
        number: (i % 10) + 1,
        isAvailable: Math.random() > 0.5,
        x: 250 + (i % 10) * 30,
        y: 250 + Math.floor(i / 10) * 35,
      })),
    },
    {
      id: "reserved-gallery",
      name: "Reserved Gallery",
      price: 50,
      color: "hsl(210 100% 60%)", // Blue
      seats: Array.from({ length: 20 }, (_, i) => ({
        id: `gallery-${i}`,
        row: String.fromCharCode(65 + Math.floor(i / 10)),
        number: (i % 10) + 1,
        isAvailable: Math.random() > 0.35,
        x: 150 + (i % 10) * 28,
        y: 200 + Math.floor(i / 10) * 28,
      })),
    },
  ];
};

export const getFestivalLayout = (): Section[] => {
  // Festival grounds: VIP, Reserved, Lawn/GA
  return [
    {
      id: "vip-section",
      name: "VIP Zone",
      price: 95,
      color: "hsl(45 100% 51%)", // Gold
      seats: Array.from({ length: 24 }, (_, i) => ({
        id: `vip-${i}`,
        row: String.fromCharCode(65 + Math.floor(i / 8)),
        number: (i % 8) + 1,
        isAvailable: Math.random() > 0.5,
        x: 280 + (i % 8) * 32,
        y: 200 + Math.floor(i / 8) * 32,
      })),
    },
    {
      id: "reserved-grandstand",
      name: "Reserved Grandstand",
      price: 65,
      color: "hsl(210 100% 60%)", // Blue
      seats: Array.from({ length: 40 }, (_, i) => ({
        id: `reserved-${i}`,
        row: String.fromCharCode(65 + Math.floor(i / 10)),
        number: (i % 10) + 1,
        isAvailable: Math.random() > 0.35,
        x: 220 + (i % 10) * 32,
        y: 280 + Math.floor(i / 10) * 30,
      })),
    },
    {
      id: "lawn-ga",
      name: "Lawn / GA",
      price: 40,
      color: "hsl(120 60% 50%)", // Green
      seats: Array.from({ length: 50 }, (_, i) => ({
        id: `lawn-${i}`,
        row: String.fromCharCode(65 + Math.floor(i / 10)),
        number: (i % 10) + 1,
        isAvailable: Math.random() > 0.25,
        x: 200 + (i % 10) * 35,
        y: 380 + Math.floor(i / 10) * 28,
      })),
    },
  ];
};
