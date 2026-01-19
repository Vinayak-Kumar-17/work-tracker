# 📋 Work Tracker Application

A modern, full-stack work tracker application built with **Java Spring Boot** backend and **React** frontend, designed for easy deployment on **Replit**.

## ✨ Features

- ➕ **Create** work items with title, description, and status
- 📝 **View** all your work items in a beautiful grid layout
- 🔄 **Update** work item status (To-Do, In Progress, Done)
- 🗑️ **Delete** work items you no longer need
- 💾 **Persistent** data storage with H2 database
- 🎨 **Modern UI** with vibrant gradients, glassmorphism, and smooth animations
- 📱 **Responsive** design that works on all devices

## 🚀 Quick Start on Replit

### Option 1: Import from GitHub (Recommended)

1. Go to [Replit](https://replit.com)
2. Click **"Create Repl"**
3. Select **"Import from GitHub"**
4. Paste your repository URL
5. Click **"Import from GitHub"**
6. Wait for Replit to set up the environment
7. Click **"Run"** button
8. Your application will be available at the Replit URL (usually `https://work-tracker.[your-username].repl.co`)

### Option 2: Manual Upload

1. Go to [Replit](https://replit.com)
2. Click **"Create Repl"**
3. Select **"Java"** as the template
4. Name your repl (e.g., "work-tracker")
5. Upload all project files to Replit:
   - Use the "Upload file" or "Upload folder" option
   - Or use Git: `git clone [your-repo-url] .`
6. Click **"Run"** button
7. Your application will build automatically and start

## 🛠️ Technology Stack

### Backend
- **Java 17** - Modern Java LTS version
- **Spring Boot 3.2.0** - Framework for building the REST API
- **Spring Data JPA** - Database access layer
- **H2 Database** - In-memory database for data persistence
- **Maven** - Build and dependency management

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Modern CSS** - Custom styling with gradients and animations
- **Fetch API** - For backend communication

### Deployment
- **Replit** - Cloud-based deployment platform
- **Nix** - Package management for consistent environments

## 📁 Project Structure

```
work-tracker/
├── src/main/java/com/worktracker/
│   ├── WorkTrackerApplication.java    # Main Spring Boot application
│   ├── controller/
│   │   └── WorkItemController.java    # REST API endpoints
│   ├── model/
│   │   └── WorkItem.java              # JPA entity
│   └── repository/
│       └── WorkItemRepository.java    # Database repository
├── src/main/resources/
│   └── application.properties         # Spring Boot configuration
├── frontend/
│   ├── src/
│   │   ├── App.jsx                    # Main React component
│   │   ├── App.css                    # Styling
│   │   ├── main.jsx                   # React entry point
│   │   └── index.css                  # Global styles
│   ├── public/
│   │   └── index.html                 # HTML template
│   ├── package.json                   # NPM dependencies
│   └── vite.config.js                 # Vite configuration
├── pom.xml                            # Maven configuration
├── .replit                            # Replit run configuration
└── replit.nix                         # Nix dependencies
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/workitems` | Get all work items |
| POST | `/api/workitems` | Create a new work item |
| PUT | `/api/workitems/{id}` | Update a work item |
| DELETE | `/api/workitems/{id}` | Delete a work item |

### Example Request Body (POST/PUT)

```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API docs",
  "status": "In Progress"
}
```

## 💻 Local Development

### Prerequisites
- Java 17 or higher
- Maven 3.6+
- Node.js 18+
- npm or yarn

### Run Locally

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd work-tracker
   ```

2. **Build and run the application**
   ```bash
   # This will install frontend dependencies, build React app, and start Spring Boot
   mvn spring-boot:run
   ```

3. **Access the application**
   - Open your browser to `http://localhost:8080`

### Development Mode (Hot Reload)

For frontend development with hot reload:

```bash
# Terminal 1 - Run Spring Boot backend
mvn spring-boot:run

# Terminal 2 - Run React dev server
cd frontend
npm install
npm run dev
```

Then access the app at `http://localhost:5173` (Vite dev server)

## 🎨 UI Features

- **Vibrant Gradient Background** - Eye-catching purple gradient
- **Glassmorphism Cards** - Modern frosted glass effect
- **Smooth Animations** - Fade-in, slide, and hover effects
- **Status Color Coding** - Visual indication of task status
  - 🔵 To-Do (Indigo)
  - 🟡 In Progress (Amber)
  - 🟢 Done (Green)
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- **Loading States** - Visual feedback during operations
- **Empty States** - Friendly message when no tasks exist

## 🔧 Configuration

### Spring Boot (application.properties)
- Server runs on port `8080`
- H2 database in-memory mode
- H2 console available at `/h2-console` (for debugging)
- JDBC URL: `jdbc:h2:mem:worktracker`

### Frontend (vite.config.js)
- Proxy configured to forward `/api/*` requests to Spring Boot
- Development server on port `5173`

## 📦 Building for Production

```bash
# Build the complete application
mvn clean package

# Run the JAR file
java -jar target/work-tracker-1.0.0.jar
```

## 🐛 Troubleshooting

### Application won't start on Replit
- Make sure all dependencies are installed
- Check the console for error messages
- Try clicking "Run" again - first build may take time

### Frontend not showing
- Ensure the React build completed successfully
- Check that `frontend/dist` folder exists
- Verify the build was copied to `target/classes/static`

### Database errors
- H2 is in-memory, so data is lost when app restarts
- For persistent data, configure a file-based H2 database in `application.properties`

### Port issues
- Replit automatically maps port 8080 to external port 80
- Make sure Spring Boot is configured to use port 8080

## 🤝 Contributing

Feel free to fork this project and submit pull requests with improvements!

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with Spring Boot and React
- Deployed on Replit
- Styled with modern CSS techniques

---

**Enjoy tracking your work!** 🚀✨
