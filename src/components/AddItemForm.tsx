
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { GroceryItem } from './GroceryListApp';

interface AddItemFormProps {
  onAddItem: (item: Omit<GroceryItem, 'id' | 'completed' | 'createdAt'>) => void;
  categories: string[];
}

const COMMON_ITEMS = [
  'Milk', 'Bread', 'Eggs', 'Bananas', 'Apples', 'Chicken breast', 'Ground beef',
  'Rice', 'Pasta', 'Tomatoes', 'Onions', 'Potatoes', 'Carrots', 'Spinach',
  'Cheese', 'Yogurt', 'Butter', 'Olive oil', 'Salt', 'Pepper'
];

const getCategoryForItem = (itemName: string): string => {
  const name = itemName.toLowerCase();
  
  if (['banana', 'apple', 'orange', 'tomato', 'onion', 'potato', 'carrot', 'spinach', 'lettuce'].some(item => name.includes(item))) {
    return 'Produce';
  }
  if (['milk', 'cheese', 'yogurt', 'butter', 'cream'].some(item => name.includes(item))) {
    return 'Dairy';
  }
  if (['chicken', 'beef', 'pork', 'fish', 'salmon', 'turkey'].some(item => name.includes(item))) {
    return 'Meat & Seafood';
  }
  if (['bread', 'rice', 'pasta', 'flour', 'sugar', 'salt', 'pepper', 'oil'].some(item => name.includes(item))) {
    return 'Pantry';
  }
  
  return 'Pantry'; // Default category
};

export const AddItemForm = ({ onAddItem, categories }: AddItemFormProps) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = COMMON_ITEMS.filter(item =>
    item.toLowerCase().includes(name.toLowerCase()) && name.length > 0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const selectedCategory = category || getCategoryForItem(name);
    
    onAddItem({
      name: name.trim(),
      quantity: quantity.trim() || '1',
      notes: notes.trim(),
      category: selectedCategory
    });

    setName('');
    setQuantity('');
    setNotes('');
    setCategory('');
    setShowSuggestions(false);
  };

  const selectSuggestion = (suggestion: string) => {
    setName(suggestion);
    setCategory(getCategoryForItem(suggestion));
    setShowSuggestions(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 relative">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Add New Item
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Item name (e.g., Milk, Apples)"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setShowSuggestions(e.target.value.length > 0);
            }}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
            required
          />
          
          {/* Suggestions Dropdown */}
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-40 overflow-y-auto">
              {filteredSuggestions.slice(0, 5).map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => selectSuggestion(suggestion)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Quantity (e.g., 2 lbs, 1 dozen)"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
          />
          
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
          >
            <option value="">Auto-categorize</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <input
          type="text"
          placeholder="Notes (optional - e.g., organic, brand preference)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center space-x-2 font-medium"
        >
          <Plus className="w-5 h-5" />
          <span>Add to List</span>
        </button>
      </form>
    </div>
  );
};
