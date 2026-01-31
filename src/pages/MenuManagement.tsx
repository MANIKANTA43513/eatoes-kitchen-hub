import { useState, useMemo } from 'react';
import { useRestaurant } from '@/context/RestaurantContext';
import { useDebounce } from '@/hooks/useDebounce';
import { MenuItem, MenuCategory } from '@/types/restaurant';
import { categories } from '@/data/sampleData';
import { MenuItemCard } from '@/components/menu/MenuItemCard';
import { MenuItemModal } from '@/components/menu/MenuItemModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Plus, Filter, Loader2 } from 'lucide-react';

const MenuManagement = () => {
  const { menuItems, toggleAvailability, addMenuItem, updateMenuItem, deleteMenuItem } = useRestaurant();
  
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all');
  const [isSearching, setIsSearching] = useState(false);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  // Debounced search (300ms delay)
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Simulating search loading state
  useMemo(() => {
    if (searchQuery !== debouncedSearch) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [searchQuery, debouncedSearch]);

  // Filter menu items
  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      // Search filter (name or ingredients)
      const searchLower = debouncedSearch.toLowerCase().trim();
      const matchesSearch = searchLower === '' || 
        item.name.toLowerCase().includes(searchLower) ||
        item.ingredients.some(ing => ing.toLowerCase().includes(searchLower));

      // Category filter
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;

      // Availability filter
      const matchesAvailability = 
        availabilityFilter === 'all' ||
        (availabilityFilter === 'available' && item.isAvailable) ||
        (availabilityFilter === 'unavailable' && !item.isAvailable);

      return matchesSearch && matchesCategory && matchesAvailability;
    });
  }, [menuItems, debouncedSearch, categoryFilter, availabilityFilter]);

  const handleAddItem = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSaveItem = (data: Omit<MenuItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingItem) {
      updateMenuItem(editingItem.id, data);
    } else {
      addMenuItem(data);
    }
    setIsModalOpen(false);
  };

  const handleDeleteItem = (id: string) => {
    deleteMenuItem(id);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Menu Management</h1>
          <p className="mt-1 text-muted-foreground">
            {filteredItems.length} of {menuItems.length} items
          </p>
        </div>
        <Button onClick={handleAddItem} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Menu Item
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 rounded-xl bg-card p-4 shadow-card sm:flex-row sm:items-center">
        {/* Search Input with Debouncing */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          {isSearching && (
            <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground animate-spin" />
          )}
          <Input
            placeholder="Search by name or ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10"
          />
        </div>

        <div className="flex gap-3">
          {/* Category Filter */}
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Availability Filter */}
          <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Items</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="unavailable">Unavailable</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Menu Items Grid */}
      {filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl bg-card py-16 text-center shadow-card">
          <div className="rounded-full bg-muted p-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mt-4 font-display text-lg font-semibold text-foreground">No items found</h3>
          <p className="mt-2 text-muted-foreground">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredItems.map((item, index) => (
            <MenuItemCard
              key={item.id}
              item={item}
              onToggleAvailability={() => toggleAvailability(item.id)}
              onEdit={() => handleEditItem(item)}
              onDelete={() => handleDeleteItem(item.id)}
              style={{ animationDelay: `${index * 50}ms` }}
            />
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <MenuItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveItem}
        item={editingItem}
      />
    </div>
  );
};

export default MenuManagement;
