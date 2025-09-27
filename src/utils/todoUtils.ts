import { Todo, TodoFilter } from '@/types/todo';

// Statistics functions
export interface TodoStats {
  total: number;
  completed: number;
  active: number;
  completionRate: number;
}

export const getTodoStats = (todos: Todo[]): TodoStats => {
  const total = todos.length;
  const completed = todos.filter(todo => todo.completed).length;
  const active = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return {
    total,
    completed,
    active,
    completionRate,
  };
};

// Filter todos based on status
export const filterTodos = (todos: Todo[], filter: TodoFilter): Todo[] => {
  switch (filter) {
    case 'active':
      return todos.filter(todo => !todo.completed);
    case 'completed':
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};

// Search todos by title or description
export const searchTodos = (todos: Todo[], searchQuery: string): Todo[] => {
  if (!searchQuery.trim()) {
    return todos;
  }
  
  const query = searchQuery.toLowerCase().trim();
  
  return todos.filter(todo => {
    const titleMatch = todo.title.toLowerCase().includes(query);
    const descriptionMatch = todo.description?.toLowerCase().includes(query) || false;
    
    return titleMatch || descriptionMatch;
  });
};

// Format date for display
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

// Validation functions
export const validateTodoTitle = (title: string): boolean => {
  return title.trim().length > 0 && title.trim().length <= 100;
};

export const validateTodoDescription = (description: string): boolean => {
  return description.length <= 500;
};