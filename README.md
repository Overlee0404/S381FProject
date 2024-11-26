# S381FProject: Online ToDoTracker

## Group Details
**Group No:** 53  
**Members:**  
- **Lee Ho** (13642360)  
- **Lau Tsz Ho** (12736759)  
- **Chow Tsz Chung** (13507463)  

---

## Project Overview
### Online ToDoTracker
This is a cloud-based task management system with the following features:
1. **User Authentication**  
   - Handles login, logout, and session management using cookies.
2. **CRUD Operations**  
   - Enables users to create, read, update, and delete tasks.
3. **MongoDB Integration**  
   - Uses Mongoose to interact with a MongoDB database.

### Project Structure
#### **Files**
- **`server.js`**  
  - Sets up an Express server with the following functionalities:
    - User authentication.
    - CRUD operations for task management.
    - MongoDB integration.

- **`package.json`**  
  - A Node.js application utilizing Express for server setup, EJS for view rendering.  
      
- **`views/`**  
  - Includes EJS templates for rendering the user interface.

---

## Installation
###**To install dependencies, run the following command:**

    - npm install express cookie-session mongoose

## Cloud-Based Server
- **`Base URL/`** 
  - https://s381fproject-group53.onrender.com
    
- **`Admin Login/`** 
  - Username: admin
  - Password: 123


## RESTful API
1. **Create a Task**
   - **Path**: `/api/todos`
   - **Method**: `POST`
   - **Request Example**:
  {
    "_id": "",(automatically generated)
    "task": "Learn API",
    "description": "Practice REST API",
    "completed": true,
    "__v": 0
  }

2. **Read Tasks**
   - **Path**: `/api/todos`
   - **Method**: `GET`
   - **Description**: Returns a JSON array of all tasks.

3. **Update a Task**
   - **Path**: `/api/todos/:id`
   - **Method**: `PUT`
   - **Request Example**:
     {
       "task": "Learn REST API",
       "description": "Update CRUD operations",
       "completed": true
     }

4. **Delete a Task** (Delete)
   - **Path**: `/api/todos/:id`
   - **Method**: `DELETE`
   - **Description**: Delete the task with the specified task ID

### Testing Guide ###
Note: Replace [id] with the actual ID of the task, without brackets.
```
# Create a task
curl -X POST "https://s381fproject-group53.onrender.com/api/todos" -H "Content-Type: application/json" -d "{\"task\": \"Learn API\", \"description\": \"Practice REST API\", \"completed\": false}"

# Read all tasks
curl -X GET https://s381fproject-group53.onrender.com/api/todos

# Update a specific task
curl -X PUT "https://s381fproject-group53.onrender.com/api/todos/[id]" -H "Content-Type: application/json" -d "{\"task\": \"Updated Task\", \"description\": \"Update description\", \"completed\": true}"

# Delete a specific task
curl -X DELETE https://s381fproject-group53.onrender.com/api/todos/[id]

