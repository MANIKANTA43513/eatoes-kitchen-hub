import { Order, OrderStatus } from '@/types/restaurant';
import { orderStatuses } from '@/data/sampleData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Clock, User, Hash } from 'lucide-react';

interface OrderDetailsModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (status: OrderStatus) => void;
}

export function OrderDetailsModal({ 
  order, 
  isOpen, 
  onClose, 
  onStatusChange 
}: OrderDetailsModalProps) {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            Order Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
              <Hash className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Order Number</p>
                <p className="font-semibold">{order.orderNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Customer</p>
                <p className="font-semibold">{order.customerName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
              <div className="flex h-5 w-5 items-center justify-center rounded bg-primary/20 text-xs font-bold text-primary">
                T{order.tableNumber}
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Table</p>
                <p className="font-semibold">Table {order.tableNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Time</p>
                <p className="font-semibold">{format(order.createdAt, 'MMM d, HH:mm')}</p>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Order Status</label>
            <Select value={order.status} onValueChange={(value) => onStatusChange(value as OrderStatus)}>
              <SelectTrigger className={cn(
                'w-full font-medium',
                {
                  'border-warning/50 bg-warning/10': order.status === 'Pending',
                  'border-info/50 bg-info/10': order.status === 'Preparing',
                  'border-success/50 bg-success/10': order.status === 'Ready',
                  'border-muted': order.status === 'Delivered',
                  'border-destructive/50 bg-destructive/10': order.status === 'Cancelled',
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
          </div>

          <Separator />

          {/* Order Items */}
          <div className="space-y-3">
            <h4 className="font-semibold">Order Items</h4>
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 rounded-lg bg-muted/50 p-3"
                >
                  <img
                    src={item.menuItem.imageUrl}
                    alt={item.menuItem.name}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.menuItem.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ${item.menuItem.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">${item.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Total */}
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Total Amount</span>
            <span className="font-display text-2xl font-bold text-primary">
              ${order.totalAmount.toFixed(2)}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
