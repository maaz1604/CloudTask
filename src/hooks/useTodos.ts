'use client';

import { useState, useCallback, useEffect } from 'react';
import { Todo, CreateTodoInput, UpdateTodoInput, UseTodosReturn, TodoFilter, ApiResponse } from '@/types/todo';
import { customToast } from '@/utils/toast';

export const useTodos = (): UseTodosReturn => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Load todos from API on mount
  const fetchTodos = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/todos');
      const result: ApiResponse<Todo[]> = await response.json();
      
      if (result.success && result.data) {
        // Convert date strings back to Date objects
        const todosWithDates = result.data.map((todo) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          updatedAt: new Date(todo.updatedAt),
        }));
        setTodos(todosWithDates);
      } else {
        throw new Error(result.error || 'Failed to fetch todos');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load todos';
      setError(errorMessage);
      customToast.error(`Failed to load todos: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = useCallback(async (input: CreateTodoInput): Promise<void> => {
    if (!input.title.trim()) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      const result: ApiResponse<Todo> = await response.json();
      
      if (result.success && result.data) {
        const newTodo = {
          ...result.data,
          createdAt: new Date(result.data.createdAt),
          updatedAt: new Date(result.data.updatedAt),
        };
        setTodos(prev => [newTodo, ...prev]);
        customToast.todoAdded(input.title.trim());
      } else {
        throw new Error(result.error || 'Failed to add todo');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add todo';
      setError(errorMessage);
      customToast.error(`Failed to add todo: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateTodo = useCallback(async (id: string, updates: UpdateTodoInput): Promise<void> => {
    setError(null);
    
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      const result: ApiResponse<Todo> = await response.json();
      
      if (result.success && result.data) {
        const updatedTodo = {
          ...result.data,
          createdAt: new Date(result.data.createdAt),
          updatedAt: new Date(result.data.updatedAt),
        };
        
        setTodos(prev =>
          prev.map(todo =>
            todo.id === id ? updatedTodo : todo
          )
        );
        
        if (updates.title) {
          customToast.todoUpdated(updates.title);
        } else {
          const currentTodo = todos.find(todo => todo.id === id);
          if (currentTodo) {
            customToast.todoUpdated(currentTodo.title);
          } else {
            customToast.success('Todo updated successfully!');
          }
        }
      } else {
        throw new Error(result.error || 'Failed to update todo');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update todo';
      setError(errorMessage);
      customToast.error(`Failed to update todo: ${errorMessage}`);
    }
  }, [todos]);

  const deleteTodo = useCallback(async (id: string): Promise<void> => {
    setError(null);
    
    try {
      const todoToDelete = todos.find(todo => todo.id === id);
      
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });

      const result: ApiResponse<{ id: string }> = await response.json();
      
      if (result.success) {
        setTodos(prev => prev.filter(todo => todo.id !== id));
        
        if (todoToDelete) {
          customToast.todoDeleted(todoToDelete.title);
        } else {
          customToast.success('Todo deleted successfully!');
        }
      } else {
        throw new Error(result.error || 'Failed to delete todo');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete todo';
      setError(errorMessage);
      customToast.error(`Failed to delete todo: ${errorMessage}`);
    }
  }, [todos]);

  const toggleComplete = useCallback(async (id: string): Promise<void> => {
    setError(null);
    
    try {
      const todoToToggle = todos.find(todo => todo.id === id);
      if (!todoToToggle) return;
      
      const updates = { completed: !todoToToggle.completed };
      
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      const result: ApiResponse<Todo> = await response.json();
      
      if (result.success && result.data) {
        const updatedTodo = {
          ...result.data,
          createdAt: new Date(result.data.createdAt),
          updatedAt: new Date(result.data.updatedAt),
        };
        
        setTodos(prev =>
          prev.map(todo =>
            todo.id === id ? updatedTodo : todo
          )
        );
        
        if (!todoToToggle.completed) {
          customToast.todoCompleted(todoToToggle.title);
        } else {
          customToast.todoReactivated(todoToToggle.title);
        }
      } else {
        throw new Error(result.error || 'Failed to toggle todo');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to toggle todo';
      setError(errorMessage);
      customToast.error(`Failed to toggle todo: ${errorMessage}`);
    }
  }, [todos]);

  const filteredTodos = useCallback((filter: TodoFilter): Todo[] => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos]);

  return {
    todos,
    isLoading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
    filteredTodos,
  };
};