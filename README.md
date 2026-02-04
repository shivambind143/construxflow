# ConstruxFlow - Smart Construction Management System

A full-stack web application for managing construction projects, workers, contractors, and suppliers with role-based access control.

## 🚀 Features

### User Roles
- **Admin**: View system statistics and analytics
- **Contractor**: Post projects, manage applications, request materials
- **Worker**: Browse and apply to jobs, track application status
- **Supplier**: Manage inventory, handle material requests

### Core Functionality
- ✅ Secure authentication with bcrypt password hashing
- ✅ Role-based dashboards and route protection
- ✅ Project posting and job application system
- ✅ Material marketplace and request management
- ✅ Automatic inventory management on approval
- ✅ Real-time status tracking

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Frontend**: EJS, Bootstrap 5, HTML/CSS
- **Authentication**: bcrypt, cookie-based sessions
- **Architecture**: MVC (Model-View-Controller)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## 📦 Installation

### Step 1: Clone or Extract Project

If you received this as a ZIP file, extract it. Otherwise:
```bash
cd construxflow
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment Variables

Edit the `.env` file in the root directory with your database credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=construxflow
PORT=3000
SESSION_SECRET=your_super_secret_key_change_this_in_production
```

### Step 4: Set Up Database

1. **Start MySQL Server**
   ```bash
   # On Windows
   net start MySQL80
   
   # On macOS/Linux
   sudo service mysql start
   ```

2. **Login to MySQL**
   ```bash
   mysql -u root -p
   ```

3. **Create Database and Tables**
   
   Either run the schema file:
   ```bash
   mysql -u root -p < schema.sql
   ```
   
   Or manually execute the SQL commands from `schema.sql` in MySQL:
   ```sql
   CREATE DATABASE IF NOT EXISTS construxflow;
   USE construxflow;
   -- Then copy and paste the rest of the SQL from schema.sql
   ```

### Step 5: Start the Application

```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

The application will be available at: `http://localhost:3000`

## 👥 Default Login Credentials

**Admin Account** (pre-created):
- Email: `admin@construxflow.com`
- Password: `admin123`

**Note**: You'll need to register new accounts for Contractor, Worker, and Supplier roles.

## 🗂️ Project Structure

```
construxflow/
│
├── config/
│   └── db.js                 # Database configuration
│
├── middleware/
│   └── auth.js               # Authentication middleware
│
├── models/
│   ├── User.js               # User model
│   ├── ProjectPost.js        # Project model
│   ├── Application.js        # Application model
│   ├── Material.js           # Material model
│   └── MaterialRequest.js    # Material request model
│
├── controllers/
│   ├── authController.js     # Authentication logic
│   ├── adminController.js    # Admin dashboard logic
│   ├── contractorController.js
│   ├── workerController.js
│   └── supplierController.js
│
├── routes/
│   ├── authRoutes.js         # Auth routes
│   ├── adminRoutes.js        # Admin routes
│   ├── contractorRoutes.js   # Contractor routes
│   ├── workerRoutes.js       # Worker routes
│   └── supplierRoutes.js     # Supplier routes
│
├── views/
│   ├── login.ejs
│   ├── register.ejs
│   ├── admin/
│   │   └── dashboard.ejs
│   ├── contractor/
│   │   ├── dashboard.ejs
│   │   ├── add-project.ejs
│   │   ├── applications.ejs
│   │   ├── materials.ejs
│   │   └── material-requests.ejs
│   ├── worker/
│   │   ├── dashboard.ejs
│   │   └── jobs.ejs
│   └── supplier/
│       ├── dashboard.ejs
│       ├── add-material.ejs
│       └── requests.ejs
│
├── public/
│   └── css/
│       └── style.css         # Custom styles
│
├── .env                      # Environment variables
├── server.js                 # Main application file
├── schema.sql                # Database schema
└── package.json              # Dependencies
```

## 📊 Database Schema

### Tables
1. **users** - Store all user accounts
2. **project_posts** - Construction project listings
3. **applications** - Worker job applications
4. **materials** - Supplier inventory
5. **material_requests** - Material purchase requests

## 🔐 Security Features

- Passwords hashed with bcrypt (10 salt rounds)
- HTTP-only cookies for session management
- Role-based route protection
- SQL injection prevention with parameterized queries
- No hardcoded user IDs

## 🎯 User Workflows

### Contractor Workflow
1. Register/Login as Contractor
2. Post construction projects
3. Review worker applications
4. Browse materials from suppliers
5. Request materials for projects
6. Track material request status

### Worker Workflow
1. Register/Login as Worker
2. Browse available jobs
3. Apply to suitable projects
4. Track application status

### Supplier Workflow
1. Register/Login as Supplier
2. Add materials to inventory
3. View material requests
4. Approve/Reject requests
5. Automatic inventory deduction on approval

### Admin Workflow
1. Login as Admin
2. View system statistics
3. Monitor all activities

## 🚦 Testing the Application

### Test Scenario 1: Complete Contractor Flow
1. Register as a Contractor
2. Login and navigate to "Add Project"
3. Create a new project with details
4. View the project on dashboard

### Test Scenario 2: Worker Application
1. Register as a Worker
2. Browse available jobs
3. Apply to a job
4. Check application status

### Test Scenario 3: Material Request Flow
1. Register as a Supplier
2. Add materials to inventory
3. Login as Contractor
4. Browse materials and request some
5. Login back as Supplier
6. Approve the request
7. Verify inventory deduction

## 🐛 Troubleshooting

### Database Connection Error
- Verify MySQL is running
- Check credentials in `.env` file
- Ensure database `construxflow` exists

### Port Already in Use
- Change PORT in `.env` file
- Or kill the process using port 3000:
  ```bash
  # Windows
  netstat -ano | findstr :3000
  taskkill /PID <PID> /F
  
  # macOS/Linux
  lsof -ti:3000 | xargs kill
  ```

### Module Not Found
```bash
npm install
```

### Admin Login Not Working
- Re-run the schema.sql file
- Or manually insert admin user with hashed password

## 🔄 Future Enhancements

- [ ] Email notifications
- [ ] File upload for project images
- [ ] Advanced search and filters
- [ ] Payment integration
- [ ] Delivery tracking system
- [ ] Mobile responsive improvements
- [ ] Real-time chat between contractors and workers
- [ ] Analytics dashboard with charts

## 📝 API Endpoints

### Authentication
- `GET /register` - Registration page
- `POST /register` - Create new user
- `GET /login` - Login page
- `POST /login` - Authenticate user
- `GET /logout` - Logout user

### Contractor Routes
- `GET /contractor/dashboard` - View projects
- `GET /contractor/add-project` - Add project form
- `POST /contractor/add-project` - Create project
- `GET /contractor/applications` - View applications
- `POST /contractor/applications/update` - Accept/Reject application
- `GET /contractor/materials` - Browse materials
- `POST /contractor/materials/request` - Request material
- `GET /contractor/material-requests` - View request status

### Worker Routes
- `GET /worker/dashboard` - View applications
- `GET /worker/jobs` - Browse jobs
- `POST /worker/jobs/apply` - Apply to job

### Supplier Routes
- `GET /supplier/dashboard` - View inventory
- `GET /supplier/add-material` - Add material form
- `POST /supplier/add-material` - Create material
- `GET /supplier/requests` - View material requests
- `POST /supplier/requests/update` - Approve/Reject request

### Admin Routes
- `GET /admin/dashboard` - View statistics

## 👨‍💻 Development

### Running in Development Mode
```bash
npm run dev
```

This uses nodemon for automatic server restarts on file changes.

### Making Changes
1. Edit files in respective directories
2. Server will auto-restart (in dev mode)
3. Refresh browser to see changes

## 📄 License

This project is created for educational purposes.

## 🤝 Support

For issues or questions, please create an issue in the repository.

---

**Built with ❤️ for efficient construction management**
