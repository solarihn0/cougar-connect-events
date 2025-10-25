import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { ZoomIn, ZoomOut, Maximize2, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TDArenaSection {
  id: string;
  name: string;
  displayNumber: string;
  basePrice: number;
  maxPrice?: number;
  type: "lower" | "upper" | "student";
  position: { x: number; y: number };
  angle: number;
  seats: ArenaSeat[];
}

export interface ArenaSeat {
  id: string;
  row: string;
  number: number;
  price: number;
  isAvailable: boolean;
  x: number;
  y: number;
}

interface TDArenaMapProps {
  sections: TDArenaSection[];
  onSeatSelect: (sectionId: string, seatId: string) => void;
  selectedSeats: { sectionId: string; seatId: string }[];
  maxSeats?: number;
}

const TDArenaMap = ({ sections, onSeatSelect, selectedSeats, maxSeats = 10 }: TDArenaMapProps) => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [hoveredSeat, setHoveredSeat] = useState<{ sectionId: string; seatId: string } | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [seatType, setSeatType] = useState<"all" | "standard" | "premium" | "student">("all");
  const [isLoadingSeats, setIsLoadingSeats] = useState(false);
  
  const svgRef = useRef<SVGSVGElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const minPrice = Math.min(...sections.flatMap(s => s.seats.map(seat => seat.price)));
  const maxPrice = Math.max(...sections.flatMap(s => s.seats.map(seat => seat.price)));

  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const isSeatSelected = (sectionId: string, seatId: string) => {
    return selectedSeats.some(s => s.sectionId === sectionId && s.seatId === seatId);
  };

  const handleSeatClick = (sectionId: string, seatId: string, isAvailable: boolean, price: number) => {
    if (!isAvailable) return;
    
    if (price < priceRange[0] || price > priceRange[1]) return;
    
    const isSelected = isSeatSelected(sectionId, seatId);
    if (!isSelected && selectedSeats.length >= maxSeats) return;
    
    onSeatSelect(sectionId, seatId);
  };

  const getSeatColor = (sectionId: string, seat: ArenaSeat) => {
    // Color scheme: Free = green, Selected = yellow, Sold = grey
    if (!seat.isAvailable) return "fill-muted/60 stroke-muted-foreground/20 cursor-not-allowed";
    if (isSeatSelected(sectionId, seat.id)) return "fill-yellow-400 stroke-yellow-600";
    return "fill-green-500 stroke-green-700";
  };

  const getSectionColor = (section: TDArenaSection) => {
    const avgPrice = section.basePrice;
    if (avgPrice >= 45) return "hsl(var(--primary))"; // Premium - maroon
    if (avgPrice >= 30) return "hsl(25 85% 55%)"; // Mid-premium - orange
    if (avgPrice >= 20) return "hsl(45 100% 51%)"; // Standard - gold
    return "hsl(210 100% 60%)"; // Economy - blue
  };

  const handleSectionClick = (sectionId: string) => {
    setIsLoadingSeats(true);
    setSelectedSection(sectionId);
    const section = sections.find(s => s.id === sectionId);
    if (section) {
      setZoom(3);
      setPan({ x: -section.position.x * 2, y: -section.position.y * 2 });
    }
    // Simulate loading for smooth transition
    setTimeout(() => setIsLoadingSeats(false), 150);
  };

  const resetView = () => {
    setSelectedSection(null);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (selectedSection) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const totalPrice = selectedSeats.reduce((sum, selected) => {
    const section = sections.find(s => s.id === selected.sectionId);
    const seat = section?.seats.find(s => s.id === selected.seatId);
    return sum + (seat?.price || 0);
  }, 0);

  const filteredSections = sections.filter(section => {
    if (seatType === "student" && section.type !== "student") return false;
    if (seatType === "premium" && section.basePrice < 45) return false;
    if (seatType === "standard" && (section.basePrice >= 45 || section.type === "student")) return false;
    return section.basePrice >= priceRange[0] && section.basePrice <= priceRange[1];
  });

  return (
    <div className="space-y-4">
      {/* Filters & Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>TD Arena Seating</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setZoom(Math.min(zoom + 0.5, 3))}>
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setZoom(Math.max(zoom - 0.5, 0.5))}>
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={resetView}>
                <Maximize2 className="w-4 h-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Price Range Filter */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </label>
            <Slider
              min={minPrice}
              max={maxPrice}
              step={1}
              value={priceRange}
              onValueChange={(value) => setPriceRange(value as [number, number])}
              className="w-full"
            />
          </div>

          {/* Seat Type Filter */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={seatType === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSeatType("all")}
            >
              All Seats
            </Button>
            <Button
              variant={seatType === "premium" ? "default" : "outline"}
              size="sm"
              onClick={() => setSeatType("premium")}
            >
              Premium ($45+)
            </Button>
            <Button
              variant={seatType === "standard" ? "default" : "outline"}
              size="sm"
              onClick={() => setSeatType("standard")}
            >
              Standard
            </Button>
            <Button
              variant={seatType === "student" ? "default" : "outline"}
              size="sm"
              onClick={() => setSeatType("student")}
            >
              Student Section
            </Button>
          </div>

          {/* Legend - Fixed color scheme: Free = green, Selected = yellow, Sold = grey */}
          <div className="flex flex-wrap gap-4 pt-4 border-t">
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
        </CardContent>
      </Card>

      {/* Arena Map */}
      <Card>
        <CardContent className="p-6">
          <div 
            className="relative w-full overflow-hidden bg-background rounded-lg border"
            style={{ height: "600px", cursor: isDragging ? "grabbing" : "grab" }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <svg
              ref={svgRef}
              viewBox="0 0 1000 800"
              className="w-full h-full"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transformOrigin: "center",
                transition: isDragging ? "none" : "transform 0.3s ease-out"
              }}
            >
              {/* Court - 15% larger, realistic basketball court (94ft x 50ft ratio = 1.88:1) */}
              <defs>
                <pattern id="courtTexture" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect width="20" height="20" fill="hsl(30 30% 45%)" />
                  <line x1="0" y1="10" x2="20" y2="10" stroke="hsl(30 25% 40%)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect
                x="310"
                y="270"
                width="380"
                height="260"
                fill="url(#courtTexture)"
                stroke="hsl(var(--primary))"
                strokeWidth="4"
                rx="6"
              />
              {/* Center court circle */}
              <circle cx="500" cy="400" r="60" fill="none" stroke="white" strokeWidth="3" />
              <line x1="500" y1="270" x2="500" y2="530" stroke="white" strokeWidth="3" />
              
              {/* College of Charleston "C" logo at center */}
              <circle cx="500" cy="400" r="35" fill="hsl(var(--primary))" stroke="white" strokeWidth="3" />
              <text x="500" y="420" textAnchor="middle" fill="white" fontSize="48" fontWeight="bold" fontFamily="serif">
                C
              </text>
              
              {/* Baseline text labels */}
              <text x="500" y="290" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" letterSpacing="3">
                CHARLESTON
              </text>
              <text x="500" y="520" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" letterSpacing="3">
                COUGARS
              </text>

              {/* Sections */}
              {!selectedSection && filteredSections.map((section) => {
                const isHovered = hoveredSection === section.id;
                const sectionColor = getSectionColor(section);
                
                return (
                  <g key={section.id}>
                    <rect
                      x={section.position.x}
                      y={section.position.y}
                      width="80"
                      height="60"
                      fill={sectionColor}
                      fillOpacity={isHovered ? 0.8 : 0.6}
                      stroke="hsl(var(--foreground))"
                      strokeWidth={isHovered ? 3 : 2}
                      rx="6"
                      className="cursor-pointer transition-all"
                      onClick={() => handleSectionClick(section.id)}
                      onMouseEnter={() => setHoveredSection(section.id)}
                      onMouseLeave={() => setHoveredSection(null)}
                    />
                    <text
                      x={section.position.x + 40}
                      y={section.position.y + 28}
                      textAnchor="middle"
                      fill="white"
                      fontSize="16"
                      fontWeight="bold"
                      pointerEvents="none"
                    >
                      {section.displayNumber}
                    </text>
                    <text
                      x={section.position.x + 40}
                      y={section.position.y + 45}
                      textAnchor="middle"
                      fill="white"
                      fontSize="12"
                      pointerEvents="none"
                    >
                      ${section.basePrice}{section.maxPrice ? `-$${section.maxPrice}` : ''}
                    </text>
                    
                    {/* Hover Tooltip with availability */}
                    {isHovered && (
                      <g>
                        <rect
                          x={section.position.x + 85}
                          y={section.position.y + 5}
                          width="140"
                          height="50"
                          fill="hsl(var(--popover))"
                          stroke="hsl(var(--border))"
                          strokeWidth="1"
                          rx="4"
                        />
                        <text
                          x={section.position.x + 155}
                          y={section.position.y + 22}
                          textAnchor="middle"
                          fill="hsl(var(--popover-foreground))"
                          fontSize="12"
                          fontWeight="bold"
                        >
                          {section.name}
                        </text>
                        <text
                          x={section.position.x + 155}
                          y={section.position.y + 36}
                          textAnchor="middle"
                          fill="hsl(var(--primary))"
                          fontSize="11"
                          fontWeight="bold"
                        >
                          ${section.basePrice}{section.maxPrice && section.maxPrice !== section.basePrice ? `-$${section.maxPrice}` : ''}
                        </text>
                        <text
                          x={section.position.x + 155}
                          y={section.position.y + 48}
                          textAnchor="middle"
                          fill="hsl(var(--muted-foreground))"
                          fontSize="10"
                        >
                          {section.seats.filter(s => s.isAvailable).length}/{section.seats.length} available
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* Seat-Level View */}
              {selectedSection && (() => {
                const section = sections.find(s => s.id === selectedSection);
                if (!section) return null;

                return (
                  <g>
                    {/* Section Background */}
                    <rect
                      x="200"
                      y="100"
                      width="600"
                      height="600"
                      fill="hsl(var(--card))"
                      stroke="hsl(var(--border))"
                      strokeWidth="2"
                      rx="8"
                    />
                    
                    {/* Section Title */}
                    <text x="500" y="140" textAnchor="middle" fontSize="24" fontWeight="bold" fill="hsl(var(--foreground))">
                      {section.name} - ${section.basePrice}{section.maxPrice ? `-$${section.maxPrice}` : ''}
                    </text>

                    {/* Loading indicator */}
                    {isLoadingSeats && (
                      <text x="500" y="400" textAnchor="middle" fontSize="16" fill="hsl(var(--muted-foreground))">
                        Loading seats...
                      </text>
                    )}

                    {/* Seats */}
                    {!isLoadingSeats && section.seats.map((seat) => {
                      const isSelected = isSeatSelected(section.id, seat.id);
                      const isHovered = hoveredSeat?.sectionId === section.id && hoveredSeat?.seatId === seat.id;
                      
                      return (
                        <g key={seat.id}>
                          <circle
                            cx={seat.x + 250}
                            cy={seat.y + 200}
                            r="12"
                            className={cn(
                              getSeatColor(section.id, seat),
                              seat.isAvailable && "cursor-pointer hover:opacity-90 transition-opacity"
                            )}
                            strokeWidth="1.5"
                            onClick={() => handleSeatClick(section.id, seat.id, seat.isAvailable, seat.price)}
                            onMouseEnter={() => setHoveredSeat({ sectionId: section.id, seatId: seat.id })}
                            onMouseLeave={() => setHoveredSeat(null)}
                          />
                          {isSelected && (
                            <text
                              x={seat.x + 250}
                              y={seat.y + 204}
                              textAnchor="middle"
                              fontSize="10"
                              fill="hsl(30 10% 20%)"
                              fontWeight="bold"
                              pointerEvents="none"
                            >
                              ✓
                            </text>
                          )}
                          
                          {/* Seat Tooltip - positioned to avoid obscuring neighbors */}
                          {isHovered && seat.isAvailable && (
                            <g pointerEvents="none">
                              <rect
                                x={seat.x + 265}
                                y={seat.y + 175}
                                width="110"
                                height="60"
                                fill="hsl(var(--popover))"
                                stroke="hsl(var(--border))"
                                strokeWidth="1"
                                rx="4"
                                filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
                              />
                              <text
                                x={seat.x + 320}
                                y={seat.y + 195}
                                textAnchor="middle"
                                fill="hsl(var(--popover-foreground))"
                                fontSize="11"
                                fontWeight="bold"
                              >
                                {section.displayNumber}
                              </text>
                              <text
                                x={seat.x + 320}
                                y={seat.y + 210}
                                textAnchor="middle"
                                fill="hsl(var(--muted-foreground))"
                                fontSize="10"
                              >
                                Row {seat.row}, Seat {seat.number}
                              </text>
                              <text
                                x={seat.x + 320}
                                y={seat.y + 226}
                                textAnchor="middle"
                                fill="hsl(var(--primary))"
                                fontSize="13"
                                fontWeight="bold"
                              >
                                ${seat.price}
                              </text>
                            </g>
                          )}
                        </g>
                      );
                    })}

                    {/* Back to All Sections Button */}
                    <g
                      className="cursor-pointer"
                      onClick={resetView}
                    >
                      <rect x="210" y="670" width="180" height="40" fill="hsl(var(--primary))" rx="6" />
                      <text x="300" y="695" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
                        ← Back to All Sections
                      </text>
                    </g>
                  </g>
                );
              })()}
            </svg>

            {/* Mini Map */}
            {selectedSection && (
              <div className="absolute top-4 right-4 w-32 h-24 bg-card border-2 border-border rounded overflow-hidden opacity-80">
                <svg viewBox="0 0 1000 800" className="w-full h-full">
                  <rect x="350" y="300" width="300" height="200" fill="hsl(var(--primary))" opacity="0.3" />
                  {sections.map((section) => (
                    <rect
                      key={section.id}
                      x={section.position.x}
                      y={section.position.y}
                      width="80"
                      height="60"
                      fill={section.id === selectedSection ? "hsl(var(--secondary))" : "hsl(var(--muted))"}
                      opacity={section.id === selectedSection ? 1 : 0.5}
                    />
                  ))}
                </svg>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Selection Summary */}
      {selectedSeats.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Selected Seats ({selectedSeats.length}/{maxSeats})</span>
              <Badge variant="secondary" className="text-lg font-bold">
                Total: ${totalPrice.toFixed(2)}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedSeats.map((selected) => {
                const section = sections.find(s => s.id === selected.sectionId);
                const seat = section?.seats.find(s => s.id === selected.seatId);
                return (
                  <Badge key={`${selected.sectionId}-${selected.seatId}`} variant="secondary">
                    {section?.displayNumber} - Row {seat?.row}{seat?.number} (${seat?.price})
                  </Badge>
                );
              })}
            </div>
            <Button className="w-full" size="lg">
              Proceed to Checkout - ${totalPrice.toFixed(2)}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TDArenaMap;
