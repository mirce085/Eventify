# 🎉 Eventify

A modern, full-stack event management web application built with Next.js 15, TypeScript, and Prisma.  Eventify empowers event organizers to create and manage events seamlessly, while providing attendees with an intuitive interface to browse, book, and manage their event registrations.


## ✨ Features

### For Event Organizers
- 📝 **Create Events**: Design and publish events with comprehensive details
- 🎨 **Cover Images**: Add visual appeal with event cover images
- 💰 **Pricing Control**: Set event prices with multi-currency support
- 📍 **Location Management**: Specify event venues and locations
- ⏰ **Schedule Management**: Define start and end times for events
- ✏️ **Event Updates**: Edit and update event information in real-time

### For Attendees
- 🔍 **Browse Events**: Discover events through an intuitive interface
- 📅 **Event Details**: View comprehensive information about each event
- 🎫 **Booking System**: Reserve spots at events
- ❌ **Cancel Bookings**: Manage registrations with easy cancellation

### Security & Authentication
- 🔐 **JWT Authentication**: Secure user authentication using NextAuth.js
- 🔒 **Password Hashing**: Industry-standard bcrypt password encryption
- 👤 **User Management**: Profile creation and management
- 🛡️ **Protected Routes**: Secure endpoints for authenticated users only

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 15. 5.2](https://nextjs. org/) with React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 with custom animations
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **State Management**: Zustand
- **Internationalization**: next-intl

### Backend
- **Database**: PostgreSQL
- **ORM**: Prisma 6.16
- **Authentication**: NextAuth.js 4
- **Password Hashing**: bcryptjs

### Developer Tools
- **Linting**: ESLint 9
- **Build Tool**: Next.js Turbopack
- **Type Safety**: TypeScript strict mode

## 📋 Prerequisites

Before running this project, ensure you have:

- Node.js 20.x or higher
- PostgreSQL database
- npm or yarn package manager

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/mirce085/Eventify.git
cd Eventify
```

### 2.  Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/eventify"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Add other required environment variables
```

### 4. Database Setup

Run Prisma migrations to set up your database schema:

```bash
npx prisma migrate dev
```

### 5.  Seed the Database (Optional)

Populate your database with sample data:

```bash
npm run seed
```

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application. 

## 📁 Project Structure

```
Eventify/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Database seeding script
├── public/                # Static assets
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   ├── i18n/            # Internationalization config
│   ├── messages/        # Translation files
│   ├── prisma/          # Prisma client utilities
│   ├── stores/          # Zustand state stores
│   └── middleware.ts    # Next.js middleware
├── .gitignore
├── next.config.ts       # Next.js configuration
├── package.json
├── tailwind.config.js   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## 🗄️ Database Schema

### User Model
- Unique email authentication
- Password hashing
- Profile information (name, image)
- Relationship with created events

### Event Model
- Comprehensive event details
- Date and time management
- Pricing with currency support
- Cover image support
- Organizer relationship
- Automatic timestamps

## 🎯 Available Scripts

```bash
# Development server with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run ESLint
npm run lint

# Seed database
npm run seed
```

## 🔐 Authentication Flow

1. **Sign Up**: Users create accounts with email and password
2. **Password Hashing**: Passwords are encrypted using bcrypt
3. **JWT Tokens**: Session management via NextAuth.js
4. **Protected Routes**: Middleware secures authenticated endpoints
5. **Session Persistence**: Automatic token refresh

## 🌍 Internationalization

Eventify supports multiple languages through next-intl.  Language files are located in `src/messages/`.

## 🎨 UI Components

Built with Radix UI primitives for accessibility and customization:
- Dialogs and Modals
- Dropdowns and Menus
- Forms and Inputs
- Navigation Components
- Data Display (Cards, Avatars, etc.)
- Feedback Components (Toasts via Sonner)

## 🚧 Future Enhancements

- [ ] Payment integration (Stripe/PayPal)
- [ ] Email notifications
- [ ] Calendar sync (Google Calendar, iCal)
- [ ] Social media sharing
- [ ] Event reviews and ratings
- [ ] Advanced search and filtering
- [ ] Mobile app version
- [ ] Analytics dashboard for organizers

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is private and maintained by [mirce085](https://github.com/mirce085). 

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

Built with ❤️ using Next.js, TypeScript, and Prisma
