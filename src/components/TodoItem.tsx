'use client';

import React from 'react';
import { TodoItemProps } from '@/types/todo';
import { FiCheck, FiEdit3, FiTrash2, FiSave, FiX, FiCalendar } from 'react-icons/fi';

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onUpdate,
  onDelete,
  onToggleComplete,
}) => {
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [editTitle, setEditTitle] = React.useState<string>(todo.title);
  const [editDescription, setEditDescription] = React.useState<string>(
    todo.description || ''
  );

  const handleSave = (): void => {
    if (editTitle.trim()) {
      onUpdate(todo.id, {
        title: editTitle.trim(),
        description: editDescription.trim() || undefined,
      });
      setIsEditing(false);
    }
  };

  const handleCancel = (): void => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 transition-all duration-200 hover:shadow-xl ${
      todo.completed 
        ? 'border-green-500 dark:border-green-400 bg-gray-50 dark:bg-gray-900' 
        : 'border-blue-500 dark:border-blue-400'
    }`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start space-x-4 flex-1">
          <button
            onClick={() => onToggleComplete(todo.id)}
            className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
              todo.completed
                ? 'bg-green-500 dark:bg-green-400 border-green-500 dark:border-green-400 text-white'
                : 'border-gray-300 dark:border-gray-600 hover:border-green-400 dark:hover:border-green-500'
            }`}
          >
            {todo.completed && <FiCheck size={14} />}
          </button>
          
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setEditTitle(e.target.value)
                  }
                  onKeyDown={handleKeyDown}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Todo title"
                  autoFocus
                />
                <textarea
                  value={editDescription}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => 
                    setEditDescription(e.target.value)
                  }
                  onKeyDown={handleKeyDown}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Description (optional)"
                  rows={2}
                />
              </div>
            ) : (
              <div>
                <h3 className={`text-lg font-semibold transition-all duration-200 ${
                  todo.completed 
                    ? 'line-through text-gray-500 dark:text-gray-400' 
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {todo.title}
                </h3>
                {todo.description && (
                  <p className={`text-sm mt-2 transition-all duration-200 ${
                    todo.completed 
                      ? 'line-through text-gray-400 dark:text-gray-500' 
                      : 'text-gray-600 dark:text-gray-300'
                  }`}>
                    {todo.description}
                  </p>
                )}
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 flex items-center gap-1">
                  <FiCalendar size={12} />
                  {new Date(todo.createdAt).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex space-x-2 flex-shrink-0">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="p-2 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900 rounded-lg transition-colors duration-200 focus:outline-none"
                title="Save changes"
              >
                <FiSave size={18} />
              </button>
              <button
                onClick={handleCancel}
                className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 focus:outline-none"
                title="Cancel editing"
              >
                <FiX size={18} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg transition-colors duration-200 focus:outline-none"
                title="Edit todo"
              >
                <FiEdit3 size={18} />
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors duration-200 focus:outline-none"
                title="Delete todo"
              >
                <FiTrash2 size={18} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;