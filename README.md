# ⚡ WorkshopHub

A modern web application for managing online workshops and training sessions.

## Features

### User Side
- **Dashboard** — Personalized overview with upcoming sessions and recommendations
- **Browse Workshops** — Filter by category, status, and search
- **My Workshops** — Manage registrations, join live sessions
- **Resources** — Download materials from registered workshops
- **Workshop Detail** — Full info page with register/join flow

### Admin Side
- **Overview** — Key metrics and full workshop table
- **Schedule** — Timeline view of all sessions
- **Registrations** — Capacity tracking per workshop
- **Materials** — Upload and manage training files

---

## Tech Stack

| Layer     | Technology             |
|-----------|------------------------|
| Framework | React 18               |
| Bundler   | Vite 5                 |
| Routing   | React Router v6        |
| Styling   | Pure CSS (custom vars) |
| Fonts     | Space Grotesk + DM Sans|

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open in browser
# http://localhost:5173
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## Project Structure

```
workshophub/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx              # Entry point
    ├── App.jsx               # Router + layout shell
    ├── context/
    │   └── AppContext.jsx    # Global state (role, registrations, toasts)
    ├── data/
    │   └── workshops.js      # Workshop data + constants
    ├── styles/
    │   └── global.css        # Design system + utility classes
    ├── components/
    │   ├── Sidebar.jsx           # Navigation sidebar
    │   ├── WorkshopCard.jsx      # Reusable workshop card
    │   ├── CreateWorkshopModal.jsx
    │   ├── Toast.jsx
    │   └── UI.jsx                # ProgressBar, Badges, StatCard, etc.
    └── pages/
        ├── user/
        │   ├── Dashboard.jsx
        │   ├── BrowseWorkshops.jsx
        │   ├── MyWorkshops.jsx
        │   ├── Resources.jsx
        │   └── WorkshopDetail.jsx
        └── admin/
            ├── AdminDashboard.jsx
            ├── Schedule.jsx
            ├── Registrations.jsx
            └── Materials.jsx
```

---

## Switching Roles

Use the **User / Admin toggle** at the top of the sidebar to switch between learner and admin views.

- 👤 **User (Jamie Lee)** — Browse, register, and access resources
- ⚙ **Admin (Alex Morgan)** — Manage workshops, view registrations, upload materials

---

## Extending the Project

To connect a real backend:
1. Replace `/src/data/workshops.js` static data with API calls
2. Update `AppContext.jsx` to persist state (localStorage / server)
3. Add auth via JWT or OAuth in `App.jsx`
