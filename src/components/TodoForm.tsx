'use client';

import React from 'react';
import { TodoFormProps, CreateTodoInput } from '@/types/todo';
import { IoAdd } from 'react-icons/io5';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, isLoading = false }) => {
  const [title, setTitle] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    if (title.trim()) {
      const newTodo: CreateTodoInput = {
        title: title.trim(),
        description: description.trim() || undefined,
      };
      
      onSubmit(newTodo);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <IoAdd className="text-blue-600 dark:text-blue-400" size={28} />
        Add New Todo
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Title *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="What needs to be done?"
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="Additional details (optional)"
            rows={3}
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={!title.trim() || isLoading}
          className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
            !title.trim() || isLoading
              ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed text-gray-200'
              : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-white shadow-md hover:shadow-lg'
          }`}
        >
          {isLoading ? (
            <>
              <AiOutlineLoading3Quarters className="animate-spin" size={20} />
              Adding...
            </>
          ) : (
            <>
              <IoAdd size={20} />
              Add Todo
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default TodoForm;