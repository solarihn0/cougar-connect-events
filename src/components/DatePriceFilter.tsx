import { Button } from "@/components/ui/button";
import { Calendar, DollarSign } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Slider } from "@/components/ui/slider";
import { format } from "date-fns";

interface DatePriceFilterProps {
  dateRange: { from?: Date; to?: Date };
  onDateRangeChange: (range: { from?: Date; to?: Date }) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  maxPrice?: number;
}

const DatePriceFilter = ({
  dateRange,
  onDateRangeChange,
  priceRange,
  onPriceRangeChange,
  maxPrice = 200,
}: DatePriceFilterProps) => {
  const formatDateRange = () => {
    if (dateRange.from && dateRange.to) {
      return `${format(dateRange.from, "MMM d")} - ${format(dateRange.to, "MMM d")}`;
    }
    if (dateRange.from) {
      return `From ${format(dateRange.from, "MMM d")}`;
    }
    return "Any date";
  };

  const formatPriceRange = () => {
    if (priceRange[0] === 0 && priceRange[1] === maxPrice) {
      return "Any price";
    }
    return `$${priceRange[0]} - $${priceRange[1]}`;
  };

  return (
    <div className="flex flex-wrap gap-2">
      {/* Date Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="flex-shrink-0">
            <Calendar className="w-4 h-4" />
            {formatDateRange()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-4 space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Select Date Range</h4>
              <CalendarComponent
                mode="range"
                selected={dateRange.from && dateRange.to ? { from: dateRange.from, to: dateRange.to } : undefined}
                onSelect={(range) => {
                  if (range?.from || range?.to) {
                    onDateRangeChange({ from: range?.from, to: range?.to });
                  } else {
                    onDateRangeChange({});
                  }
                }}
                numberOfMonths={2}
                disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Quick picks:</p>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" onClick={() => onDateRangeChange({ from: new Date(), to: new Date() })}>Today</Button>
                <Button variant="outline" size="sm" onClick={() => {
                  const today = new Date();
                  const nextWeek = new Date(today);
                  nextWeek.setDate(today.getDate() + 7);
                  onDateRangeChange({ from: today, to: nextWeek });
                }}>Next 7 Days</Button>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => onDateRangeChange({})}
              >
                Clear
              </Button>
              <Button
                variant="default"
                size="sm"
                className="flex-1"
                onClick={() => {
                  // Close popover logic handled by Popover component
                }}
              >
                Apply
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Price Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="flex-shrink-0">
            <DollarSign className="w-4 h-4" />
            {formatPriceRange()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="start">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Price Range</h4>
              <div className="flex justify-between text-sm text-muted-foreground mb-4">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
              <Slider
                min={0}
                max={maxPrice}
                step={5}
                value={priceRange}
                onValueChange={(value) => onPriceRangeChange(value as [number, number])}
                className="mb-2"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => onPriceRangeChange([0, maxPrice])}
              >
                Clear
              </Button>
              <Button
                variant="default"
                size="sm"
                className="flex-1"
                onClick={() => {
                  // Close popover logic handled by Popover component
                }}
              >
                Apply
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePriceFilter;
