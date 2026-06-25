<div align="center">

# 💪 FlexStack

### Fitness & Gym Management Platform

**A full-stack, role-based fitness platform to manage classes, trainers, members, and community — all in one place.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-brightgreen?style=for-the-badge)](https://flexstack.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-FlexStack-181717?style=for-the-badge&logo=github)](https://github.com/tahiamubin/FlexStack)

</div>

---

## 📖 About

FlexStack is a full-stack Fitness & Gym Management Platform where members can discover and book classes, trainers can create and manage content, and admins have full control over users, trainers, and the platform. The app uses JWT-based authentication with role-based access control across three distinct user types.

---

## 🌐 Live Links

| | Link |
|---|---|
| 🖥️ **Frontend (Vercel)** | [https://flexstack.vercel.app](https://flexstack.vercel.app/) |
| 📦 **Backend Repo** | [FlexStack-server](https://github.com/tahiamubin/FlexStack) |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **Next.js** | React framework with App Router |
| **Tailwind CSS** | Utility-first styling |
| **HeroUI** | Component library |
| **Gravity UI** | Additional UI components |
| **React Icons** | Icon library |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | Runtime environment |
| **Express.js** | REST API framework |
| **MongoDB** | NoSQL database |
| **JWT / JWKS** | Authentication & authorization |

---

## ✨ Features by Role

### 👤 Member (Regular User)
- Register and log in securely
- Browse and search all available fitness classes
- Book classes directly from the platform
- Apply to become a trainer
- View community forum previews publicly; log in to read full posts, comment, and vote (like/dislike)

### 🏋️ Trainer
- Create and manage personal fitness classes
- Post informative content on the Community Forum
- Classes go through admin approval before being listed publicly

### 🛡️ Admin
- Manage all users — block accounts or promote users to Admin
- Review, approve, or reject Trainer applications; demote existing trainers back to member
- Manage all classes — approve, reject, or delete listings
- Post content on the Community Forum

---

## 📸 Screenshots

> *(Add screenshots of your homepage, dashboard, class listings, and admin panel here)*

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn
- MongoDB Atlas URI
- A running backend server

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/tahiamubin/FlexStack.git
cd FlexStack

# Install dependencies
npm install

# Create your environment file
cp .env.example .env.local
```

Add the following to your `.env.local`:

```env
NEXT_PUBLIC_API_URL=your_backend_api_url
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

```bash
# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend Setup

```bash
# Clone the backend repo
git clone https://github.com/tahiamubin/FlexStack-server.git
cd FlexStack-server

# Install dependencies
npm install

# Create your environment file
```

Add the following to your `.env`:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:3000
```

```bash
# Start the server
node index.js
```

---

## 📁 Project Structure

```
FlexStack/
├── public/
│   └── images/           # Static assets
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # Reusable UI components
│   └── ...
├── next.config.mjs
├── tailwind.config.js
└── package.json
```

---

## 🔐 Authentication

FlexStack uses **JWT-based authentication** verified via a JWKS endpoint. Three roles are enforced both on the frontend (route protection) and backend (middleware):

| Role | Access Level |
|---|---|
| `member` | Class browsing, booking, forum reading, applying to become a trainer |
| `trainer` | Class management, community posting |
| `admin` | Full platform control — users, trainers, classes, forum |

---

## 🗄️ Database Collections

| Collection | Description |
|---|---|
| `user` | All registered users with roles and plan info |
| `allClass` | Fitness class listings with approval status |
| `community` | Forum posts and nested comments |
| `applyTrainer` | Trainer application submissions |
| `memberFavorite` | Members' saved/favorited classes |
| `subscription` | Payment and subscription records |

---

## 📦 Key Dependencies

```json
{
  "next": "latest",
  "tailwindcss": "latest",
  "@heroui/react": "latest",
  "@gravity-ui/uikit": "latest",
  "react-icons": "latest",
  "express": "latest",
  "mongodb": "latest",
  "jose-cjs": "latest"
}
```

---

## 🙌 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/tahiamubin">tahiamubin</a>
</div>