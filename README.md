# S381FProject
Group-53
Lee Ho 13642360
Lau Tsz Ho 12736759
Chow Tsz Chung 13507463
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
curl -X POST http://localhost:8099/api/todos -H "Content-Type: application/json" -d '{"task": "Learn API", "description": "Practice REST API", "completed": false}'

# Read all tasks
curl -X GET http://localhost:8099/api/todos

# Update a specific task
curl -X PUT http://localhost:8099/api/todos/[id] -H "Content-Type: application/json" -d '{"task": "Updated Task", "description": "Update description", "completed": true}'

# Delete a specific task
curl -X DELETE http://localhost:8099/api/todos/672e1ebabc0366c9d87d5901
