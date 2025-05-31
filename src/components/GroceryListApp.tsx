
import React, { useState, useEffect } from 'react';
import { AddItemForm } from './AddItemForm';
import { CategorySection } from './CategorySection';
import { ThemeToggle } from './ThemeToggle';
import { Trash2, ShoppingCart } from 'lucide-react';

export interface GroceryItem {
  id: string;
  name: string;
  quantity: string;
  notes: string;
  category: string;
  completed: boolean;
  createdAt: Date;
}

const CATEGORIES = [
  'Produce',
  'Dairy',
  'Meat & Seafood',
  'Pantry',
  'Frozen',
  'Snacks',
  'Beverages',
  'Household',
  'Personal Care'
];

export const GroceryListApp = () => {
  const [items, setItems] = useState<GroceryItem[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load items from localStorage on mount
  useEffect(() => {
    const savedItems = localStorage.getItem('groceryItems');
    if (savedItems) {
      setItems(JSON.parse(savedItems).map((item: any) => ({
        ...item,
        createdAt: new Date(item.createdAt)
      })));
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Save items to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('groceryItems', JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<GroceryItem, 'id' | 'completed' | 'createdAt'>) => {
    const newItem: GroceryItem = {
      ...item,
      id: Date.now().toString(),
      completed: false,
      createdAt: new Date()
    };
    setItems(prev => [...prev, newItem]);
  };

  const updateItem = (id: string, updates: Partial<GroceryItem>) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCompleted = () => {
    setItems(prev => prev.filter(item => !item.completed));
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newMode;
    });
  };

  const completedCount = items.filter(item => item.completed).length;
  const totalCount = items.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="bg-green-500 p-3 rounded-full">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                Grocery List
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {totalCount > 0 ? `${completedCount} of ${totalCount} completed` : 'Start adding items to your list'}
              </p>
            </div>
          </div>
          <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
        </div>

        {/* Add Item Form */}
        <div className="mb-8">
          <AddItemForm onAddItem={addItem} categories={CATEGORIES} />
        </div>

        {/* Clear Completed Button */}
        {completedCount > 0 && (
          <div className="mb-6 flex justify-end">
            <button
              onClick={clearCompleted}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Completed</span>
            </button>
          </div>
        )}

        {/* Category Sections */}
        <div className="space-y-6">
          {CATEGORIES.map(category => {
            const categoryItems = items.filter(item => item.category === category);
            if (categoryItems.length === 0) return null;
            
            return (
              <CategorySection
                key={category}
                category={category}
                items={categoryItems}
                onUpdateItem={updateItem}
                onDeleteItem={deleteItem}
              />
            );
          })}
        </div>

        {/* Empty State */}
        {items.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-lg max-w-md mx-auto">
              <ShoppingCart className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Your grocery list is empty
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Add your first item above to get started!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
