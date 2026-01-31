import { CSSProperties } from 'react';
import { MenuItem } from '@/types/restaurant';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical, Edit, Trash2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MenuItemCardProps {
  item: MenuItem;
  onToggleAvailability: () => void;
  onEdit: () => void;
  onDelete: () => void;
  style?: CSSProperties;
}

export function MenuItemCard({ 
  item, 
  onToggleAvailability, 
  onEdit, 
  onDelete,
  style 
}: MenuItemCardProps) {
  return (
    <Card 
      className="card-hover group overflow-hidden border-0 shadow-card animate-fade-in"
      style={style}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Category Badge */}
        <span className="absolute left-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {item.category}
        </span>

        {/* Availability Badge */}
        <span className={cn(
          'absolute right-3 top-3 status-badge',
          item.isAvailable ? 'available-badge' : 'unavailable-badge'
        )}>
          {item.isAvailable ? 'Available' : 'Unavailable'}
        </span>

        {/* Price */}
        <div className="absolute bottom-3 left-3">
          <span className="font-display text-2xl font-bold text-white">
            ${item.price.toFixed(2)}
          </span>
        </div>

        {/* Actions Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="absolute bottom-3 right-3 h-8 w-8 rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onEdit}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={onDelete}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Content */}
      <CardContent className="p-4">
        <h3 className="font-display text-lg font-semibold text-foreground line-clamp-1">
          {item.name}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {item.description}
        </p>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{item.preparationTime} min</span>
          </div>

          {/* Availability Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {item.isAvailable ? 'In Stock' : 'Out'}
            </span>
            <Switch
              checked={item.isAvailable}
              onCheckedChange={onToggleAvailability}
              className="data-[state=checked]:bg-success"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
