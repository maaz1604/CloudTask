// Types for Todo application
export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Type for creating a new todo (without auto-generated fields)
export type CreateTodoInput = {
  title: string;
  description?: string;
};

// Type for updating an existing todo
export type UpdateTodoInput = Partial<{
  title: string;
  description: string;
  completed: boolean;
}>;

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Component Props Types
export interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: string, updates: UpdateTodoInput) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

export interface TodoFormProps {
  onSubmit: (todo: CreateTodoInput) => void;
  isLoading?: boolean;
}

export interface TodoListProps {
  todos: Todo[];
  onUpdate: (id: string, updates: UpdateTodoInput) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
  isLoading?: boolean;
}

// Filter types for todos
export type TodoFilter = 'all' | 'active' | 'completed';

// Hook return types
export interface UseTodosReturn {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
  addTodo: (input: CreateTodoInput) => Promise<void>;
  updateTodo: (id: string, updates: UpdateTodoInput) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  toggleComplete: (id: string) => Promise<void>;
  filteredTodos: (filter: TodoFilter) => Todo[];
}