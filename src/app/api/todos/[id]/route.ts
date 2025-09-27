import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Todo from '@/models/Todo';
import { UpdateTodoInput, ApiResponse } from '@/types/todo';
import mongoose from 'mongoose';

// PUT /api/todos/[id] - Update a todo
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const { id } = params;
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Invalid todo ID',
      };
      return NextResponse.json(response, { status: 400 });
    }
    
    const body: UpdateTodoInput = await request.json();
    
    // Find and update the todo
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      {
        ...(body.title !== undefined && { title: body.title.trim() }),
        ...(body.description !== undefined && { description: body.description?.trim() }),
        ...(body.completed !== undefined && { completed: body.completed }),
      },
      { new: true, runValidators: true }
    );

    if (!updatedTodo) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Todo not found',
      };
      return NextResponse.json(response, { status: 404 });
    }

    // Transform to match frontend interface
    const transformedTodo = {
      id: updatedTodo._id.toString(),
      title: updatedTodo.title,
      description: updatedTodo.description,
      completed: updatedTodo.completed,
      createdAt: updatedTodo.createdAt,
      updatedAt: updatedTodo.updatedAt,
    };

    const response: ApiResponse<typeof transformedTodo> = {
      success: true,
      data: transformedTodo,
      message: 'Todo updated successfully',
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error updating todo:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update todo',
    };
    return NextResponse.json(response, { status: 500 });
  }
}

// DELETE /api/todos/[id] - Delete a todo
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const { id } = params;
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Invalid todo ID',
      };
      return NextResponse.json(response, { status: 400 });
    }

    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Todo not found',
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse<{ id: string }> = {
      success: true,
      data: { id: deletedTodo._id.toString() },
      message: 'Todo deleted successfully',
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error deleting todo:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete todo',
    };
    return NextResponse.json(response, { status: 500 });
  }
}