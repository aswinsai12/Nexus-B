# Nexus-B
A friendly task manager web app for who wants to be productive and serious about their tasks completing simply to increase the discipline and dedication in the users
# Although it is a not a complete version of what i am building this is a beta version of that so named it as Nexus-"B"(Beta)
#Here are the technical details of the project

A modern, full-stack task management application built with React and Spring Boot, featuring user authentication, real-time task management

## ✨ Features

### 🔐 Authentication & Security
- Secure user registration and login system
- JWT-based authentication
- Password encryption with BCrypt
- Session management
- Protected routes and API endpoints

### 📋 Task Management
- Create, read, update, and delete tasks
- Task status tracking (Active, Completed)
- Real-time task filtering
- Search functionality
- User-specific task isolation
- Persistent data storage

### 🎨 Modern UI/UX
- Beautiful gradient-based design
- Responsive layout for all devices
- Smooth animations and transitions
- Loading states and error handling
- Clean, intuitive interface
- Status-based task organisation

### 🔧 Technical Features
- RESTful API architecture
- CORS configuration for cross-origin requests
- Database persistence with MySQL
- Environment-based configuration
- Docker containerization support

## 🛠️ Tech Stack

### Frontend
- **React** 18.x with Hooks
- **Vite** - Fast build tool and dev server
- **JavaScript ES6+**
- **CSS3** with modern styling
- **Fetch API** for HTTP requests

### Backend
- **Java** 17+ with Spring Framework
- **Spring Boot** 3.x - Application framework
- **Spring Security** - Authentication & authorization
- **Spring Data JPA** - Database abstraction
- **Maven** - Dependency management

### Database & Infrastructure
- **MySQL** 8.x - Primary database
- **Railway** - Database hosting
- **Render** - Backend deployment
- **Netlify** - Frontend deployment

## 🚀 Quick Start

### Prerequisites
- Java 17 or higher
- Node.js 16 or higher
- MySQL 8.x
- Maven 3.6+

### Backend Setup

1. **Clone the repository**
git clone https://github.com/aswinsa12/taskflow-studio.git
cd taskflow-studio/backend

2. **Configure Database**
application.properties
spring.datasource.url=${SPRING_DATASOURCE_URL}
spring.datasource.username=${SPRING_DATASOURCE_USERNAME}
spring.datasource.password=${SPRING_DATASOURCE_PASSWORD}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

3. **Set Environment Variables**
export SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/taskboarddb
export SPRING_DATASOURCE_USERNAME=your_username
export SPRING_DATASOURCE_PASSWORD=your_password

4. **Run Backend**
mvn clean install
mvn spring-boot:run

The backend will start on `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory**
cd ../frontend

2. **Install dependencies**
npm install

3. **configure API URL**
export const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

4. **Set Environment Variables**
.env.production
VITE_API_BASE_URL=https://your-backend-url.com

5. **Run Frontend**
npm run dev


The frontend will start on `http://localhost:5173`

## 📁 Project Structure

nexus-B/
├── backend/
│ ├── src/main/java/com/aswin/taskboard/
│ │ ├── TaskboardApplication.java
│ │ ├── controller/
│ │ ├── service/
│ │ ├── repository/
│ │ ├── model/
│ │ └── config/
│ ├── Dockerfile
│ └── pom.xml
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── assets/
│ │ ├── client.js
│ │ └── main.jsx
│ ├── package.json
│ └── vite.config.js
└── README.md


## 🔌 API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### Tasks
- `GET /tasks` - Fetch user tasks
- `POST /tasks` - Create new task
- `PUT /tasks/{id}` - Update task
- `DELETE /tasks/{id}` - Delete task

### User
- `GET /users/profile` - Get user profile

## 🚢 Deployment

### Backend (Render)
1. Connect GitHub repository to Render
2. Set build command: `mvn clean install`
3. Set start command: `java -jar target/taskboard-0.0.1-SNAPSHOT.jar`
4. Configure environment variables

### Frontend (Netlify)
1. Connect GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Configure environment variables

### Database (Railway)
1. Create MySQL service on Railway
2. Copy connection details to environment variables
3. Ensure CORS is configured for your frontend domain

## 🔒 Security Features

- **Authentication**: JWT-based secure authentication
- **Authorization**: User-specific data access
- **CORS**: Configured cross-origin resource sharing
- **Input Validation**: Server-side data validation
- **SQL Injection Protection**: JPA parameter binding

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Aswin Varma Alluri**
- GitHub: [@aswinsai12](https://github.com/aswinsai12)
- Location: Vishakapatnam, AP

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- React team for the powerful frontend library
- Railway for reliable database hosting
- Render and Netlify for seamless deployment

## 📊 Project Stats

- **Frontend**: React with Vite
- **Backend**: Spring Boot with MySQL

**Happy Task Management! 🎯**

