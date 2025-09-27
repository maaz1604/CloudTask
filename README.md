# CloudTask 📋

> A modern, full-stack Todo application built with Next.js 14 and TypeScript, featuring seamless MongoDB Atlas integration for persistent cloud storage. The app offers intuitive task management with real-time CRUD operations, dark mode support, and responsive design using Tailwind CSS. Containerized with Docker for easy deployment, CloudTask includes comprehensive API routes, secure database connections, and production-ready multi-stage builds.

## ✨ Features

### 🎯 **Core Functionality**
- ✅ **Create, Read, Update, Delete** todos with real-time updates
- ✅ **Mark tasks as complete/incomplete** with visual feedback
- ✅ **Add descriptions** to tasks for detailed information
- ✅ **Persistent storage** with MongoDB Atlas cloud database
- ✅ **Responsive design** that works on all devices

### 🎨 **User Experience**
- 🌙 **Dark/Light mode toggle** for comfortable viewing
- 📊 **Progress dashboard** with completion statistics
- 🎉 **Toast notifications** for user actions
- ⚡ **Fast, optimized performance** with Next.js 14
- 💫 **Smooth animations** and modern UI components

### 🛠️ **Technical Features**
- 🏗️ **Full-stack TypeScript** for type safety
- 🔗 **RESTful API routes** with proper error handling
- 🐳 **Docker containerization** for easy deployment
- 🔒 **Secure database connections** with environment variables
- 📱 **PWA-ready** with offline capabilities

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ installed
- **Docker** installed (optional, for containerized deployment)
- **MongoDB Atlas** account (connection string provided)

### 1. Clone & Install
```bash
git clone https://github.com/maaz1604/CloudTask.git
cd CloudTask
npm install
```

### 2. Environment Setup
Create a `.env.local` file:
```env
MONGODB_URI=mongodb+srv://wisakov432:wgueq3w4rlIzLQ3U@cluster0.pustd.mongodb.net/todo-app?retryWrites=true&w=majority
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the app.

### 4. Build for Production
```bash
npm run build
npm run start
```

## 🐳 Docker Deployment

### Quick Start with Docker
```bash
# Using Docker Compose (Recommended)
docker-compose up --build

# Or using build scripts
# Windows
build.bat prod

# Linux/Mac
./build.sh prod
```

### Manual Docker Commands
```bash
# Build image
docker build -t cloudtask .

# Run container
docker run -p 3000:3000 \
  -e MONGODB_URI="mongodb+srv://wisakov432:wgueq3w4rlIzLQ3U@cluster0.pustd.mongodb.net/todo-app" \
  cloudtask
```

### Available Docker Options
- **`Dockerfile`** - Production-optimized multi-stage build
- **`Dockerfile.dev`** - Development build with debugging
- **`Dockerfile.secure`** - Secure build using build arguments
- **`docker-compose.yml`** - Complete orchestration setup

## 📁 Project Structure

```
CloudTask/
├── src/
│   ├── app/
│   │   ├── api/todos/          # API routes for CRUD operations
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout component
│   │   └── page.tsx            # Main page component
│   ├── components/
│   │   ├── DarkModeToggle.tsx  # Theme switcher
│   │   ├── TodoForm.tsx        # Todo creation form
│   │   ├── TodoItem.tsx        # Individual todo item
│   │   └── TodoList.tsx        # Todo list container
│   ├── contexts/
│   │   └── ThemeContext.tsx    # Dark mode context
│   ├── hooks/
│   │   └── useTodos.ts         # Todo management hook
│   ├── lib/
│   │   └── mongodb.ts          # Database connection
│   ├── models/
│   │   └── Todo.ts             # Mongoose schema
│   ├── types/
│   │   └── todo.ts             # TypeScript interfaces
│   └── utils/
│       ├── toast.ts            # Notification utilities
│       └── todoUtils.ts        # Todo helper functions
├── public/                     # Static assets & favicons
├── Docker files & compose      # Containerization configs
└── Documentation files         # Setup and deployment guides
```

## 🛠️ Technology Stack

### Frontend
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[React 18](https://reactjs.org/)** - UI library with hooks
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[React Icons](https://react-icons.github.io/react-icons/)** - Icon library
- **[React Toastify](https://fkhadra.github.io/react-toastify/)** - Notifications

### Backend
- **[Node.js](https://nodejs.org/)** - JavaScript runtime
- **[Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)** - Serverless functions
- **[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)** - Cloud database
- **[Mongoose](https://mongoosejs.com/)** - MongoDB ODM

### DevOps & Deployment
- **[Docker](https://www.docker.com/)** - Containerization
- **[Docker Compose](https://docs.docker.com/compose/)** - Multi-container orchestration
- **[ESLint](https://eslint.org/)** - Code linting
- **[PostCSS](https://postcss.org/)** - CSS processing

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Docker
docker-compose up    # Run with Docker Compose
build.bat prod       # Windows Docker build script
./build.sh prod      # Linux/Mac Docker build script
validate-docker.bat  # Validate Dockerfiles
run-docker.bat       # Interactive Docker runner
```

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/todos` | Fetch all todos |
| `POST` | `/api/todos` | Create a new todo |
| `PUT` | `/api/todos/[id]` | Update a specific todo |
| `DELETE` | `/api/todos/[id]` | Delete a specific todo |

### Example API Usage
```javascript
// Create a todo
const response = await fetch('/api/todos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Learn Next.js',
    description: 'Complete the Next.js tutorial'
  })
});

// Get all todos
const todos = await fetch('/api/todos').then(res => res.json());
```

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB Atlas connection string | Yes |
| `NODE_ENV` | Environment (development/production) | Auto-set |
| `NEXT_TELEMETRY_DISABLED` | Disable Next.js telemetry | Optional |

## 🚢 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Add `MONGODB_URI` environment variable
4. Deploy automatically

### Docker Deployment
```bash
# Production deployment
docker run -d -p 3000:3000 \
  --name cloudtask-prod \
  -e MONGODB_URI="your-mongodb-uri" \
  --restart unless-stopped \
  cloudtask
```

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Maaz Amir**
- GitHub: [@maaz1604](https://github.com/maaz1604)
- Project: [CloudTask](https://github.com/maaz1604/CloudTask)

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **MongoDB** for reliable cloud database
- **Tailwind CSS** for beautiful styling
- **React Team** for the powerful UI library
- **Docker** for containerization technology

## 📈 Project Status

- ✅ **Active Development** - Regularly maintained and updated
- ✅ **Production Ready** - Fully functional and deployed
- ✅ **Docker Support** - Complete containerization
- ✅ **Documentation** - Comprehensive guides and examples
- ✅ **TypeScript** - Full type safety implementation

---

<div align="center">

**Built with ❤️ by Maaz Amir**


</div>