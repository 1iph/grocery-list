
import React from 'react';
import { GroceryItem as GroceryItemComponent } from './GroceryItem';
import { GroceryItem } from './GroceryListApp';

interface CategorySectionProps {
  category: string;
  items: GroceryItem[];
  onUpdateItem: (id: string, updates: Partial<GroceryItem>) => void;
  onDeleteItem: (id: string) => void;
}

const getCategoryIcon = (category: string) => {
  const iconMap: { [key: string]: string } = {
    'Produce': '🥬',
    'Dairy': '🥛',
    'Meat & Seafood': '🥩',
    'Pantry': '🏺',
    'Frozen': '🧊',
    'Snacks': '🍿',
    'Beverages': '🥤',
    'Household': '🧽',
    'Personal Care': '🧴'
  };
  return iconMap[category] || '📦';
};

export const CategorySection = ({ category, items, onUpdateItem, onDeleteItem }: CategorySectionProps) => {
  const completedItems = items.filter(item => item.completed);
  const activeItems = items.filter(item => !item.completed);
  const completionPercentage = items.length > 0 ? (completedItems.length / items.length) * 100 : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-200 hover:shadow-xl">
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{getCategoryIcon(category)}</span>
            <div>
              <h3 className="text-lg font-semibold text-white">{category}</h3>
              <p className="text-green-100 text-sm">
                {completedItems.length} of {items.length} completed
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-white text-sm font-medium">
              {Math.round(completionPercentage)}%
            </div>
            <div className="w-16 h-2 bg-green-400 rounded-full mt-1">
              <div 
                className="h-full bg-white rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-2">
        {/* Active items first */}
        {activeItems.map(item => (
          <GroceryItemComponent
            key={item.id}
            item={item}
            onUpdate={onUpdateItem}
            onDelete={onDeleteItem}
          />
        ))}
        
        {/* Completed items last */}
        {completedItems.map(item => (
          <GroceryItemComponent
            key={item.id}
            item={item}
            onUpdate={onUpdateItem}
            onDelete={onDeleteItem}
          />
        ))}
      </div>
    </div>
  );
};
