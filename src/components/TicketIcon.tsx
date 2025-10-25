import { Armchair, UserCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TicketIconProps {
  eventCategory: 'Big Arena' | 'Selected Seats' | 'Max Capacity';
  status: 'selected' | 'purchased' | 'refunded';
  section?: string;
  row?: string;
  seat?: string;
  quantity?: number;
  size?: 'sm' | 'md' | 'lg';
}

const TicketIcon = ({ 
  eventCategory, 
  status, 
  section, 
  row, 
  seat, 
  quantity,
  size = 'md' 
}: TicketIconProps) => {
  // Color based on status
  const getStatusColor = () => {
    switch (status) {
      case 'selected':
        return 'text-yellow-400 border-yellow-400 bg-yellow-400/10';
      case 'purchased':
        return 'text-green-500 border-green-500 bg-green-500/10';
      case 'refunded':
        return 'text-muted border-muted-foreground/20 bg-muted/60';
      default:
        return 'text-primary border-primary bg-primary/10';
    }
  };

  const iconSize = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-16 h-16' : 'w-12 h-12';
  const textSize = size === 'sm' ? 'text-[6px]' : size === 'lg' ? 'text-xs' : 'text-[8px]';

  if (eventCategory === 'Max Capacity') {
    // GA badge with quantity
    return (
      <div className={cn("flex flex-col items-center gap-1", iconSize)}>
        <div className={cn(
          "rounded-lg border-2 p-2 flex items-center justify-center",
          getStatusColor()
        )}>
          <UserCircle className={size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-8 h-8' : 'w-6 h-6'} />
        </div>
        {quantity && (
          <span className={cn("font-bold", textSize)}>
            x{quantity} GA
          </span>
        )}
      </div>
    );
  }

  // Assigned seating (Big Arena / Selected Seats)
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className={cn(
        "rounded-lg border-2 p-2 flex items-center justify-center relative",
        getStatusColor(),
        iconSize
      )}>
        <Armchair className={size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-8 h-8' : 'w-6 h-6'} />
      </div>
      {section && row && seat && (
        <span className={cn("font-mono font-bold text-center whitespace-nowrap", textSize)}>
          {section} • {row} • {seat}
        </span>
      )}
    </div>
  );
};

export default TicketIcon;
