'use client';

import React from 'react';
import { useTodos } from '@/hooks/useTodos';
import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';
import DarkModeToggle from '@/components/DarkModeToggle';
import { getTodoStats } from '@/utils/todoUtils';
import { FiPocket } from 'react-icons/fi';
import { MdWarning } from 'react-icons/md';

export default function Home() {
  const {
    todos,
    isLoading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
  } = useTodos();

  const stats = getTodoStats(todos);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4 transition-colors duration-300">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1"></div>
            <div className="flex-1 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-3">
                <FiPocket className="text-blue-600 dark:text-blue-400" size={48} />
                Todo Master
              </h1>
            </div>
            <div className="flex-1 flex justify-end">
              <DarkModeToggle />
            </div>
          </div>
          
          {/* Stats Dashboard */}
          {todos.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-xl px-4 py-3 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.total}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl px-4 py-3 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.completed}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Done</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl px-4 py-3 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.active}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Active</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl px-4 py-3 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.completionRate}%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Complete</div>
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/50 border-l-4 border-red-500 dark:border-red-400 text-red-700 dark:text-red-300 p-4 mb-6 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <MdWarning className="text-red-500 dark:text-red-400" size={20} />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Todo Form */}
        <TodoForm onSubmit={addTodo} isLoading={isLoading} />

        {/* Todo List */}
        <TodoList
          todos={todos}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
          onToggleComplete={toggleComplete}
          isLoading={isLoading}
        />

        {/* Footer */}
        <footer className="text-center mt-8">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Built by maaz amir
          </p>
        </footer>
      </div>
    </main>
  );
}