# Task Manager

A full-stack Next.js application for managing daily tasks with user authentication.

[my demo video](https://vimeo.com/1059590107/7f1f9ef5a5?share=copy)

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn package manager

## Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/christiandiz0n/lumaa-spring-2025-swe
   cd lumaa-spring-2025-swe
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**

   Create a `.env` file in the root directory with the following variables:

   ```env
   # Database URL for Prisma (adjust according to your PostgreSQL setup)
   DATABASE_URL="postgresql://username:password@localhost:5432/taskmanager?schema=public"

   # JWT secret for authentication (generate a secure random string)
   JWT_SECRET="your-secure-jwt-secret"
   ```

4. **Database Setup**

   a. Start your PostgreSQL server

   b. Initialize Prisma and create the database:

   ```bash
   # Generate Prisma Client
   npx prisma generate

   # Run migrations to create database tables
   npx prisma migrate dev
   ```

5. **Run the Development Server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000)

## Database Schema

The application uses two main tables:

- **Users**: Stores user authentication information
- **Tasks**: Stores task information with relations to users

## Features

- User authentication (register/login)
- Create, read, update, and delete tasks
- Mark tasks as complete/incomplete
- Responsive design
- Protected routes
- Secure password hashing
- JWT-based authentication

## API Routes

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/tasks` - Get all tasks for authenticated user
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/[id]` - Update a task
- `DELETE /api/tasks/[id]` - Delete a task

## Tech Stack

- Next.js
- TypeScript
- Prisma (ORM)
- PostgreSQL
- TailwindCSS
- JWT Authentication
- shadcn/ui components

## Development Notes

- The application uses Next.js Pages Router
- Authentication is handled via JWT tokens stored in localStorage
- Database queries are handled through Prisma Client
- UI components are built using shadcn/ui and TailwindCSS

## Common Issues

1. **Database Connection**

   - Ensure PostgreSQL is running
   - Verify DATABASE_URL in .env is correct
   - Check database user permissions

2. **Prisma Issues**
   - Run `npx prisma generate` after schema changes
   - Run `npx prisma migrate reset` to reset database
   - Run `npx prisma studio` to view/edit data

## Production Deployment

1. Build the application:

   ```bash
   npm run build
   # or
   yarn build
   ```

2. Start the production server:
   ```bash
   npm start
   # or
   yarn start
   ```

Remember to set up proper environment variables in your production environment.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - feel free to use this project for your own purposes.
