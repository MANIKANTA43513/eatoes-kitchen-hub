import { Order, OrderStatus } from '@/types/restaurant';
import { orderStatuses } from '@/data/sampleData';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface OrderRowProps {
  order: Order;
  onStatusChange: (status: OrderStatus) => void;
  onViewDetails: () => void;
}

export function OrderRow({ order, onStatusChange, onViewDetails }: OrderRowProps) {
  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <TableRow className="hover:bg-muted/50">
      <TableCell className="font-medium">{order.orderNumber}</TableCell>
      <TableCell>{order.customerName}</TableCell>
      <TableCell>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
          {order.tableNumber}
        </span>
      </TableCell>
      <TableCell>{totalItems} items</TableCell>
      <TableCell className="font-semibold">${order.totalAmount.toFixed(2)}</TableCell>
      <TableCell>
        <Select value={order.status} onValueChange={(value) => onStatusChange(value as OrderStatus)}>
          <SelectTrigger className={cn(
            'w-32 h-8 text-xs font-medium border-0',
            {
              'bg-warning/15 text-warning': order.status === 'Pending',
              'bg-info/15 text-info': order.status === 'Preparing',
              'bg-success/15 text-success': order.status === 'Ready',
              'bg-muted text-muted-foreground': order.status === 'Delivered',
              'bg-destructive/15 text-destructive': order.status === 'Cancelled',
            }
          )}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {orderStatuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="text-muted-foreground">
        {format(order.createdAt, 'HH:mm')}
      </TableCell>
      <TableCell className="text-right">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onViewDetails}
          className="h-8 gap-1.5"
        >
          <Eye className="h-4 w-4" />
          View
        </Button>
      </TableCell>
    </TableRow>
  );
}
