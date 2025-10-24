import { TDArenaSection, ArenaSeat } from "@/components/TDArenaMap";

// Generate realistic TD Arena section layout with proper pricing
export const getTDArenaLayout = (): TDArenaSection[] => {
  const sections: TDArenaSection[] = [];

  // Lower Bowl Sections (101-115) - arranged around court
  const lowerBowlLayout = [
    // Premium Courtside
    { id: "205", name: "Section 205", displayNumber: "205", basePrice: 52, maxPrice: 52, x: 460, y: 140, type: "lower" as const },
    
    // Sideline Lower (premium)
    { id: "115", name: "Section 115", displayNumber: "115", basePrice: 35, maxPrice: 35, x: 760, y: 220, type: "lower" as const },
    { id: "114", name: "Section 114", displayNumber: "114", basePrice: 34, maxPrice: 34, x: 760, y: 380, type: "lower" as const },
    { id: "113", name: "Section 113", displayNumber: "113", basePrice: 34, maxPrice: 34, x: 760, y: 540, type: "lower" as const },
    
    { id: "105", name: "Section 105", displayNumber: "105", basePrice: 35, maxPrice: 35, x: 160, y: 220, type: "lower" as const },
    { id: "106", name: "Section 106", displayNumber: "106", basePrice: 34, maxPrice: 34, x: 160, y: 380, type: "lower" as const },
    { id: "107", name: "Section 107", displayNumber: "107", basePrice: 34, maxPrice: 34, x: 160, y: 540, type: "lower" as const },
    
    // Corner Lower
    { id: "101", name: "Section 101", displayNumber: "101", basePrice: 29, maxPrice: 29, x: 260, y: 620, type: "lower" as const },
    { id: "102", name: "Section 102", displayNumber: "102", basePrice: 28, maxPrice: 28, x: 380, y: 640, type: "lower" as const },
    { id: "103", name: "Section 103", displayNumber: "103", basePrice: 28, maxPrice: 28, x: 540, y: 640, type: "lower" as const },
    { id: "104", name: "Section 104", displayNumber: "104", basePrice: 29, maxPrice: 29, x: 660, y: 620, type: "lower" as const },
    
    { id: "111", name: "Section 111", displayNumber: "111", basePrice: 29, maxPrice: 29, x: 660, y: 100, type: "lower" as const },
    { id: "112", name: "Section 112", displayNumber: "112", basePrice: 28, maxPrice: 28, x: 540, y: 80, type: "lower" as const },
    { id: "108", name: "Section 108", displayNumber: "108", basePrice: 28, maxPrice: 28, x: 380, y: 80, type: "lower" as const },
    { id: "109", name: "Section 109", displayNumber: "109", basePrice: 29, maxPrice: 29, x: 260, y: 100, type: "lower" as const },
  ];

  // Upper Bowl Sections (209-215) - elevated positions
  const upperBowlLayout = [
    { id: "209", name: "Section 209", displayNumber: "209", basePrice: 30, maxPrice: 30, x: 840, y: 280, type: "upper" as const },
    { id: "211", name: "Section 211", displayNumber: "211", basePrice: 23, maxPrice: 23, x: 840, y: 420, type: "upper" as const },
    
    { id: "214", name: "Section 214", displayNumber: "214", basePrice: 21, maxPrice: 21, x: 80, y: 280, type: "upper" as const },
    { id: "215", name: "Section 215", displayNumber: "215", basePrice: 19, maxPrice: 19, x: 80, y: 420, type: "upper" as const },
    
    { id: "210", name: "Section 210", displayNumber: "210", basePrice: 23, maxPrice: 23, x: 460, y: 60, type: "upper" as const },
    { id: "212", name: "Section 212", displayNumber: "212", basePrice: 20, maxPrice: 20, x: 460, y: 700, type: "upper" as const },
  ];

  // Student Sections (B11-B14) - GA areas
  const studentLayout = [
    { id: "B11", name: "Student Section B11", displayNumber: "B11", basePrice: 10, maxPrice: 10, x: 20, y: 160, type: "student" as const },
    { id: "B12", name: "Student Section B12", displayNumber: "B12", basePrice: 10, maxPrice: 10, x: 20, y: 580, type: "student" as const },
    { id: "B13", name: "Student Section B13", displayNumber: "B13", basePrice: 10, maxPrice: 10, x: 900, y: 160, type: "student" as const },
    { id: "B14", name: "Student Section B14", displayNumber: "B14", basePrice: 10, maxPrice: 10, x: 900, y: 580, type: "student" as const },
  ];

  // Generate seats for each section
  const allSections = [...lowerBowlLayout, ...upperBowlLayout, ...studentLayout];

  allSections.forEach((sectionData) => {
    const seats: ArenaSeat[] = [];
    const rows = sectionData.type === "student" ? 8 : 6;
    const seatsPerRow = sectionData.type === "student" ? 12 : 10;

    for (let r = 0; r < rows; r++) {
      for (let s = 0; s < seatsPerRow; s++) {
        const rowPrice = sectionData.basePrice + (r < 3 ? 2 : 0); // Front rows slightly more expensive
        seats.push({
          id: `${sectionData.id}-${r}-${s}`,
          row: String.fromCharCode(65 + r), // A, B, C, etc.
          number: s + 1,
          price: rowPrice,
          isAvailable: Math.random() > 0.35, // 65% available
          x: s * 35,
          y: r * 35,
        });
      }
    }

    sections.push({
      id: sectionData.id,
      name: sectionData.name,
      displayNumber: sectionData.displayNumber,
      basePrice: sectionData.basePrice,
      maxPrice: sectionData.maxPrice,
      type: sectionData.type,
      position: { x: sectionData.x, y: sectionData.y },
      angle: 0,
      seats,
    });
  });

  return sections;
};
