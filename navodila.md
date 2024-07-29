# Data Dashboard Project

### Project Requirements
### Prerequisites
   - Familiarity with the command line
   - Basic knowlage of Vue and Javascript
   - Node.js version 18.3 or higher
   - Code editor of user's choice
   - GIT
### Project Setup
1. **Initialize a New Vue.js Project**
   - Use Vue CLI to create a new project in frontend map.
   - Initialize GIT repository	
2. **Install Necessary Dependencies**
   - Vue(without nuxt)
   - Pinia
   - Axios
   - TenStack Vue Query (vue-query)
   - UI Library (e.g., Naive UI or any other of your choice)

### Authentication
1. **Login and Registration System**
   - Implement login and registration with username and password.
   - Run the backend with `node server.js` (see API documentation below).

2. **State Management with Pinia**
   - Manage authentication state.
   - Store JWT token received from the authentication API for subsequent API calls.
   
### Routing
1. **Responsive Layout**
   There should be three routes. "/login", "/register" and "/"
   "/" route should be a protected route user should not be able to visit dahsboard without successful login.
   "/login" and "/register" routes should become unavailible for loged in user and should redirect to / if user attempts to visit them.
   After user logins makes sure he can't go back to "/login" or "/register" without logging out first.  
   - /login - Displays login form
   - /register - Display register form
   - / - Displays dashboard layout 
      
### Login/register page
1. **Responsive Layout**
   - Create a page where user is presented with a card on which is a login form.
   - Login form should include a login button and registration button. If user already has an account he can login to the dashboard. If user enters wrong passowrd or if account does not exist display an error message.
   - Clicking registration will allow user to register. Registrating should be three field form with two password fields and account name field. The password fields should match for user to successfuly register. Massage should be displayd on sucessfull registration. 
   
### Dashboard Layout
1. **Responsive Layout**
   - Create a sidebar(drawer) and main content area using the UI library of your choice.
   - Sidebar to contain navigation links to different parts of the dashboard (create some placeholders).
   - The sidebar should include a logout button where user is prompted via modal if user is sure he wants to logout with options Yes and No. No should cancel the dialog and Yes should logout the user and redirect him back to the login page.
   - In the center of the dashboard there should be a card with a table that displays the data(/books api endpoint) fatched from the BE after login.
   
### API Integration
1. **Fetch and Display Data**
   - Use Axios for API requests.
   - Manage data fetching with TenStack Vue Query for caching, refetching, and updating data.

2. **State Management**
   - Use Pinia for managing application state.
   - Store real-time data in the Pinia store.
   - Implement actions, mutations, and getters as required.

### Real-Time Updates
1. **Data(/books) Fetching and Updating**
   - Fetch data and update the state regularly (every 5 seconds), BE shuffles the library of books every 5 seconds.
   - Ensure the UI updates automatically with new data.

### Component Architecture
1. **Reusable Vue Components**
   - Header component
   - Data display component (e.g., table or card showing real-time data)
   - Modal(logout)
   - Sidebar(drawer)
   - Card(contains forms)
   
### Conditional Rendering
1. **Loading and Error States**
   - Show a loading spinner/shimmer while data is being fetched.
   - Display error messages if API requests fail(401,403) or if no data is available.
   - Display success messages if API requests succeed(200).

### Unit Testing
1. **Testing**
   - Write unit tests for key components and Pinia store modules using Vue Test Utils.

### Styling
1. **Design and Customization**
   - Ensure the application is visually appealing and follows a consistent design language.
   - Use UI library components and customize styles as needed.

## Evaluation Criteria
- Code quality and organization.
- Proper implementation of state management and real-time updates.
- Correct use of Vue components and UI library.
- Management of authentication and API errors.
- Visual design and responsiveness of the application.
See "ocena.md" file for complete evaluation criteria.

## Rules
-To complete the task you have 7.5 hours.
-The use of AI is forbbiden. Only official documentation should be looked at, no solutions should be copied.
-If instructions are unclear please ask for help.
-The project should be hended out in a GIT repo.
## API Documentation

### Base URL
- `http://localhost:3000`

### Endpoints

#### 1. Register a New User
- **Endpoint:** `/register`
- **Method:** `POST`
- **Description:** Registers a new user with a username and password.
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response:**
  - **Status Code:** 201 Created
  - **Body:**
    ```json
    {
      "message": "User registered successfully"
    }
    ```
- **Example Request:**
  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"username":"user1", "password":"password"}' http://localhost:3000/register
  ```
- **Example Response:**
  ```json
  {
    "message": "User registered successfully"
  }
  ```

#### 2. Login a User
- **Endpoint:** `/login`
- **Method:** `POST`
- **Description:** Authenticates a user and returns a JWT token.
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response:**
  - **Status Code:** 200 OK
  - **Body:**
    ```json
    {
      "token": "string"
    }
    ```
  - **Status Code:** 401 Unauthorized
  - **Body:**
    ```json
    {
      "message": "Invalid credentials"
    }
    ```
- **Example Request:**
  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"username":"user1", "password":"password"}' http://localhost:3000/login
  ```
- **Example Response:**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

#### 3. Get Books for Authenticated Users
- **Endpoint:** `/books`
- **Method:** `GET`
- **Description:** Returns a list of books for authenticated users.
- **Headers:**
  - `Authorization: Bearer <token>`
- **Response:**
  - **Status Code:** 200 OK
  - **Body:**
    ```json
    [
      { "id": 1, "title": "1984", "author": "George Orwell" },
      { "id": 2, "title": "To Kill a Mockingbird", "author": "Harper Lee" },
      { "id": 3, "title": "The Great Gatsby", "author": "F. Scott Fitzgerald" }
    ]
    ```
  - **Status Code:** 401 Unauthorized
  - **Body:**
    ```json
    {
      "message": "No token provided"
    }
    ```
  - **Status Code:** 403 Forbidden
  - **Body:**
    ```json
    {
      "message": "Invalid token"
    }
    ```
- **Example Request:**
  ```bash
  curl -H "Authorization: Bearer <token>" http://localhost:3000/books
  ```
- **Example Response:**
  ```json
  [
    { "id": 1, "title": "1984", "author": "George Orwell" },
    { "id": 2, "title": "To Kill a Mockingbird", "author": "Harper Lee" },
    { "id": 3, "title": "The Great Gatsby", "author": "F. Scott Fitzgerald" }
  ]
  ```

### Error Responses

- **Invalid Credentials**
  - **Status Code:** 401 Unauthorized
  - **Body:**
    ```json
    {
      "message": "Invalid credentials"
    }
    ```

- **No Token Provided**
  - **Status Code:** 401 Unauthorized
  - **Body:**
    ```json
    {
      "message": "No token provided"
    }
    ```

- **Invalid Token**
  - **Status Code:** 403 Forbidden
  - **Body:**
    ```json
    {
      "message": "Invalid token"
    }
    ```

