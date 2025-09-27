import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Todo from '@/models/Todo';
import { CreateTodoInput, ApiResponse } from '@/types/todo';
import mongoose from 'mongoose';

// GET /api/todos - Get all todos
export async function GET() {
  try {
    await dbConnect();
    
    const todos = await Todo.find({}).sort({ createdAt: -1 }).lean();
    
    // Transform MongoDB documents to match frontend Todo interface
    const transformedTodos = todos.map((todo: any) => ({
      id: todo._id.toString(),
      title: todo.title,
      description: todo.description,
      completed: todo.completed,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
    }));

    const response: ApiResponse<typeof transformedTodos> = {
      success: true,
      data: transformedTodos,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching todos:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch todos',
    };
    return NextResponse.json(response, { status: 500 });
  }
}

// POST /api/todos - Create a new todo
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body: CreateTodoInput = await request.json();
    
    // Validate input
    if (!body.title || body.title.trim() === '') {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Title is required',
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Create new todo
    const newTodo = await Todo.create({
      title: body.title.trim(),
      description: body.description?.trim(),
      completed: false,
    });

    // Transform to match frontend interface
    const transformedTodo = {
      id: newTodo._id.toString(),
      title: newTodo.title,
      description: newTodo.description,
      completed: newTodo.completed,
      createdAt: newTodo.createdAt,
      updatedAt: newTodo.updatedAt,
    };

    const response: ApiResponse<typeof transformedTodo> = {
      success: true,
      data: transformedTodo,
      message: 'Todo created successfully',
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error creating todo:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create todo',
    };
    return NextResponse.json(response, { status: 500 });
  }
}