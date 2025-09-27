'use client';

import React from 'react';
import { TodoListProps, TodoFilter } from '@/types/todo';
import TodoItem from './TodoItem';
import { FiList, FiSearch, FiZap, FiCheckSquare } from 'react-icons/fi';
import { MdOutlineAssignment, MdOutlineTaskAlt, MdOutlineCelebration } from 'react-icons/md';

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onUpdate,
  onDelete,
  onToggleComplete,
  isLoading = false,
}) => {
  const [filter, setFilter] = React.useState<TodoFilter>('all');

  const filteredTodos = React.useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const todoStats = React.useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const active = total - completed;
    
    return { total, completed, active };
  }, [todos]);

  if (isLoading && todos.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <FiList className="text-blue-600 dark:text-blue-400" size={28} />
            Your Todos ({todoStats.total})
          </h2>
          
          <div className="text-sm text-gray-600 dark:text-gray-400 space-x-4">
            <span className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-3 py-1 rounded-full inline-flex items-center gap-1">
              <FiZap size={14} />
              Active: {todoStats.active}
            </span>
            <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full inline-flex items-center gap-1">
              <FiCheckSquare size={14} />
              Done: {todoStats.completed}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              filter === 'all'
                ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <FiSearch size={16} />
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              filter === 'active'
                ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <FiZap size={16} />
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              filter === 'completed'
                ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <FiCheckSquare size={16} />
            Completed
          </button>
        </div>
      </div>

      <div className="p-6">
        {filteredTodos.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">
              {filter === 'all' ? (
                <MdOutlineAssignment className="mx-auto text-gray-300 dark:text-gray-600" size={80} />
              ) : filter === 'active' ? (
                <FiZap className="mx-auto text-gray-300 dark:text-gray-600" size={80} />
              ) : (
                <MdOutlineCelebration className="mx-auto text-gray-300 dark:text-gray-600" size={80} />
              )}
            </div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {filter === 'all' 
                ? 'No todos yet!'
                : filter === 'active' 
                ? 'No active todos!'
                : 'No completed todos!'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {filter === 'all' 
                ? 'Add your first todo above to get started!'
                : `Switch to "All" to see ${filter === 'active' ? 'completed' : 'active'} todos.`
              }
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onToggleComplete={onToggleComplete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;