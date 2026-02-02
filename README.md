
# 🎓 Campus Event Hub

### *Your Gateway to Campus Life at IILM University*

<img src="https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
<img src="https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Vite-5.4.19-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
<img src="https://img.shields.io/badge/TailwindCSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />

---

**A modern, feature-rich event management platform designed specifically for IILM University students and organizers.**

[Features](#-features) • [Quick Start](#-quick-start) • [Testing](#-testing-credentials) • [Tech Stack](#-tech-stack) • [Screenshots](#-screenshots)

</div>

---

## 📖 About

Campus Event Hub is a comprehensive event management system built to streamline campus activities at IILM University. Whether you're a student looking to discover exciting events or an organizer managing campus activities, this platform has you covered.

### Why Campus Event Hub?

- 🎯 **Centralized Platform** - All campus events in one place
- 📱 **Modern UI/UX** - Beautiful, intuitive interface with smooth animations
- 🔐 **Role-Based Access** - Separate dashboards for students and organizers
- 📊 **Real-time Updates** - Live event status and registration tracking
- 🎫 **QR Code Integration** - Seamless event check-in system
- 🌐 **Responsive Design** - Works perfectly on all devices

---

## ✨ Features

### 👨‍🎓 For Students

- **Discover Events** - Browse upcoming campus events with advanced filtering
- **Quick Registration** - One-click event registration with instant confirmation
- **QR Passes** - Generate QR codes for easy event check-in
- **Event Tracking** - View all your registered events in one place
- **Smart Search** - Find events by category, date, or location
- **Save Events** - Bookmark interesting events for later

### 👨‍🏫 For Organizers

- **Event Management** - Create, edit, and delete events effortlessly
- **Registration Control** - Open/close registrations with a single click
- **Attendee Tracking** - Monitor registrations and check-ins in real-time
- **QR Code Generation** - Automatic QR code creation for each event
- **Analytics Dashboard** - View event statistics and insights
- **Bulk Operations** - Manage multiple events efficiently

---

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Om-Rohilla/campus-event-hub.git

# 2. Navigate to project directory
cd campus-event-hub

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be running at **http://localhost:5173** 🎉

---

## 🔑 Testing Credentials

### Student Dashboard Access

To test the student dashboard, use **any email** with the IILM student domain:

```
Email: anything@iilm.edu
Password: (any password)

Examples:
- john.doe@iilm.edu
- student123@iilm.edu
- test.user@iilm.edu
```

> **Note:** The email must end with `@iilm.edu` to access the student dashboard.

### Organizer Dashboard Access

To test the organizer dashboard, use **any email** with the IILM organizer domain:

```
Email: anything@organiser.iilm.edu
Password: (any password)

Examples:
- prof.smith@organiser.iilm.edu
- admin@organiser.iilm.edu
- event.manager@organiser.iilm.edu
```

> **Note:** The email must end with `@organiser.iilm.edu` to access the organizer dashboard.

### Quick Test Flow

1. **Go to** http://localhost:5173
2. **Click** "Sign In"
3. **Enter** any email with the appropriate domain
4. **Enter** any password
5. **Explore** the dashboard!

---

## 🛠️ Tech Stack

### Frontend Framework
- **React 18.3** - Modern UI library with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Lightning-fast build tool

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Radix UI** - Accessible component primitives
- **shadcn/ui** - Beautiful, customizable components
- **Lucide Icons** - Modern icon library

### State & Routing
- **React Router v6** - Client-side routing
- **TanStack Query** - Server state management
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation

### Utilities
- **date-fns** - Modern date utility library
- **clsx** - Conditional className utility
- **sonner** - Toast notifications

---

## 📁 Project Structure

```
campus-event-hub/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── dashboard/      # Dashboard-specific components
│   │   └── shared/         # Shared components
│   ├── pages/              # Page components
│   │   ├── Index.tsx       # Landing page
│   │   ├── Auth.tsx        # Authentication
│   │   └── OrganizerDashboard.tsx
│   ├── lib/                # Utility functions
│   │   ├── mockData.ts     # Mock data & localStorage utils
│   │   └── authUtils.ts    # Authentication helpers
│   ├── types/              # TypeScript type definitions
│   ├── hooks/              # Custom React hooks
│   └── App.tsx             # Main app component
├── public/                 # Static assets
└── package.json           # Dependencies
```

---

## 🎨 Key Features Explained

### 1. **Smart Authentication System**
- Domain-based role detection (`@iilm.edu` vs `@organiser.iilm.edu`)
- Persistent sessions using localStorage
- Automatic role-based routing

### 2. **Event Management**
- Create events with rich details (title, description, date, location, capacity)
- Category-based organization (Tech, Sports, Cultural, Academic, Workshop)
- Real-time registration tracking
- Event status management (Upcoming, Live, Completed, Cancelled)

### 3. **QR Code System**
- Automatic QR code generation for each event
- Downloadable QR passes for students
- Quick check-in verification for organizers

### 4. **Responsive Design**
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interactions

---

## 🎯 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch
```

---

## 🌟 Screenshots

### Landing Page
*Beautiful, modern landing page with smooth animations*

### Student Dashboard
*Clean, intuitive interface for browsing and registering for events*

### Organizer Dashboard
*Powerful event management tools with real-time analytics*

### Event Details
*Comprehensive event information with one-click registration*

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

---

## 📝 Development Notes

### Authentication Flow
- Uses localStorage for session persistence
- Email domain determines user role
- No backend required for demo purposes

### Data Storage
- All data stored in localStorage
- Mock data for events and users
- Easy to integrate with real backend

### Future Enhancements
- [ ] Real backend integration with API
- [ ] Email notifications for event updates
- [ ] Calendar integration
- [ ] Social sharing features
- [ ] Event recommendations based on interests
- [ ] Advanced analytics for organizers
- [ ] Mobile app version

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill the process using port 5173
npx kill-port 5173

# Or use a different port
npm run dev -- --port 3000
```

### Dependencies Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Om Rohilla**

- GitHub: [@Om-Rohilla](https://github.com/Om-Rohilla)
- Project: [Campus Event Hub](https://github.com/Om-Rohilla/campus-event-hub)

---

## 🙏 Acknowledgments

- **IILM University** - For the inspiration
- **shadcn/ui** - For the beautiful component library
- **Radix UI** - For accessible primitives
- **Vercel** - For amazing developer tools

---

<div align="center">

### ⭐ Star this repo if you find it helpful!

**Made with ❤️ for IILM University**

[Report Bug](https://github.com/Om-Rohilla/campus-event-hub/issues) • [Request Feature](https://github.com/Om-Rohilla/campus-event-hub/issues)

</div>
