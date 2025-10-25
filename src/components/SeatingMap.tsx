import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export interface Section {
  id: string;
  name: string;
  price: number;
  seats: Seat[];
  color: string;
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  isAvailable: boolean;
  x: number;
  y: number;
}

interface SeatingMapProps {
  sections: Section[];
  onSeatSelect: (sectionId: string, seatId: string) => void;
  selectedSeats: { sectionId: string; seatId: string }[];
  maxSeats?: number;
  showStage?: boolean;
}

const SeatingMap = ({ sections, onSeatSelect, selectedSeats, maxSeats = 10, showStage = false }: SeatingMapProps) => {
  const [hoveredSeat, setHoveredSeat] = useState<string | null>(null);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const isSeatSelected = (sectionId: string, seatId: string) => {
    return selectedSeats.some(s => s.sectionId === sectionId && s.seatId === seatId);
  };

  const handleSeatClick = (sectionId: string, seatId: string, isAvailable: boolean) => {
    if (!isAvailable) return;
    
    const isSelected = isSeatSelected(sectionId, seatId);
    if (!isSelected && selectedSeats.length >= maxSeats) {
      return; // Max seats reached
    }
    
    onSeatSelect(sectionId, seatId);
  };

  const getSeatColor = (sectionId: string, seat: Seat) => {
    // Color scheme: Free = green, Selected = yellow, Sold = grey
    if (!seat.isAvailable) {
      return "fill-muted/60 stroke-muted-foreground/20 cursor-not-allowed";
    }
    if (isSeatSelected(sectionId, seat.id)) {
      return "fill-yellow-400 stroke-yellow-600";
    }
    return "fill-green-500 stroke-green-700 hover:fill-green-400 cursor-pointer transition-colors";
  };

  const handleSectionClick = (sectionId: string) => {
    setSelectedSectionId(sectionId === selectedSectionId ? null : sectionId);
  };

  const visibleSections = selectedSectionId 
    ? sections.filter(s => s.id === selectedSectionId)
    : sections;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Select Your Seats</CardTitle>
          <p className="text-sm text-muted-foreground">
            Click on available seats to select (max {maxSeats} seats)
          </p>
        </CardHeader>
        <CardContent>
          {/* Legend - Fixed color scheme */}
          <div className="flex flex-wrap gap-4 mb-6 pb-4 border-b">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-green-700"></div>
              <span className="text-sm font-medium">Free</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-yellow-400 border-2 border-yellow-600"></div>
              <span className="text-sm font-medium">Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-muted/60 border-2 border-muted-foreground/20"></div>
              <span className="text-sm font-medium">Sold</span>
            </div>
          </div>

          {selectedSectionId && (
            <Button onClick={() => setSelectedSectionId(null)} variant="outline" size="sm" className="mb-4">
              ← Back to All Sections
            </Button>
          )}

          {/* Venue Map SVG */}
          <div className="relative w-full overflow-x-auto">
            <svg
              viewBox="0 0 800 600"
              className="w-full max-w-4xl mx-auto"
              style={{ minWidth: "600px" }}
            >
              {/* Stage or Court */}
              {showStage ? (
                // Stage for concerts/theater - realistic width, no seats behind
                <>
                  <rect
                    x="40"
                    y="180"
                    width="150"
                    height="240"
                    fill="hsl(var(--primary))"
                    stroke="hsl(var(--primary-foreground))"
                    strokeWidth="3"
                    rx="8"
                  />
                  <rect
                    x="50"
                    y="190"
                    width="130"
                    height="220"
                    fill="hsl(var(--primary)/0.8)"
                    rx="4"
                  />
                  <text
                    x="115"
                    y="310"
                    textAnchor="middle"
                    fill="white"
                    fontSize="28"
                    fontWeight="bold"
                    transform="rotate(-90 115 310)"
                  >
                    STAGE
                  </text>
                  {/* Stage curtain effect */}
                  <line x1="40" y1="180" x2="190" y2="180" stroke="hsl(var(--primary-foreground))" strokeWidth="2" />
                  <line x1="40" y1="420" x2="190" y2="420" stroke="hsl(var(--primary-foreground))" strokeWidth="2" />
                </>
              ) : (
                // Court for sports (not used in SeatingMap, but kept for consistency)
                <>
                  <rect
                    x="300"
                    y="200"
                    width="200"
                    height="150"
                    fill="hsl(var(--primary)/0.15)"
                    stroke="hsl(var(--primary))"
                    strokeWidth="3"
                    rx="4"
                  />
                  <line
                    x1="400"
                    y1="200"
                    x2="400"
                    y2="350"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                  />
                  <text
                    x="400"
                    y="285"
                    textAnchor="middle"
                    fill="hsl(var(--primary))"
                    fontSize="20"
                    fontWeight="bold"
                  >
                    COURT
                  </text>
                </>
              )}

              {/* Sections and Seats */}
              {!selectedSectionId && sections.map((section) => {
                const availableSeats = section.seats.filter(s => s.isAvailable).length;
                const sectionIsHovered = hoveredSection === section.id;
                
                return (
                  <g key={section.id}>
                    {/* Section polygon */}
                    <rect
                      x={section.seats[0]?.x - 25 || 0}
                      y={section.seats[0]?.y - 25 || 0}
                      width={Math.max(...section.seats.map(s => s.x)) - Math.min(...section.seats.map(s => s.x)) + 50}
                      height={Math.max(...section.seats.map(s => s.y)) - Math.min(...section.seats.map(s => s.y)) + 50}
                      fill={section.color}
                      fillOpacity={sectionIsHovered ? 0.4 : 0.25}
                      stroke={section.color}
                      strokeWidth={sectionIsHovered ? 3 : 2}
                      rx="8"
                      className="cursor-pointer transition-all"
                      onClick={() => handleSectionClick(section.id)}
                      onMouseEnter={() => setHoveredSection(section.id)}
                      onMouseLeave={() => setHoveredSection(null)}
                    />
                    
                    {/* Price pin */}
                    <text
                      x={section.seats[0]?.x + 20 || 0}
                      y={section.seats[0]?.y || 0}
                      fontSize="16"
                      fontWeight="bold"
                      fill="white"
                      pointerEvents="none"
                    >
                      ${section.price}
                    </text>

                    {/* Hover tooltip */}
                    {sectionIsHovered && (
                      <g pointerEvents="none">
                        <rect
                          x={section.seats[0]?.x + 50 || 0}
                          y={section.seats[0]?.y - 30 || 0}
                          width="160"
                          height="60"
                          fill="hsl(var(--popover))"
                          stroke="hsl(var(--border))"
                          strokeWidth="1"
                          rx="6"
                          filter="drop-shadow(0 2px 8px rgba(0,0,0,0.15))"
                        />
                        <text
                          x={(section.seats[0]?.x || 0) + 130}
                          y={(section.seats[0]?.y || 0) - 10}
                          textAnchor="middle"
                          fill="hsl(var(--popover-foreground))"
                          fontSize="13"
                          fontWeight="bold"
                        >
                          {section.name}
                        </text>
                        <text
                          x={(section.seats[0]?.x || 0) + 130}
                          y={(section.seats[0]?.y || 0) + 5}
                          textAnchor="middle"
                          fill="hsl(var(--primary))"
                          fontSize="12"
                          fontWeight="bold"
                        >
                          ${section.price}
                        </text>
                        <text
                          x={(section.seats[0]?.x || 0) + 130}
                          y={(section.seats[0]?.y || 0) + 20}
                          textAnchor="middle"
                          fill="hsl(var(--muted-foreground))"
                          fontSize="11"
                        >
                          {availableSeats}/{section.seats.length} available
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* Seat-level view for selected section */}
              {selectedSectionId && visibleSections.map((section) => (
                <g key={section.id}>
                  {/* Section Title */}
                  <text x="400" y="80" textAnchor="middle" fontSize="22" fontWeight="bold" fill="hsl(var(--foreground))">
                    {section.name} - ${section.price}
                  </text>

                  {/* Seats - stable size, only color changes */}
                  {section.seats.map((seat) => {
                    const isSelected = isSeatSelected(section.id, seat.id);
                    const isHovered = hoveredSeat === `${section.id}-${seat.id}`;
                    
                    return (
                      <g key={seat.id}>
                        <circle
                          cx={seat.x}
                          cy={seat.y}
                          r="10"
                          className={getSeatColor(section.id, seat)}
                          strokeWidth="1.5"
                          onClick={() => handleSeatClick(section.id, seat.id, seat.isAvailable)}
                          onMouseEnter={() => setHoveredSeat(`${section.id}-${seat.id}`)}
                          onMouseLeave={() => setHoveredSeat(null)}
                        />
                        {isSelected && (
                          <text
                            x={seat.x}
                            y={seat.y + 1}
                            textAnchor="middle"
                            fontSize="9"
                            fill="hsl(30 10% 20%)"
                            fontWeight="bold"
                            pointerEvents="none"
                          >
                            ✓
                          </text>
                        )}
                        {isHovered && seat.isAvailable && (
                          <g pointerEvents="none">
                            <rect
                              x={seat.x + 15}
                              y={seat.y - 25}
                              width="100"
                              height="50"
                              fill="hsl(var(--popover))"
                              stroke="hsl(var(--border))"
                              strokeWidth="1"
                              rx="4"
                              filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
                            />
                            <text
                              x={seat.x + 65}
                              y={seat.y - 8}
                              textAnchor="middle"
                              fontSize="11"
                              fill="hsl(var(--popover-foreground))"
                              fontWeight="bold"
                            >
                              {section.name}
                            </text>
                            <text
                              x={seat.x + 65}
                              y={seat.y + 5}
                              textAnchor="middle"
                              fontSize="10"
                              fill="hsl(var(--muted-foreground))"
                            >
                              Row {seat.row}, Seat {seat.number}
                            </text>
                            <text
                              x={seat.x + 65}
                              y={seat.y + 18}
                              textAnchor="middle"
                              fontSize="12"
                              fill="hsl(var(--primary))"
                              fontWeight="bold"
                            >
                              ${section.price}
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })}
                </g>
              ))}
            </svg>
          </div>

          {/* Selected Seats Summary */}
          {selectedSeats.length > 0 && (
            <div className="mt-6 pt-6 border-t">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Check className="w-4 h-4" />
                Selected Seats ({selectedSeats.length}/{maxSeats})
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedSeats.map((selected) => {
                  const section = sections.find(s => s.id === selected.sectionId);
                  const seat = section?.seats.find(s => s.id === selected.seatId);
                  return (
                  <Badge key={`${selected.sectionId}-${selected.seatId}`} className="bg-yellow-400 text-yellow-900 border-yellow-600">
                    {section?.name} - Row {seat?.row}{seat?.number} (${section?.price})
                  </Badge>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SeatingMap;
