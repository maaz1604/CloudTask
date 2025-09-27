import mongoose, { Schema, model, models } from 'mongoose';

// Define the interface for the Todo document
export interface ITodo extends mongoose.Document {
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Create the Todo schema
const TodoSchema = new Schema<ITodo>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title for the todo'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot be more than 1000 characters'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // This will automatically create createdAt and updatedAt fields
  }
);

// Create indexes for better query performance
TodoSchema.index({ createdAt: -1 });
TodoSchema.index({ completed: 1 });

// Export the model
// Use models.Todo to check if the model already exists to prevent recompilation errors
export const Todo = models.Todo || model<ITodo>('Todo', TodoSchema);

export default Todo;