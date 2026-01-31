import { useRestaurant } from '@/context/RestaurantContext';
import { 
  DollarSign, 
  ClipboardList, 
  UtensilsCrossed, 
  CheckCircle,
  Clock,
  TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const Dashboard = () => {
  const { stats, orders, menuItems } = useRestaurant();

  const statCards = [
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      trend: '+12.5%',
      trendUp: true,
      bgClass: 'bg-success/10',
      iconClass: 'text-success',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toString(),
      icon: ClipboardList,
      trend: '+8 today',
      trendUp: true,
      bgClass: 'bg-info/10',
      iconClass: 'text-info',
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders.toString(),
      icon: Clock,
      trend: 'Needs attention',
      trendUp: false,
      bgClass: 'bg-warning/10',
      iconClass: 'text-warning',
    },
    {
      title: 'Menu Items',
      value: `${stats.availableItems}/${stats.menuItemsCount}`,
      icon: UtensilsCrossed,
      trend: 'Available',
      trendUp: true,
      bgClass: 'bg-primary/10',
      iconClass: 'text-primary',
    },
  ];

  const recentOrders = orders.slice(0, 5);

  const topItems = menuItems
    .filter(item => item.isAvailable)
    .slice(0, 5);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <Card key={stat.title} className="card-hover border-0 shadow-card" style={{ animationDelay: `${index * 50}ms` }}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="mt-2 font-display text-3xl font-bold text-foreground">{stat.value}</p>
                  <div className={cn(
                    'mt-2 inline-flex items-center gap-1 text-xs font-medium',
                    stat.trendUp ? 'text-success' : 'text-warning'
                  )}>
                    {stat.trendUp && <TrendingUp className="h-3 w-3" />}
                    {stat.trend}
                  </div>
                </div>
                <div className={cn('rounded-xl p-3', stat.bgClass)}>
                  <stat.icon className={cn('h-6 w-6', stat.iconClass)} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card className="border-0 shadow-card">
          <CardHeader className="pb-4">
            <CardTitle className="font-display text-lg font-semibold">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <span className="text-sm font-semibold text-primary">T{order.tableNumber}</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{order.customerName}</p>
                    <p className="text-sm text-muted-foreground">{order.orderNumber}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">${order.totalAmount.toFixed(2)}</p>
                  <span className={cn('status-badge', {
                    'status-pending': order.status === 'Pending',
                    'status-preparing': order.status === 'Preparing',
                    'status-ready': order.status === 'Ready',
                    'status-delivered': order.status === 'Delivered',
                    'status-cancelled': order.status === 'Cancelled',
                  })}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Popular Items */}
        <Card className="border-0 shadow-card">
          <CardHeader className="pb-4">
            <CardTitle className="font-display text-lg font-semibold">Popular Menu Items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topItems.map((item, index) => (
              <div key={item.id} className="flex items-center gap-4 rounded-lg bg-muted/50 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground font-bold">
                  #{index + 1}
                </div>
                <img 
                  src={item.imageUrl} 
                  alt={item.name}
                  className="h-12 w-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-foreground">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.category}</p>
                </div>
                <p className="font-semibold text-foreground">${item.price.toFixed(2)}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
