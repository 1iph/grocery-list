
import React, { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { GroceryItem as GroceryItemType } from './GroceryListApp';

interface GroceryItemProps {
  item: GroceryItemType;
  onUpdate: (id: string, updates: Partial<GroceryItemType>) => void;
  onDelete: (id: string) => void;
}

export const GroceryItem = ({ item, onUpdate, onDelete }: GroceryItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(item.name);
  const [editQuantity, setEditQuantity] = useState(item.quantity);
  const [editNotes, setEditNotes] = useState(item.notes);

  const handleSave = () => {
    onUpdate(item.id, {
      name: editName.trim(),
      quantity: editQuantity.trim(),
      notes: editNotes.trim()
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(item.name);
    setEditQuantity(item.quantity);
    setEditNotes(item.notes);
    setIsEditing(false);
  };

  const toggleCompleted = () => {
    onUpdate(item.id, { completed: !item.completed });
  };

  if (isEditing) {
    return (
      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border-2 border-green-500">
        <div className="space-y-2">
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white"
            placeholder="Item name"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={editQuantity}
              onChange={(e) => setEditQuantity(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white"
              placeholder="Quantity"
            />
            <input
              type="text"
              value={editNotes}
              onChange={(e) => setEditNotes(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white"
              placeholder="Notes"
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`group p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
      item.completed 
        ? 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 opacity-60' 
        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:border-green-300'
    }`}>
      <div className="flex items-center space-x-3">
        <button
          onClick={toggleCompleted}
          className={`w-6 h-6 rounded-full border-2 flex-shrink-0 transition-all duration-200 ${
            item.completed
              ? 'bg-green-500 border-green-500'
              : 'border-gray-300 dark:border-gray-600 hover:border-green-500'
          }`}
        >
          {item.completed && (
            <svg className="w-4 h-4 text-white m-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className={`font-medium ${
              item.completed 
                ? 'line-through text-gray-500 dark:text-gray-400' 
                : 'text-gray-800 dark:text-white'
            }`}>
              {item.name}
            </h4>
            
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                title="Edit item"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                title="Delete item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 mt-1">
            {item.quantity && (
              <span className={`text-sm ${
                item.completed 
                  ? 'text-gray-400 dark:text-gray-500' 
                  : 'text-green-600 dark:text-green-400'
              } font-medium`}>
                {item.quantity}
              </span>
            )}
            {item.notes && (
              <span className={`text-sm ${
                item.completed 
                  ? 'text-gray-400 dark:text-gray-500' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {item.notes}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
