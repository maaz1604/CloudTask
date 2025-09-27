// Simple test script to verify MongoDB integration
import dbConnect from './src/lib/mongodb.js';
import Todo from './src/models/Todo.js';

async function testConnection() {
  try {
    console.log('Testing MongoDB connection...');
    await dbConnect();
    console.log('✅ MongoDB connected successfully!');
    
    // Test creating a todo
    const testTodo = await Todo.create({
      title: 'Test Todo',
      description: 'This is a test todo',
      completed: false,
    });
    console.log('✅ Test todo created:', testTodo._id.toString());
    
    // Test fetching todos
    const todos = await Todo.find({});
    console.log('✅ Found todos:', todos.length);
    
    // Clean up test todo
    await Todo.findByIdAndDelete(testTodo._id);
    console.log('✅ Test todo cleaned up');
    
    console.log('🎉 All tests passed! MongoDB integration is working correctly.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

testConnection();