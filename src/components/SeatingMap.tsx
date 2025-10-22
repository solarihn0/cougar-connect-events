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
}

const SeatingMap = ({ sections, onSeatSelect, selectedSeats, maxSeats = 10 }: SeatingMapProps) => {
  const [hoveredSeat, setHoveredSeat] = useState<string | null>(null);

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
    if (!seat.isAvailable) return "fill-muted stroke-muted-foreground/20";
    if (isSeatSelected(sectionId, seat.id)) return "fill-secondary stroke-secondary-foreground";
    return "fill-green-500 stroke-green-700 hover:fill-green-400 cursor-pointer";
  };

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
          {/* Legend */}
          <div className="flex flex-wrap gap-4 mb-6 pb-4 border-b">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-500 border border-green-700"></div>
              <span className="text-sm">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-secondary border border-secondary-foreground"></div>
              <span className="text-sm">Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-muted border border-muted-foreground/20"></div>
              <span className="text-sm">Taken</span>
            </div>
          </div>

          {/* Venue Map SVG */}
          <div className="relative w-full overflow-x-auto">
            <svg
              viewBox="0 0 800 600"
              className="w-full max-w-4xl mx-auto"
              style={{ minWidth: "600px" }}
            >
              {/* Stage */}
              <rect
                x="200"
                y="50"
                width="400"
                height="60"
                fill="hsl(var(--primary))"
                rx="8"
              />
              <text
                x="400"
                y="85"
                textAnchor="middle"
                fill="hsl(var(--primary-foreground))"
                fontSize="20"
                fontWeight="bold"
              >
                STAGE
              </text>

              {/* Sections and Seats */}
              {sections.map((section) => (
                <g key={section.id}>
                  {/* Section Label */}
                  <text
                    x={section.seats[0]?.x - 20 || 0}
                    y={section.seats[0]?.y - 10 || 0}
                    fontSize="14"
                    fontWeight="bold"
                    fill="hsl(var(--foreground))"
                  >
                    {section.name} - ${section.price}
                  </text>

                  {/* Seats */}
                  {section.seats.map((seat) => {
                    const isSelected = isSeatSelected(section.id, seat.id);
                    const isHovered = hoveredSeat === `${section.id}-${seat.id}`;
                    
                    return (
                      <g key={seat.id}>
                        <circle
                          cx={seat.x}
                          cy={seat.y}
                          r="8"
                          className={getSeatColor(section.id, seat)}
                          strokeWidth="1.5"
                          onClick={() => handleSeatClick(section.id, seat.id, seat.isAvailable)}
                          onMouseEnter={() => setHoveredSeat(`${section.id}-${seat.id}`)}
                          onMouseLeave={() => setHoveredSeat(null)}
                          style={{ transition: "all 0.2s" }}
                        />
                        {isSelected && (
                          <text
                            x={seat.x}
                            y={seat.y + 1}
                            textAnchor="middle"
                            fontSize="8"
                            fill="hsl(var(--secondary-foreground))"
                            pointerEvents="none"
                          >
                            ✓
                          </text>
                        )}
                        {isHovered && seat.isAvailable && (
                          <text
                            x={seat.x}
                            y={seat.y - 15}
                            textAnchor="middle"
                            fontSize="10"
                            fill="hsl(var(--foreground))"
                            pointerEvents="none"
                          >
                            {seat.row}{seat.number}
                          </text>
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
                    <Badge key={`${selected.sectionId}-${selected.seatId}`} variant="secondary">
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
