import { Button } from "@/components/ui/button";
import { Music, Trophy, Heart, Filter } from "lucide-react";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  show21Plus: boolean;
  onToggle21Plus: () => void;
}

const categories = [
  { id: "all", label: "All Events", icon: Filter },
  { id: "Music", label: "Music", icon: Music },
  { id: "Sport", label: "Sport", icon: Trophy },
  { id: "Lifestyle", label: "Lifestyle", icon: Heart },
];

const CategoryFilter = ({
  selectedCategory,
  onCategoryChange,
  show21Plus,
  onToggle21Plus,
}: CategoryFilterProps) => {
  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;
          return (
            <Button
              key={category.id}
              variant={isSelected ? "gold" : "outline"}
              size="sm"
              onClick={() => onCategoryChange(category.id)}
              className="flex-shrink-0"
            >
              <Icon className="w-4 h-4" />
              {category.label}
            </Button>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant={show21Plus ? "destructive" : "ghost"}
          size="sm"
          onClick={onToggle21Plus}
          className="text-xs"
        >
          {show21Plus ? "Showing 21+ Only" : "Show All Ages"}
        </Button>
      </div>
    </div>
  );
};

export default CategoryFilter;
